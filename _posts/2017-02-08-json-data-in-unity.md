---
id: 286
title: JSON data in Unity
date: 2017-02-08T01:14:25+00:00
author: Ben Hoffman
layout: post
guid: http://benhoffman.tech/?p=286
permalink: /index.php/2017/02/08/json-data-in-unity/
categories:
  - General
---
<a href="http://benhoffman.tech/index.php/my-skills-and-experience/unity-projects/unity/" rel="attachment wp-att-80"><img class="aligncenter size-medium wp-image-80" src="https://i0.wp.com/benhoffman.tech/wp-content/uploads/2016/08/unity.png?resize=300%2C109" alt="" width="300" height="109" srcset="https://i0.wp.com/benhoffman.tech/wp-content/uploads/2016/08/unity.png?resize=300%2C109 300w, https://i0.wp.com/benhoffman.tech/wp-content/uploads/2016/08/unity.png?w=676 676w" sizes="(max-width: 300px) 85vw, 300px" data-recalc-dims="1" /></a> <a href="http://benhoffman.tech/index.php/2017/02/08/json-data-in-unity/json/" rel="attachment wp-att-287"><img class="wp-image-287 size-thumbnail aligncenter" src="https://i1.wp.com/benhoffman.tech/wp-content/uploads/2017/02/JSON.png?resize=150%2C150" alt="Json logo" width="150" height="150" srcset="https://i1.wp.com/benhoffman.tech/wp-content/uploads/2017/02/JSON.png?resize=150%2C150 150w, https://i1.wp.com/benhoffman.tech/wp-content/uploads/2017/02/JSON.png?resize=300%2C300 300w, https://i1.wp.com/benhoffman.tech/wp-content/uploads/2017/02/JSON.png?w=600 600w" sizes="(max-width: 150px) 85vw, 150px" data-recalc-dims="1" /></a>

The project that I am currently working on calls for being able to parse <a href="http://www.json.org/" target="_blank">JSON </a>data in Unity. Now, you may be thinking, &#8220;There is an actual documentation page on this&#8221;, and you are not wrong. In fact, it&#8217;s right <a href="https://docs.unity3d.com/ScriptReference/JsonUtility.html" target="_blank">here</a>.

However, if you are new to JSON and the utility in Unity, then it can be a bit confusing to set up the C# code with more complex JSON data.<figure id="attachment_290" style="width: 398px" class="wp-caption alignnone">

<a href="http://benhoffman.tech/index.php/2017/02/08/json-data-in-unity/exampleoutput_li/" rel="attachment wp-att-290"><img class="size-full wp-image-290" src="https://i1.wp.com/benhoffman.tech/wp-content/uploads/2017/02/exampleOutput_LI.jpg?resize=398%2C430" alt="example output" width="398" height="430" srcset="https://i1.wp.com/benhoffman.tech/wp-content/uploads/2017/02/exampleOutput_LI.jpg?w=398 398w, https://i1.wp.com/benhoffman.tech/wp-content/uploads/2017/02/exampleOutput_LI.jpg?resize=278%2C300 278w" sizes="(max-width: 398px) 85vw, 398px" data-recalc-dims="1" /></a><figcaption class="wp-caption-text">Example output from my Log Files</figcaption></figure>

As you can see, there are a couple &#8216;children&#8217; in this JSON data like &#8220;_source&#8221; and &#8220;beat&#8221;, and also an array called &#8220;hits&#8221;.  To set this up in C# is very simple, but it is lacking the actual Unity Documentation.

<pre>[System.Serializable]
public class Json_Data
{
 public int took;
 public bool timed_out;
 public HitsParent hits;
}

[System.Serializable]
public class HitsParent
{
 public int total;
 public HitsData[] hits;
}

[System.Serializable]
public class HitsData
{
 public string _index;
 public string _type;
 public string _id;
 public Source _source;
}</pre>

Make sure that each variable&#8217;s name in C# matches with the JSON field name, or it will actually mark all the variables that come after that as null.

Take note that it is bad practice to have multiple classes within the same file, but for JSON it is a bit cleaner to put it all in one class if you will have multiple data types.

Every class needs to be serialize, because that is how Unity parses the data. To learn more about why each class needs to be Serializable, go to the <a href="https://docs.unity3d.com/ScriptReference/Serializable.html" target="_blank">Unity documentation.</a>
