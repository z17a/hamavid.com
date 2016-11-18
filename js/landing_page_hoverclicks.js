$(document).ready(function(){
	
// set height of image(s) based on window size
	function set_images_height() { 
	    $('.images').height($(window).height());
	 }
	$(window).bind('resize', set_images_height);
	set_images_height();

// extract img dimensions and infer hannah/aviva locations
	function reset_dims() {
		$window = $(window);
		windowwidth = $window.width();
		height = $window.height();
		windowhalfwidth = windowwidth/2;
		imgwidth = (307/442) * height; // old version w wider photo
		/// imgwidth = (267/440) * height; // new version w cropped photo
		if (windowwidth < imgwidth) {truewidth = windowwidth;} 
		else {truewidth = imgwidth;}
		imghalfwidth = truewidth/2;
		leftedge = windowhalfwidth - imghalfwidth;
		rightedge = windowhalfwidth + imghalfwidth;
		fivepct = height/20;
		$('#aviva_area').css('margin-left',leftedge);
		$('#aviva_area').css('margin-top',fivepct*3);
		$('#aviva_area').css('width',imghalfwidth);
		$('#aviva_area').css('height',fivepct*17);
		$('#hannah_area').css('margin-left',windowhalfwidth-1);
		$('#hannah_area').css('margin-top',fivepct*2);
		$('#hannah_area').css('width',imghalfwidth+1);
		$('#hannah_area').css('height',fivepct*17);
		wait=0;// milliseconds to delay after clicking area (more on mobile)
		if (windowwidth < 600) {wait=500;}
	}

/* CANVAS VERSION OF THINGS */ /*
// canvas set up and ellipses
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	function ellipse(context, cx, cy, rx, ry){
        context.save(); // save state
        context.beginPath();

        context.translate(cx-rx, cy-ry);
        context.scale(rx, ry);
        context.arc(1, 1, 1, 0, 2 * Math.PI, false);

        context.restore(); // restore to original state
        context.stroke();
	}
	function clearcanvas(context) {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

// reset when window is resized (so you don't have to refresh)
	$(window).resize(reset_dims); 
	reset_dims();


// show appropriate ovals on mouseenter/leave
	$('#aviva_area').mouseenter(function(){
		$('#aviva_area').css('cursor','pointer');
		ellipse(ctx, (267/4)-5, (440/20*11.5)-3, (267/4)-5, (440/20*8.5)+2); // aviva
	});
	$('#aviva_area').mouseleave(function(){
		clearcanvas(ctx);
	});
	$('#hannah_area').mouseenter(function(){
		$('#hannah_area').css('cursor','pointer');
		ellipse(ctx, (3*267/4)-4, (440/20*10.5)-3, (267/4)+5, (440/20*8.5)-5); // hannah
	});
	$('#hannah_area').mouseleave(function(){
		clearcanvas(ctx);
	});	
*/
	
// reset when window is resized (so you don't have to refresh)
	$(window).resize(reset_dims); 
	reset_dims();


// specify picture to show on mouseover of different divs
	$('#aviva_area').mouseenter(function(){
		$('#hl_aviva').css('opacity','1');
		document.getElementById('hl_aviva').style.WebkitTransition = 'opacity 1s';
		document.getElementById('hl_aviva').style.MozTransition = 'opacity 1s';
		document.getElementById('hl_aviva').style.transition = 'opacity 1s';
	});
	$('#aviva_area').mouseleave(function(){
		$('#hl_aviva').css('opacity','0');
		$('#hl_hannah').css('opacity','0');
	});
	$('#hannah_area').mouseenter(function(){
		$('#hl_hannah').css('opacity','1');
		document.getElementById('hl_hannah').style.WebkitTransition = 'opacity 1s';
		document.getElementById('hl_hannah').style.MozTransition = 'opacity 1s';
		document.getElementById('hl_hannah').style.transition = 'opacity 1s';
	});
	$('#hannah_area').mouseleave(function(){
		$('#hl_aviva').css('opacity','0');
		$('#hl_hannah').css('opacity','0');
	});


// Go to relevant subpages when divs are clicked (can add delay in milliseconds)
	$("#aviva_area").on('click', function(){
		setTimeout(function() {
        	window.location = "./aviva";
        }, wait);
	});
	$("#hannah_area").on('click', function(){
	     setTimeout(function() {
        	window.location = "./hannah";
        }, wait);   
	});
	
});

