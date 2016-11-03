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
		imgwidth = (307/442) * height;
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
		$('#hannah_area').css('margin-left',windowhalfwidth);
		$('#hannah_area').css('margin-top',fivepct*2);
		$('#hannah_area').css('width',imghalfwidth);
		$('#hannah_area').css('height',fivepct*17);
	}

	$(window).resize(reset_dims); 
	reset_dims();
	
// specify picture to show on mouseover of different divs
	$('#aviva_area').mouseenter(function(){
		$('#aviva_area').css('cursor','pointer');
	  	$('#default').css('opacity','0');
		$('#hl_aviva').css('opacity','1');
		$('#hl_hannah').css('opacity','0');
	});
	$('#aviva_area').mouseleave(function(){
	  	$('#default').css('opacity','1');
		$('#hl_aviva').css('opacity','0');
		$('#hl_hannah').css('opacity','0');
	});
	$('#hannah_area').mouseenter(function(){
		$('#hannah_area').css('cursor','pointer');
	  	$('#default').css('opacity','0');
		$('#hl_aviva').css('opacity','0');
		$('#hl_hannah').css('opacity','1');
	});
	$('#hannah_area').mouseleave(function(){
	  	$('#default').css('opacity','1');
		$('#hl_aviva').css('opacity','0');
		$('#hl_hannah').css('opacity','0');
	});


// Go to relevant subpages when divs are clicked
	$("#aviva_area").on('click', function(){
	     window.location = "./aviva";    
	});
	$("#hannah_area").on('click', function(){
	     window.location = "./hannah";    
	});
	
});

