var homepageDiv = document.getElementById('homepage');
var homepageHeight = homepageDiv.offsetHeight;
var sidebarDiv = document.getElementById('sidebar');
var sidebarHeight = sidebarDiv.offsetHeight;

// Remove sidebar height from the homepage height
homepageDiv.style.height = homepageHeight - sidebarHeight + 'px';
