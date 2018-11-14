---
id: 822
title: C++ 11 Job System
date: 2018-11-13T02:16:02+00:00
author: Ben Hoffman
layout: post
categories:
  - cpp
  - General
---

Over the course of the last semester I have been working on a team to
create a multi-threaded engine using DirectX 12, with a focus on data
oriented design.

One of my tasks throughout the creation of this engine was to create a
Job System that we can use to parallelize tasks like physics calculations. This
system came with a couple of constraints:

* There needs to be a way to track the completion of tasks, to avoid data races
  when sending things like position data of an entity to the GPU.
* The Job System needs to have a simple interface that takes a `void *` as
  and argument, as to match some of the same data types with an SDK that
  is being used with the project.
* It must be portable code that will work in both a Windows and UNIX based
  environment.

During my research of how to go about building a job system, I came across
[this](https://www.youtube.com/watch?v=8AjRD6mU96s&t=1532s) CppCon talk by
Jason Jurecka. During his talk, he mentions a Task Manager that he uses
`std::future` and `std::promise` to keep track of tasks, and this is where I
got the idea for using those features in this Job System.

# Implementation
_* To see the full project, check it out on [GitHub](https://github.com/engine-buddies/light-vox-engine/tree/ben/Light%20Vox%20Engine/JobSystem)_


First of all, I needed to define what a "Job" was going to be in this system.
A "Job" is basically a function pointer, but it must be able to be generic
so that any class or sub system can "jobify" their methods. To solve this problem
I took a polymorphic approach where an `IJob` must be inherited from.

```C++
struct IJob {
    virtual ~IJob() {}
    virtual bool invoke( void* args, int aIndex ) = 0;
};
```

This allowed me to have two child classes, one for member functions and one for
non-member function.

```C++

struct JobFunc : IJob {
    JobFunc( void( *aFunc_ptr )( void*, int ) )
    : func_ptr( aFunc_ptr ) { }

    virtual bool invoke( void* args, int aIndex ) override {
        func_ptr( args, aIndex );
        return true;
    }

    /** The function pointer for this job to invoke */
    void( *func_ptr )( void*, int );
};

template <class T>
struct JobMemberFunc : IJob {
    JobMemberFunc( T* aParent, void ( T::*f )( void*, int ) ) {
        parentObj = aParent;
        func_ptr = f;
    }

    virtual bool invoke( void* args, int aIndex ) override {
        if ( !parentObj ) { return false; }

        ( parentObj->*func_ptr )( args, aIndex );
        return true;
    }

    /** the object to invoke the function pointer on */
    T* parentObj;

    /** The function pointer to call when we invoke this function */
    void ( T::*func_ptr )( void*, int );
};

```





# C++ 11 Features

[`std::future`](https://en.cppreference.com/w/cpp/thread/future)

[`std::promise`](https://en.cppreference.com/w/cpp/thread/promise)
