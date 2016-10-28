// Script to open and close sidenav
function w3_open() {
    document.getElementById("mySidenav").style.display = "block";
    document.getElementById("overlaySidenav").style.display = "block";
}
 
function w3_close() {
    document.getElementById("mySidenav").style.display = "none";
    document.getElementById("overlaySidenav").style.display = "none";
}

// Script to scroll through slides starting at the clicked-on image that triggers the slideshow opening
var slideIndex;
function plusDivs(n) {
    showDivs(slideIndex +=n);
}

function showDivs(n) {
    var i;
    slideIndex = n;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = n % x.length}
    if (n < 1) {slideIndex = x.length};
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
    }
    x[slideIndex-1].style.display = "block"; 
}

// Script to open and close slideshow when an image is clicked
function openSlides() {
    document.getElementById("slideshow").style.display = "block";
    //document.getElementById("overlaySlideshow").style.width = "100%";
}
function closeSlides() {
    document.getElementById("slideshow").style.display = "none";
    //document.getElementById("overlaySlideshow").style.width = "0%";
}



// ------------------ TOGGLE CENTRAL!! ---------------------//
// show or hide divs w class "hidden"
function ShowOrHide(n) {
    sporadic_secret = n;
    var all_secrets = document.getElementsByClassName("hidden");
    if (n > all_secrets.length) {sporadic_secret = n % all_secrets.length}
    if (n < 1) {sporadic_secret = all_secrets.length};
    if (all_secrets[sporadic_secret-1].style.display == "none") {
        all_secrets[sporadic_secret-1].style.display = "block";
    }
    else {all_secrets[sporadic_secret-1].style.display = "none";}
}

// Change text between "see more" and "see less" based on toggle
// could someday make more flexible eg w/ "data-text-swap" attribute
function tog_moreless(x) {
  var alltoggles = document.getElementsByClassName("toggler");
  if ( alltoggles[x-1].innerHTML == "see more") {
    alltoggles[x-1].innerHTML = "see less";
  } else {
     alltoggles[x-1].innerHTML = "see more"
  }
}

// Change text between + and - based on toggle
// could someday make more flexible eg w/ "data-text-swap" attribute
function tog_plusminus(x) {
  var alltoggles = document.getElementsByClassName("toggler");
  if ( alltoggles[x-1].innerHTML == "[+]") {
    alltoggles[x-1].innerHTML = "[-]";
  } else {
     alltoggles[x-1].innerHTML = "[+]"
  }
}


// Change right arrow icon to down arrow icon
function tog_icon(div_id) {
    var thisid = $("#"+div_id);
        $(thisid).toggleClass("fa fa-caret-right fa-lg fa fa-caret-down fa-lg");
}

// toggle sliding a div up and down 
// start with style="display:none" to start hidden)
// so far only works with div ids as numerical 
// but maybe there's away around that with proper quoting
function slidetoggle(div_id) {
    var thisid = $("#"+div_id);
    $(document).ready(function(){
        $(thisid).slideToggle();
    });
}    

// GET IMAGE DIMENSIONS!
function imgdim(url) {
    var img = new Image();
    img.onload = function(){
      var height = img.height;
      var width = img.width;

      console.log("width is " + width + ", height is "+height)
    }
    img.src = url;
}

