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

# C++ 11 Features

[`std::future`](https://en.cppreference.com/w/cpp/thread/future)

[`std::promise`](https://en.cppreference.com/w/cpp/thread/promise)
