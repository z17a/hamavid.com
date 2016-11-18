// Open and close sidenav
function w3_open() {
    document.getElementById("mySidenav").style.display = "block";
    document.getElementById("overlaySidenav").style.display = "block";
}
 
function w3_close() {
    document.getElementById("mySidenav").style.display = "none";
    document.getElementById("overlaySidenav").style.display = "none";
}


// -------- Control slideshow appearance and scroll through specified slides -------- // 
$(document).ready(function(){

// set height of image(s) in slides based on window size
  function set_slide_height() { 
    $window = $(window);
    height = $window.height();
    var windowwidth=window.innerWidth || 
    document.documentElement.clientWidth || 
    document.body.clientWidth;
    if (height <= 450 || windowwidth <= 450) {var multiplier = 0.98;
      console.log('h=' + height + 'm=' + multiplier + 'w=' + windowwidth);}
    else{var multiplier = 0.72;}
    $('.slide').css('max-height',height*multiplier); // overlay-content height minus padding(?)
   }
  $(window).bind('resize', set_slide_height);
  set_slide_height();

// extract window dimensions and infer left and right areas for clicking back and forward
  function reset_areas() {
    $window = $(window);
     var windowwidth=window.innerWidth || 
    document.documentElement.clientWidth || 
    document.body.clientWidth;
    /*windowwidth = $window.width();*/
    tenpct = windowwidth/10;
    height = $window.height();
    $('#leftside').css('margin-right',tenpct*8);
    $('#rightside').css('margin-left',tenpct*2);
    $('#leftside').css('width',tenpct*2);
    $('#rightside').css('width',tenpct*8);
    $('#leftside').css('height',0.8*height);
    $('#rightside').css('height',0.8*height);
  }

// reset when window is resized (so you don't have to refresh)
  $(window).resize(reset_areas); 
  reset_areas();

// highlight left and right scroll arrows when hovering on diff areas of screen
  $('#leftside').mouseenter(function(){
    $('.leftscroller').css('opacity','1');
  });
  $('#leftside').mouseleave(function(){
    $('.leftscroller').css('opacity','0.3');
  });
  $('#rightside').mouseenter(function(){
    $('.rightscroller').css('opacity','1');
  });
  $('#rightside').mouseleave(function(){
    $('.rightscroller').css('opacity','0.3');
  });
});

// Increment up or down slides
var slideIndex;
var x;
function plusDivs(n) {
    initial = 0;
    showDivs(slideIndex +=n);
}

// Show the slide we're on, hide all others
function showDivs(n) {
    var i;
    var width;
    slideIndex = n;
    x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = n % x.length}
    if (n < 1) {slideIndex = x.length};
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
    }
    x[slideIndex-1].style.display = "block";
    get_margins();
    $(window).bind('resize', get_margins);
}

// Determine margins for this image so it is centered
function get_margins() {
  // first set margins to zero so image is rendered at full size
  var margin_side = 0;
  var margin_top = 0;
  reset_margins(margin_top,margin_side);

 // find out how big image is and how big leftover screen is
    $window = $(window);
    var windowwidth=window.innerWidth || 
    document.documentElement.clientWidth || 
    document.body.clientWidth;
    /*windowwidth = $window.width();*/
    if (windowwidth > 992) {overlaywidth = windowwidth - 180} // adjust for sidebar
    else {overlaywidth = windowwidth}
    imgwidth = x[slideIndex-1].clientWidth
    if (imgwidth == 0) { // wait for image to load before setting margins
      setTimeout(function(){
          console.log('waiting for image to load');
          showDivs(slideIndex);
      }, 100);
    }
    margin_side = (overlaywidth - imgwidth)/2;
    windowheight = $window.height();
    if (windowheight <= 450 || windowwidth <= 450){var multiplier = 1}else{var multiplier = 0.8}
    overlayheight = multiplier*windowheight
    imgheight = x[slideIndex-1].clientHeight;
    margin_top = (overlayheight - imgheight)/2;
    
  // set margins to center the image according to how much screen is leftover
    reset_margins(margin_top,margin_side);
}

// pulling this out for less repitition
function reset_margins(top,side) {
  var margin_top = top;
  var margin_side = side;
  x[slideIndex-1].style.removeProperty('margin-left');
  x[slideIndex-1].style.setProperty('margin-left', margin_side + 'px', 'important');
  x[slideIndex-1].style.removeProperty('margin-top');
  x[slideIndex-1].style.setProperty('margin-top', margin_top + 'px', 'important');
}

// Open and close slideshow when an image is clicked
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

// Change window close/expand
function tog_closeopen_icon(div_id) {
    var thisid = $("#"+div_id);
    $(thisid).toggleClass("fa fa-angle-double-down fa-lg fa fa-angle-double-up fa-lg");
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

// GET IMAGE DIMENSIONS! not currently particularly useful or used
function imgdim(url) {
    var img = new Image();
    img.onload = function(){
      var imgheight = img.height;
      var imgwidth = img.width;

      console.log("width is " + imgwidth + ", height is " + imgheight)
    }
    img.src = url;
}

