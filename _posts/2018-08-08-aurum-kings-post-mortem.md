---
id: 821
title: Aurum Kings Development Post Mortem
date: 2018-08-08T02:16:02+00:00
author: Ben Hoffman
layout: post
categories:
  - aurumkings
  - General
---


Aurum Kings has officially released on Steam for Windows and Linux. While it was
a long and exciting journey throughout the development of Aurum Kings, I think that
it is high time to look back and reflect on my decisions throughout the development
process. This post is not necessarily about the actual game as is it about my own
development process.  


# Lessons learned

When I think about my development process with Aurum Kings, there are a couple
key lessons that I learned about myself during my time working on the game.

### Be Decisive

Throughout the process of making Aurum Kings, I was not nearly as decisive as
I should have been. I spent a lot more time than I should have experimenting with
different ideas and programming solutions to problems that didn't really need
priority. This lead to the code being a bit unorganized towards the end with some
behaviors that I ended up just deleting because they were not actually used anywhere
in the game.

The fact that I worked on this project for almost a year made it quite clear to me
that I had a bit of a problem with starting things and then not finishing them. Half
written code that I decided I didn't like or want, mechanics that were prototyped
without any real implementation, and even conflicting coding standards over time.
Since this project, I have written myself a bit of a personal coding standard
in terms of naming conventions, source control tactics, and build pipeline stuff.
This has really improved not only the quality of the code that I write, but the
speed at which I can do it.

### Be confident

This project has really shown me how much I second guess myself with my own work.
I started to notice that I would not trust my own solutions for some reason, even
though I knew they would work. In order to actually show the game at expos, I had
to build up a lot of confidence in my own work, which is something that I have always
struggled with. Aurum Kings really helped me realize that if I don't believe in myself
and my work, than others aren't going to either.


### Feature cuts

While I was working on the game, there were a ton of features and things that I
wanted to put into the game and didn't have time to do so. There were also things
that I put time into doing, but either wasn't happy with them or didn't have time
to finish. I have seen what it's like to have a set deadline to ship a game, and
have to prioritize what needs to be done and cut what isn't a necessity. This was
something that I hadn't really experienced at scale until I shipped Aurum Kings,
even during my previous time at a local studio.  


# Technical skills gained

I learned a lot while working on this project, but these are the skills
that I would say developed the most over the course of the game.

### Automation

I have certainly found the value in automating things while working on this project.
Jenkins is something that I started to use to do my builds for me and even upload
them if I wanted to. I also learned Python to interface
with Blender and export all my blender files to .FBX files, so that I didn't
have to work with the original .blend files. You can see these scripts on my
GitHub [here](https://github.com/BenjaFriend/blender-quick-export).

### Networking

Even though I ended up cutting the features from the shipped game for a better
experience, I did end up getting the core gameplay of Aurum Kings networked and
replicating correctly. I read a [book on network architecture](https://www.amazon.com/Multiplayer-Game-Programming-Architecting-Networked/dp/0134034309/ref=sr_1_1?ie=UTF8&qid=1533736822&sr=8-1&keywords=games+network+architecture)
and worked with both [UNet](https://docs.unity3d.com/Manual/UNet.html) and [Photon PUN](https://www.photonengine.com/en/pun). Since then I have done several projects involving networking in both Unity and Unreal.

### Dev Ops

Since I was working alone on this project, I had to handle everything in terms
of operations as well. I had to have ways to report bugs, analyze build logs, and
manage a list of things to do. I used Trello to give myself notice of bugs or things
that needed to be fixed. To look at my build logs I ran an ELK stack on my Jenkins
server to access the build logs from anywhere. I know that I was really just getting exposed to
the world of dev ops and how it is applied in game development, but I still feel
like I have learned a ton about how to make a good tools and build pipeline when
it comes to games.  

### Game Services

Integrating Steam into Aurum Kings was another big technical accomplishment for me.
During the time when I was figuring out multiplayer, I used SteamWorks to do matchmaking and NAT
punchthrough. I also integrated achievements into Aurum Kings. My implementation of
game services in Aurum Kings was to have a `GameServices` class that could do things
like unlock achievements, set stat progress, and more. I abstracted the functions out
to a class so it would be easier to ship on multiple platforms with different services
in the future if I wanted to.   



# Conclusion

Hopefully this was a good explanation about what kind of things I learned from
shipping a game by myself on Steam. I learned a lot of not only technical skills
but also things about myself through this experience.  
