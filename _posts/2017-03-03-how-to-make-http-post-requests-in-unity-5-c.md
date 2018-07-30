---
id: 346
title: 'How to make HTTP GET/POST Requests in Unity 5 C#'
date: 2017-03-03T12:11:54+00:00
author: Ben Hoffman
layout: post
categories:
  - Demo
  - General
tags:
  - elk
  - unity
---
Recently I have been doing a lot with GET and PUT requests to get JSON data from a server. Throughout my time working on this project, I noticed that the examples provided by Unity for using the <a href="https://docs.unity3d.com/ScriptReference/WWW.html" target="_blank">WWW</a> class for POST headers, is geared more towards SQL databases, and they make a lot of assumptions about your server configuration.

### Why use the WWW class?

There a tons of ways to make HTTP requests in C#, like the <a href="https://msdn.microsoft.com/en-us/library/system.web.httprequest(v=vs.110).aspx" target="_blank">HttpRequest Class</a> for example. But, there is a huge problem with using classes like these at run time in Unity, and that is they run on the main thread. This means that if the thing that you a requesting is large enough (which it really doesn&#8217;t need to be that big), it can cause some pretty bad frame rates. Even if you put the request in a co-routine, then you if things fail it can get pretty complicated to handle things how you want to. Or if there is a timeout to the server, or a bad request, then everything could come crashing down.

The WWW class has several features about it that are useful. First of all, it is built into Unity, so you have that without having to look at a bunch of different documentations. The WWW class handles all the back end stuff for you, like opening and closing the data streams, with _much_ less code. Finally, the WWW class runs on a separate thread! This means increased performance, and less chance of things hanging up your frame rate.

## How to implement the WWW class

The WWW class is simple and easy to use, but you will need a couple things first if you want to make a POST request with it.

  1. A database set up on a server, whether it is SQL, ELK, or whatever other back end you want. This needs to be configured before you can do anything.
  2. Make sure that the firewall that is configured on the server will allow you to access the port or service that you need. This sounds obvious but it can cause a lot of frustration if you don&#8217;t catch it early.
  3. A Unity project that is hungry for some JSON data!

Here is a co-routine that will make a request, and wait for it to finish before moving along.

```
private IEnumerator PostJsonData(){
 // The URL of the server, and the port
 string url = "http://&lt;myURL&gt;:&lt;my Port&gt;";

 // The query that you want to send, read in from the streaming assets
 // This way we can just read in the Query once and reference it
 string query = System.IO.File.ReadAllText(Application.streamingAssetsPath + "/myQuery.json");

 // Create HTML headers
 Dictionary&lt;string, string&gt; headers = new Dictionary&lt;string, string&gt;();

 // Set the headers to be JSON format
 headers["Content-Type"] = "application/json";

 // Get the post data that I will be using, and encode it properly
 byte[] postData = Encoding.GetEncoding("UTF-8").GetBytes(query);

 // Create a web request object
 WWW myRequest = new WWW(url, postData, headers);

 // Yield until it's done:
 yield return myRequest;

 // Check if there was an error or not
 if(myRequest.error ==null)
 {
 // There was no error, you have your data!
 // Send that data to the Json Utility and get it parsed in a C# data object
 string jsonDataString = myrequest.text;

 }
 else
 {
 // Handle there being an error
 Debug.Log("There was an error in the request");
 }
}
```

Now that you have your JSON data in string format, you can use Unity&#8217;s <a href="https://docs.unity3d.com/ScriptReference/JsonUtility.html" target="_blank">JSON Utility class</a> to turn it into a C# data object. I have another post about doing that [here](http://benhoffman.tech/index.php/2017/02/08/json-data-in-unity/).

If you are interested in how to do this specifically with the ELK stack, then fear not! I have more posts about that coming, with specific instructions on how to configure it. For now I made a <a href="https://github.com/bah8892/NetworkMonitorVis" target="_blank">GitHub repo</a> with a couple useful things for creating a CentOS 7 ELK stack.

<a href="https://unity3d.com/unity/whats-new/unity-5.5.1" target="_blank">Using Unity 5.5.1</a>
