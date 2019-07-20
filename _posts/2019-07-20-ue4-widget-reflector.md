---
id: 823
title: UE4 Widget Reflector
date: 2019-07-20T02:16:02+00:00
author: Ben Hoffman
layout: post
categories:
  - ue4
  - General
  - tools
---

```
Disclaimer: This is not an official Epic Games document
```

## What is the Widget Reflector?
The Widget Reflector is a tool in Unreal Engine that shows the you how 
the editor UI is built with [Slate](https://docs.unrealengine.com/en-US/Programming/Slate/index.html),
and allows you to jump straight to the source code that creates it. 

## How do I use it?

You can open the widget reflector by pressing `Ctrl + Shift + W` in the engine
or by opening the command console and typeing `WidgetReflector`. Once you see your
window there are a couple of key things to know: 

`Pick Hit-Testable widgets` will track your mouse curser and show you the Slate
heirarchy associated with the widget underneath it.  

![Widget Reflector Example]({{ site.url }}\media\posts\widget_reflector\WidgetReflectExample.gif)

If you click on the `Source` category on the right of the widget you want to see, then you will 
jump to the source code! 

You may notice that some of the things you click on bring you to the actualy Slate source 
code (`SInlineEditableTextBlock.cpp` for example). While this can sometimes be what you want,
more often than not you want to see what is actually calling this code and can lead to a 
confusing first time experience, especially if you haven't used Slate very much before. To solve this problem, just keep going up the call stack in the widget reflector and you will eventually find 
what you are looking for. 

## Why is it useful? 

The widget reflector has a lot of good use cases. One good use is to see how 
your game's UI is being built at a more granular level to help with 
optimization. I also found this tool especially useful when extending the UE editor.
It makes finding examples of how to use Slate very fast and easy. 

## Related Links

* [UMG Best Practicies](https://docs.unrealengine.com/en-US/Engine/UMG/UserGuide/BestPractices/index.html)
* [Slate Overview](https://docs.unrealengine.com/en-US/Programming/Slate/Overview/index.html)
