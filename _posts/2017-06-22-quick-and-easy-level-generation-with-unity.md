---
id: 445
title: Quick and easy level generation with Unity
date: 2017-06-22T12:32:59+00:00
author: Ben Hoffman
layout: post
categories:
  - General
---
For the past couple of game jams that I have been a part of, I found myself wanting a quick way to generate 2D levels, without having to place things in the unity world editor. I recently found a quick and easy way to do this by using a 2D Texture map, and going through that pixel by pixel at the start of the game. Depending on the color of that pixel, just instantiate some sort of tile, set the player spawn, or anything else that could be in a side scrolling game.

This allows you to hop into Photoshop, Gimp, or some other image editor, and quickly edit each objects position in the world.

You can find a link to an example project, and the script itself <a href="https://github.com/bah8892/LevelGenerator_Unity" target="_blank" rel="noopener">on my GitHub.</a>

I also found that this worked out really well with 3D objects, as the objects are instantiated where 1 pixel in the texture map = 1 Unity unit. By simply changing the Z value in the script, you can have a top down level generator for a tile game. The possibilities are only limited to what you can think of.
