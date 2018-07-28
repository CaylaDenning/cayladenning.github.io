"use strict";

(function() {

  window.onload = init;

  /* Add items that will be on every page, like the menu and footer */
  function init() {
    // Do an ajax request to the stuff
    console.dir('[init] load the projects!');

    loadProjects();
  }

  function loadProjects() {
    var xhr = new XMLHttpRequest();


    xhr.onload = function(){
      // JSON.parse() converts a string to JSON.
      var myJSON = JSON.parse( xhr.responseText );
      var allProjects = myJSON.projects;

      var projectsDiv = document.querySelector('#projects');


      console.dir('There are ' + allProjects.length + ' projects! ');

      for(var i = 0; i < allProjects.length; ++i) {
        var project = allProjects[i];
        // Create a div for all the info to sit in
        var div = document.createElement('div');
        div.id = 'projectInfo';

        // Create Title
        var title = document.createElement('h2');
        title.id = 'projectTitle';
        title.textContent = project.title + " (" + project.tools + ")";
        div.appendChild(title);

        // Add image
        var image = document.createElement('img');
        image.id = "projectBanner";
        image.src = project.image;
        div.appendChild(image);

        // Add description
        var desc = document.createElement('p');
        desc.innerHTML = project.description;
        div.appendChild(desc);

        // Add links from the project
        var linksDiv = document.createElement('div');
        linksDiv.id = 'projectLinks';

        for(var j = 0; j < project.links.length; ++j) {
          // Create a link
          var a = document.createElement('a');
          a.target = '_blank';
          a.href = project.links[j].value;
          a.innerHTML = project.links[j].name;

          // Put that link inside a paragraph so it is on a new line
          var p = document.createElement('p');
          var text = document.createTextNode('- ');
          p.appendChild(text);
          p.appendChild(a);

          linksDiv.appendChild(p);
        }

        div.appendChild(linksDiv);

        // Append the generated content to the page
        projectsDiv.appendChild(div);
      }

    }	// end xhr onload

    var url = "data/projects.json";
		xhr.open('GET', url, true);
		// try to prevent browser caching by sending a header to the server
		xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2010 00:00:00 GMT");
		xhr.send();

  }

}())  // end IFFY
