var homepageDiv = document.getElementById('homepage');
var homepageHeight = homepageDiv.offsetHeight;
var sidebarDiv = document.getElementById('sidebar');
var sidebarHeight = sidebarDiv.offsetHeight;

var documentHeight = window.pageYOffset + window.innerHeight;

homepageDiv.style.height = homepageHeight - sidebarHeight + 'px';

// console.log(homepageDiv.offsetHeight);
// console.log(sidebarDiv.offsetHeight);
