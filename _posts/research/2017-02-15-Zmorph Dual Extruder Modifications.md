---
id: 285
title: Zmorph Dual Extruder Modifications
date: 2019-09-22T06:36:33+00:00
author: Cayla Denning
layout: post
categories:
  - Research
  - Additive Manufacturing
---


Zmorph is an FDM style printer that brings together laser engraving, FDM printing, syringe extrusion, and CNC milling. The program used with this printer is from Voxelizer. With this machine, I focused on FDM printing with the dual nozzle.  Zmorph was one of the first printing companies to offer a dual extrusion nozzle that mixed two filament materials together while printing. This allowed their printer to excel in gradient prints (100% of material 1 to 100% of material 2 from bottom to top of the print) and prints of specific material mixtures (30% of material 1 and 70% of material 2 for the whole print). 

There were many challenges with printing using a dual nozzle of this type. One main problem is the system put in place to mix the materials together consisted of a small twisted piece of metal at the tip of the nozzle. The twisted piece was a sound idea, but the execution ended up missing the mark and caused the material to not be mixed at all. To mitigate this, the metal piece was sliced and twisted even more to allow the materials to make contact in the nozzle tip before being extruded. This solved some of the problem, but created more bleeding of one material to another when only trying to print one material at a time. This was solved by creating a long brim around the wanted part to purge the material and ensure the wanted mixture is being printed.

