

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

