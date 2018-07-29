---
id: 284
title: Data Visualization with the ELK stack and Unity
date: 2017-02-15T06:36:33+00:00
author: Ben Hoffman
layout: post
categories:
  - General
  - project
---
<a href="http://benhoffman.tech/index.php/my-skills-and-experience/unity-projects__trashed/unity/" rel="attachment wp-att-80"><img class="aligncenter size-medium wp-image-80" src="https://i0.wp.com/benhoffman.tech/wp-content/uploads/2016/08/unity.png?resize=300%2C109" alt="" width="300" height="109" srcset="https://i0.wp.com/benhoffman.tech/wp-content/uploads/2016/08/unity.png?resize=300%2C109 300w, https://i0.wp.com/benhoffman.tech/wp-content/uploads/2016/08/unity.png?w=676 676w" sizes="(max-width: 300px) 85vw, 300px" data-recalc-dims="1" /></a>

<a href="http://benhoffman.tech/index.php/2017/02/15/data-visualization-with-the-elk-stack-and-unity/elk/" rel="attachment wp-att-299"><img class="aligncenter size-medium wp-image-299" src="https://i1.wp.com/benhoffman.tech/wp-content/uploads/2017/02/ELK.png?resize=300%2C100" alt="Elk stack picture" width="300" height="100" srcset="https://i1.wp.com/benhoffman.tech/wp-content/uploads/2017/02/ELK.png?resize=300%2C100 300w, https://i1.wp.com/benhoffman.tech/wp-content/uploads/2017/02/ELK.png?w=600 600w" sizes="(max-width: 300px) 85vw, 300px" data-recalc-dims="1" /></a>Not many people use Unity(or really any game engine) for data visualization. I think that the main reason for this is that Unity is not marketed as a data visualization tool, and there is already a large market for such things that companies would rather use. I am currently exploring the different possibilities for interactive data visualization using Unity and the [Logstash](https://www.elastic.co/products/logstash) pipeline. Logstash is just one part of something much bigger called the ELK stack(Elasticsearch, Logastah, and Kibana).

For more information on what exactly the ELK stack is, or want a great guide to installing it, check out my friend&#8217;s website <a href="https://holdmybeer.xyz/2017/01/24/intro-to-the-elk-stack-on-centos-7/" target="_blank">for help</a>. This was a HUGE resource for me when it came to installing the ELK stack on <a href="https://www.centos.org/" target="_blank">CentOS </a>(which I have never used before 3 days ago) .

What makes Logstash so great in my eyes, is that it outputs in JSON format that is easily accessible. You can get JSON data from the ELK stack by posting an HTTP request in Unity via the <a href="https://docs.unity3d.com/ScriptReference/WWW.html" target="_blank">WWW component</a>.  You can also do this more broadly in C# using the <a href="https://msdn.microsoft.com/en-us/library/system.net.httpwebrequest(v=vs.110).aspx" target="_blank">HttpWebRequest</a> class. The reason I use WWW is because it is more optimized for game engines. After you store this data in a string (depending on what post query you use), you can use Unity&#8217;s <a href="https://docs.unity3d.com/ScriptReference/JsonUtility.html" target="_blank">JsonUtility</a> to parse through it and make it accessible like any other C# data. I made a more detailed post about how to this [here](http://benhoffman.tech/index.php/2017/02/08/json-data-in-unity/).

Once you have the data in C#, the possibilities are endless. A particularly interesting application of this is what I am doing on my current co-op, which is network data visualization. Reading the logs from tools like Bro, Snort, and Tshark into Logstash via <a href="https://www.elastic.co/products/beats/filebeat" target="_blank">Filebeat</a>, I can effectively visualization the devices that are on the network, and the netflow data going between them. Since we are using Unity, we can be as creative as we want with how we show this, instead of just a 2D graph like most network visualizations.

I am particularly interested in using VR to show the network data. Image walking through some netflow data in real time, that would be pretty cool!
