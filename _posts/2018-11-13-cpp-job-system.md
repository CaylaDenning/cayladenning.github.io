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
oriented design. One of my tasks throughout the creation of this engine was to create a
Job System that we can use to parallelize tasks like physics calculations. This
system came with a couple of constraints:

* There needs to be a way to track the completion of tasks, to help avoid data races
  when sending things like position data of an entity to the GPU.
* The Job System needs to have a simple interface that takes a `void *` as
  an argument, so that it would match some of the same data layout of an SDK that
  is being used with the project.
* It must be portable code that will work in both a Windows and UNIX based
  environment.

During my research of how to go about building a job system, I came across
[this](https://www.youtube.com/watch?v=8AjRD6mU96s&t=1532s) CppCon talk by
Jason Jurecka. During his talk, he mentions a Task Manager where he uses
`std::future` and `std::promise` to keep track of tasks. This seemed like a good
starting concept for me to base my own job system on.

# Implementation
_* Check out the full project on [GitHub](https://github.com/engine-buddies/light-vox-engine/)_


First of all, I needed to define what a _job_ was going to be in this system.
A job is basically a function pointer, but it needs to be generic so that any
class can use the job system. To solve this problem I took a polymorphic
approach where an `IJob` is an abstract definition of the job type.

```C++
struct IJob {
    virtual ~IJob() {}
    virtual bool invoke( void* args, int aIndex ) = 0;
};
```

This allowed me to have two child classes, one for member functions and one for
non-member functions.

```C++
/** Defintion for non-member functions */
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

/** Defintion for member functions */
template <class T>
struct JobMemberFunc : IJob {
    JobMemberFunc( T* aParent, void ( T::*f )( void*, int ) )
    : parentObj ( aParent ), func_ptr( f ) { }

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

Now that I have a definition of what a `Job` actually is, I want to be able to
store a queue of them for the worker threads to take tasks from. To do this, I
defined at `CpuJob` struct:

```C
struct CpuJob {
    IJob* jobPtr = nullptr;
    void* jobArgs = nullptr;
    int index = 0;
};
```

I do this so that I can easily store both the function pointer to the job, and
the arguments that need to be passed in. This does come add a limitation to the
system that if you were to pass in an argument that was allocated on the stack,
then it could cause problems when actually invoking the job.

With the `CpuJob` definition, I can now store a queue of `CpuJob`'s and make a
simple interface for adding jobs. For the interface that I provide to my users I
just created a simple template `AddJob` function that does this.
In order to eliminate the most contention, the actual job queue should be a
lockless queue. Check out [Velan Studios' lock free implementation](https://www.velanstudios.com/blog/posts/our-first-open-source-release.html)
if you are interested in that.  

Now that there is a base for a simple job system, I needed a way to actually
track the completion of the Jobs. The reason that we may want this is because if
we have something like physics calculations, they need to happen before we can
send that data to the GPU in order to avoid race conditions.

To accomplish this, I used `std::future` and `std::promise`, which is not something
that I have seen a lot of other Job System's use to control their flow of jobs.

The workflow of doing this is simple, you just need to create a promise
and store it's future in a variable. Then, you can pass a pointer to that
promise and have your job call the `set_value()` function when it is complete,
effectively signaling to the dependent thread that the job is done.  

Here is an example:

```C++
void Solver::Update () {
    std::promise<void> aPromise;
    std::future<void> aFuture = aPromise.get_future();
    a_argument->jobPromise = &aPromise;     // a_argument is defined in this class
    jobManager->AddJob( this, &Physics::Solver::AccumlateForces, ( void* ) ( a_argument ), 0 );
    aFuture.wait(); // This is a blocking function that will wait for that promise
                    // to be fulfilled
}
```
Where inside the job function:

```C++
void Solver::AccumlateForces( void* args, int index ) {
    PhysicsArguments* myArgs = static_cast< PhysicsArguments* >( args );
    // Some kind of work for this thread...
    myArgs->jobPromise->set_value();    // Signal that this job is done
}
```

As you can see, I am just using a `future` of `void` type, so it is just acting
as a kind of "flag". Another clear use case for these is to actually get return
values from they with the `.get()` method on a `future` object.

One thing to watch out for here is the size of `std::future` and `std::promise`.
It shouldn't really be a huge problem, but it is something to watch out for. On
a 64-bit Ubuntu system:

```
Size of std::future<void>  : 16
Size of std::promise<void> : 24
```

They are not huge objects but it is certainly something to be aware of if they
are being created frequently.



# C++ 11 Features

[`std::future`](https://en.cppreference.com/w/cpp/thread/future)

[`std::promise`](https://en.cppreference.com/w/cpp/thread/promise)
