---
id: 802
title: Unity build automation with Jenkins
date: 2018-07-12T20:59:32+00:00
author: Ben Hoffman
layout: post
guid: http://benhoffman.tech/?p=802
permalink: /index.php/2018/07/12/unity-build-automation-with-jenkins/
categories:
  - General
tags:
  - guide
  - jenkins
  - unity
---
Recently I have been upgrading my development pipeline and looking for ways to improve my dev ops. One of the biggest things that I knew I could improve upon was my build pipeline for my Unity games.

Since I have started working on [_Aurum Kings_](https://store.steampowered.com/app/848460/Aurum_Kings/), I have had to build for Windows, Mac, and Linux in an effort to make the game as accessible as possible. What I was doing at first was just building to one platform, switching, and then building to the other. Needless to say this got old pretty fast, so I started looking into [Jenkins](https://jenkins.io/). Jenkins was the obvious choice for me, not only because I spent a ton of time hearing about it at GDC, but because it is free and open source.

By the end of this guide you will be to use Jenkins to build your Unity game on a given time interval, or whenever the repository gets updated.

Something to note before starting is that this is done on Windows 10, so your process may be a bit different on Mac, but it should be mostly the same. You theoretically can do this on a Linux server as well, but I would not recommend it because the Unity Linux version is not very stable and may cause weird errors.

#### Step One &#8212; Installing / Initial Setup of Jenkins

Download Jenkins and follow the installer from <a href="https://jenkins.io/download/" target="_blank" rel="noopener">their site</a>.

After it&#8217;s done, it should automatically open up a new tab in your browser. If it doesn&#8217;t, just go to <http://localhost:8080> (Or whatever the address of your server is) .

After verifying your secret Jenkins password, install their suggested plugins (If you know more about what plugins that you want than feel free to change this).

Once this is done, then all that is left to do is install the GitHub Integration plugin. Go to Manage Jenkins > Manage Plugins > Available (Tab) and search for [GitHub Integration](https://plugins.jenkins.io/github-pullrequest).  Select the checkbox for it and then hit Install. You can restart Jenkins after it is installed if you want, but you don&#8217;t necessarily have to.

#### Step Two &#8212; Allowing jenkins to access your repository

To allow your Jenkins server access to your GitHub repository, you have to give it a deployment key. A deployment key is just an SSH key pair that Jenkins and GitHub will use to access each other.

First you have to generate your key pair on your Jenkins machine. There are multiple ways to do this, but I found the easiest way was just to use the command line. The following command will generate a key pair for you: `ssh-keygen -t rsa`

On Windows 10 the keys will be saved to your .ssh folder under your user. There you can open up the keys in any text editor to see them.

Next you have to make the repository aware of your Jenkins public key. To do this, go to your repository > Settings > Deploy keys.

<a href="http://benhoffman.tech/index.php/2018/07/12/unity-build-automation-with-jenkins/deploykey/" rel="attachment wp-att-805"><img class="aligncenter size-medium wp-image-805" src="https://i2.wp.com/benhoffman.tech/wp-content/uploads/2018/07/deployKey.png?resize=300%2C131" alt="" width="300" height="131" srcset="https://i2.wp.com/benhoffman.tech/wp-content/uploads/2018/07/deployKey.png?resize=300%2C131 300w, https://i2.wp.com/benhoffman.tech/wp-content/uploads/2018/07/deployKey.png?resize=768%2C335 768w, https://i2.wp.com/benhoffman.tech/wp-content/uploads/2018/07/deployKey.png?w=1012 1012w" sizes="(max-width: 300px) 85vw, 300px" data-recalc-dims="1" /></a>

Copy and paste the contents of your _public_ SSH key into the &#8220;Key&#8221; field and hit &#8220;Add key&#8221;.  Now that Jenkins has read only access to your repository, we have to add the credentials to Jenkins itself.

To do this go to Jenkins > Credentials > Global > Add Credentials. The kind of credential is _SSH Username with private key_. You can then paste in your private key and save it. Jenkins and GitHub should now be able to integrate together!

#### step three &#8212; Creating a job

Now that Jenkins can access your Git repo, it can use that to build your Unity game!

To make a new job, just select &#8220;New Item&#8221; in the top left corner of the Jenkins home page. Then give your Job a name, and select a _Freestyle Project._

From here, you can see a couple of options. Give your job a description, and paste your GitHub URL into the &#8220;GitHub Project&#8221; section.

<a href="http://benhoffman.tech/index.php/2018/07/12/unity-build-automation-with-jenkins/description/" rel="attachment wp-att-807"><img class="aligncenter size-medium wp-image-807" src="https://i1.wp.com/benhoffman.tech/wp-content/uploads/2018/07/description.png?resize=300%2C112" alt="" width="300" height="112" srcset="https://i1.wp.com/benhoffman.tech/wp-content/uploads/2018/07/description.png?resize=300%2C112 300w, https://i1.wp.com/benhoffman.tech/wp-content/uploads/2018/07/description.png?resize=768%2C287 768w, https://i1.wp.com/benhoffman.tech/wp-content/uploads/2018/07/description.png?w=936 936w" sizes="(max-width: 300px) 85vw, 300px" data-recalc-dims="1" /></a>

Under &#8220;Source Code Management&#8221; select _Git._ Enter your repository URL again, and select the credentials that you entered earlier. Notice that you can select which branches to build here as well.

<a href="http://benhoffman.tech/index.php/2018/07/12/unity-build-automation-with-jenkins/sourcecodemanagement/" rel="attachment wp-att-812"><img class="aligncenter size-medium wp-image-812" src="https://i0.wp.com/benhoffman.tech/wp-content/uploads/2018/07/sourceCodeManagement.png?resize=300%2C144" alt="" width="300" height="144" srcset="https://i0.wp.com/benhoffman.tech/wp-content/uploads/2018/07/sourceCodeManagement.png?resize=300%2C144 300w, https://i0.wp.com/benhoffman.tech/wp-content/uploads/2018/07/sourceCodeManagement.png?resize=768%2C370 768w, https://i0.wp.com/benhoffman.tech/wp-content/uploads/2018/07/sourceCodeManagement.png?w=912 912w" sizes="(max-width: 300px) 85vw, 300px" data-recalc-dims="1" /></a>

#### Adding Build triggers

Build triggers are what make Jenkins start the build steps. We will have one on a Cron task to run every morning, and one when the Master branch of our repository is updated.

The Cron task is simple, as you can just select the &#8220;Build Periodically&#8221; and type in the times you want it to run. For example, `H 05 * * 1-5` will run a build at 5 AM Monday through Friday.

**Note &#8211; **In order to use GitHub hook integration, your Jenkins server needs to be accessible to GitHub. This means that you will either have to port forward your router for Jenkins, or you could use some sort of cloud service.

In order to have Jenkins build when the branches are updated, check the &#8220;GitHub hook trigger for GITScm polling&#8221; option.

<a href="http://benhoffman.tech/index.php/2018/07/12/unity-build-automation-with-jenkins/buildtriggers/" rel="attachment wp-att-814"><img class="aligncenter size-medium wp-image-814" src="https://i1.wp.com/benhoffman.tech/wp-content/uploads/2018/07/buildTriggers.png?resize=300%2C123" alt="Build Triggers in Jenkins" width="300" height="123" srcset="https://i1.wp.com/benhoffman.tech/wp-content/uploads/2018/07/buildTriggers.png?resize=300%2C123 300w, https://i1.wp.com/benhoffman.tech/wp-content/uploads/2018/07/buildTriggers.png?resize=768%2C315 768w, https://i1.wp.com/benhoffman.tech/wp-content/uploads/2018/07/buildTriggers.png?w=933 933w" sizes="(max-width: 300px) 85vw, 300px" data-recalc-dims="1" /></a>

Back in your GitHub settings, go to &#8220;Integration & services&#8221; tab in the repo settings. Hit the Add Service button, and select &#8220;Jenkins (GitHub plugin)&#8221;. All you have to do to set this up is follow the instructions and type in the following hook URL:

`http://< YOUR JENKINS SERVER ADDRESS >/github-webhook`

That&#8217;s it! Jenkins will now build when the master branch updates.

#### Build Steps

The last thing to do with your Jenkins server is to actually tell it how to build your project. I wrote a quick Python script to call the <a href="https://docs.unity3d.com/Manual/CommandLineArguments.html" target="_blank" rel="noopener">command line arguments for Unity</a> that I wanted.

You can see my Python script on my GitHub <a href="https://github.com/BenjaFriend/AurumKings-Build" target="_blank" rel="noopener">here</a>. This script in particular just runs a Windows build with output going to a folder named by the time and date.

<a href="http://benhoffman.tech/index.php/2018/07/12/unity-build-automation-with-jenkins/buildste/" rel="attachment wp-att-808"><img class="aligncenter size-medium wp-image-808" src="https://i0.wp.com/benhoffman.tech/wp-content/uploads/2018/07/buildSte.png?resize=300%2C90" alt="" width="300" height="90" srcset="https://i0.wp.com/benhoffman.tech/wp-content/uploads/2018/07/buildSte.png?resize=300%2C90 300w, https://i0.wp.com/benhoffman.tech/wp-content/uploads/2018/07/buildSte.png?resize=768%2C229 768w, https://i0.wp.com/benhoffman.tech/wp-content/uploads/2018/07/buildSte.png?resize=1024%2C306 1024w, https://i0.wp.com/benhoffman.tech/wp-content/uploads/2018/07/buildSte.png?resize=1200%2C358 1200w, https://i0.wp.com/benhoffman.tech/wp-content/uploads/2018/07/buildSte.png?w=1433 1433w" sizes="(max-width: 300px) 85vw, 300px" data-recalc-dims="1" /></a>

As you can see, it is pretty simple to add in a build step. Personally I like to just run a Windows batch command to run my Python script, but there are a ton of different ways to do this.

This is also where you could run test suites, zip up the build and post it somewhere, etc.

#### Conclusion

Overall, integrating Jenkins into my development has been really cool and fun to learn. The process has improved the scalability of my work greatly, as well as allowing me to test and iterate faster throughout development.

I would highly recommend setting up a Jenkins server of your own, especially because of how  low the barrier to entry is. You could do this with an old laptop sitting in a closet, or with an AWS instance. Just remember that if you are using an old laptop in a corner that you should not rely on that to be the only spot where your builds are. Always back up your data!!

I hope this gives you a clear idea of how to use Jenkins, and happy automating!