$(document).ready(function(){

// Show/hide back-to-top button
  window.onscroll = function() {showhide_backtotop()};
  $(window).bind('resize', showhide_backtotop);
  function showhide_backtotop() {
    if (document.body.scrollTop > 200) {
        $('.backtotop').css('display','block');
    } else {
        $('.backtotop').css('display','none');
    }
  }

// Open and close slideshow at the correct image when various elements are clicked
  $('#grid img').click(function() {
    var index = $( "#grid img" ).index( this );
    showDivs(index+1);
    document.getElementById("slideshow").style.display = "block";
  });
  $('.topband, .bottomband, .closebtn').click(function() {
    document.getElementById("slideshow").style.display = "none";
  });

// set height of image(s) in slides based on window size
  function set_slide_height() { 
    height = $(window).height();
    var windowwidth=window.innerWidth || 
    document.documentElement.clientWidth || 
    document.body.clientWidth;
    if (height <= 450 || windowwidth <= 450) {var multiplier = 0.98;}
    else {var multiplier = 0.72;}
    $('figure>img').css('max-height',height*multiplier); // overlay-content height minus padding(?)
   }
  $(window).bind('resize', set_slide_height);
  set_slide_height();

// extract window dimensions and infer left and right areas for clicking back and forward
  function reset_areas() {
    var windowwidth=window.innerWidth || 
    document.documentElement.clientWidth || 
    document.body.clientWidth;
    tenpct = windowwidth/10;
    height = $(window).height();
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
  $('#leftside').mouseenter(function(){$('.leftscroller').css('opacity','1');});
  $('#leftside').mouseleave(function(){$('.leftscroller').css('opacity','0.3');});
  $('#rightside').mouseenter(function(){$('.rightscroller').css('opacity','1');});
  $('#rightside').mouseleave(function(){$('.rightscroller').css('opacity','0.3');});

// Scroll right or left when various elements are clicked
  $('.leftscroller, #leftside').click(function() {plusDivs(-1);});
  $('.rightscroller, #rightside').click(function() {plusDivs(+1);});

// Make the figcaption dis/appear on click and toggle the up/down arrow accordingly
  $('figcaption').click(function() {
/* hides all captions unless lines 69 & 72 are commented out, then hides only clicked-on caption */
    $( "figure" ).each(function() {
      $(this).find('i:first').toggleClass("fa-angle-double-down fa-angle-double-up");
      $(this).find('span:first').slideToggle();
    });
  });
});


// Increment up or down slides
  var slideIndex;
  var x;
  function plusDivs(n) {
      showDivs(slideIndex +=n);
  }

// Show the slide we're on, hide all others
  function showDivs(n) {
    var i;
    var width;
    slideIndex = n;
    x = document.getElementsByTagName("figure");
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
    var windowwidth=window.innerWidth || 
    document.documentElement.clientWidth || 
    document.body.clientWidth;
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
    windowheight = $(window).height();
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


