---
id: 567
title: 'Aurum Kings Demo &#8211; A Post Mortem'
date: 2017-12-10T03:54:21+00:00
author: Ben Hoffman
layout: post
guid: http://benhoffman.tech/?p=567
permalink: /index.php/2017/12/10/aurum-kings-demo-a-post-mortem/
categories:
  - aurumkings
  - General
  - post-mortem
  - project
tags:
  - post-mortem
---
Recently I wrote a blog post on the <a href="https://bullhorngames.com/2017/12/01/this-week-at-bull-horn-games-12-1/" target="_blank" rel="noopener">official Bull Horn Game website</a> about what went right and wrong at the Mini Maker Faire, and what the plans are for the game in the future. However, that wasn&#8217;t really in depth about my personal development process, and what I learned from the working two months on this project.

One of my game design professors recently gave some advice that everyone should do a post mortem of every game they make, and keep it somewhere so you don&#8217;t forget the lessons that you have learned. I have done some post mortem type stuff in the past on this blog, so I figured why not keep it here? Hopefully one day someone else will learn something useful from this too.

## What went wrong?

### Organized To Do List

Over the course of the project, I tried out a couple different methods for keeping a solid to-do list, but it took me a while to find one that I actually liked. Eventually I was spread pretty thin between different things like <a href="http://todoist.com" target="_blank" rel="noopener">Todoist</a>, a white board, and Trello. I ended up using <a href="http://trello.com" target="_blank" rel="noopener">Trello</a> to keep a nice and organized list of feedback, bug reports, and to-do list items.

### Process of Creating Art

I ended up doing all of the art myself, which took _way_ longer than I wanted it to in order to get the environments to look how I wanted them to. At the beginning of this project I had never used Blender before, and really was not too familiar with Gimp either. I used those tools specifically because they are free to use and don&#8217;t require me to use any special licenses. This was an awesome learning experience, and now I know how to make mediocre 3D models in Blender, but I really wish that I had teamed up with an artist. Speaking of Blender, I took advantage of the fact that Unity auto-generates .fbx files to use in the engine from .blend files, and didn&#8217;t actually export my models to .fbx myself. Let me tell you, _that was a huge mistake._ At the end of the development cycle I was planning on just using the cloud build offered by Unity to target Mac and Linux. Cloud build does NOT support .blend files. **Future Ben, please **keep your 3D models in a separate folder and export them into Unity or whatever engine you are using.

### Lack of Confidence throughout the development process

Something that I really learned how to do during this project is how to actually talk about my work. I used to just talk about my projects almost in a negative tone, which doesn&#8217;t get the person you are talking to about it very excited. **If you are passionate about your work, then others will be too. **I think that this was also more of a personal issue where I am way too critical of my own work, which is something that I addressed simply by surrounding myself with positive people. This year was really when I started to be around other game devs on a daily basis, and actually enjoying my time spent working.

### My work environment

Being in college and trying to make a side project like this is tough. Not only because of classwork and whatnot, but because of distractions. At the beginning of this project I was just working on this project whenever I could, which lead to a lot of distractions from my room mates, people wanting to play games, etc. What I did to address this was allot time in my calendar every day to specifically work on this game. Close my door, listen to some flowing music, and get to work. Not distractions. This worked pretty well for a while, but I got to a point where this game was almost the only thing that I did in my free time. **Remember to go out and have fun. **Step away from the project for a day or two, it really helps you clear your head and get in a better mental state.

## What went right?

### Audio Creation

Working with <a href="https://twitter.com/theTreeSerok?lang=en" target="_blank" rel="noopener">Rowan Waring</a> was a huge positive in this game, and he really did a great job with the music in this game. Don&#8217;t be afraid to ask other people if they want to be a part of your project, especially if you are a programmer and they do art things. Art and music are extremely valuable and can make or break the feel of your game.

### Rapid Prototypes and Iteration

Fortunately, I created the systems necessary to very quickly tweak and create new abilities in Aurum Kings. I definitely recommend taking the time to do things like scriptable objects, custom editor windows, and so on in Unity specifically. Something that I want to work on is to write a simple batch script or something that will streamline my build pipeline. Just to quickly target multiple platforms, and not have to sit at my computer for 30 minutes building for Windows, Mac, and Linux.

### Playtests

I was fortunate enough to be with a group of other game devs and designers who held regular playtest nights, which was awesome! Along with that, my roommates (not game devs) were willing to playtest any  new build that I put out, and give me really valuable feedback.  **Playtest as often as you can, especially if you are the only one working on a project. **

&nbsp;

&nbsp;

I think that is pretty much it for this post mortem of Aurum Kings so far, hopefully somebody can get something out of this as well!