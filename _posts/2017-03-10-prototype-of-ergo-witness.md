---
id: 353
title: 'Prototype of &#8220;Ergo Witness&#8221;'
date: 2017-03-10T22:33:08+00:00
author: Ben Hoffman
layout: post
categories:
  - data vis
  - ergowitness
  - General
  - project
tags:
  - data
  - elasticsearch
  - json
  - unity
---
<div class="jetpack-video-wrapper">
  <span class="embed-youtube" style="text-align:center; display: block;"></span>
</div>

&nbsp;

## What is Ergo Witness?

Ergo Witness is a 3D visualization of network data for a national computing security competition called [CCDC](http://neccdc.net/wordpress/). The video above is just one prototype concept that I have made in the past 6 or so weeks.

## Who is the intended audience?

The intended audience for this visualization are people who understand what the competition is about, have a basic understanding of network traffic, but cannot necessarily follow all of the in depth updates through the competition.

## What is happening?

The spheres represent a device on the network, and their color is determined by if they are on the red or blue team. If they are not on either team, then they are just orange for now. The teams are determined by if they have the same first 3 numbers of their IPv4 address the same. For example &#8220;192.168.137.100&#8221; would be in the same group as &#8220;192.168.137.1&#8221;.

The lines and particles that are being drawn in between represent netflow traffic, and their color varies based on the protocol.

The white glow surrounding some spheres represents their different sub net values. This is something that I have been really struggling to represent in a good way, and I am currently searching for a better alternative.

## How do I get the data?

I am gathering the network data by running <a href="https://www.bro.org/" target="_blank">Bro</a> and <a href="https://www.elastic.co/products/beats/packetbeat" target="_blank">Packetbeat</a> on a CentOS 7 box, and sending their logs to a <a href="https://www.elastic.co/products/logstash" target="_blank">Logstash</a> server. I then make HTTP Post requests, which you can learn more about in my post [here](http://benhoffman.tech/index.php/2017/03/03/how-to-make-http-post-requests-in-unity-5-c/).

## Why is this important?

There is a distinct lack of network data visualizations, especially interactive experiences. By using a game engine to do this there are endless possibilities for VR data visualisations that could be legitimate tools to help professionals do their jobs better. Imagine, one headset, with 360 degrees of viewing space to add as many virtual screens as the user wants. No longer would people need to but 15 different computer monitors, they could just by one headset. And if you developed for something like the Hololens, then the user can still see through to their keyboard and their surroundings. Amazing.
