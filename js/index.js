$(document).ready(function(){

// extract img dimensions and infer hannah/aviva locations
	function reset_dims() {
		var windowwidth=window.innerWidth || 
    	document.documentElement.clientWidth || 
    	document.body.clientWidth;
		height = $(window).height();
		console.log(height);
		//imgwidth = (307/442) * height;
		imgwidth = (274/442) * height;
		if (windowwidth < imgwidth) {truewidth = windowwidth;} 
		else {truewidth = imgwidth;}
		leftedge = (windowwidth/2) - (truewidth/2);
		fivepct = height/20;
		$('#aviva_area').css('margin-left',leftedge);
		$('#aviva_area').css('margin-top',fivepct*3);
		$('#aviva_area').css('width',truewidth*0.45);
		$('#aviva_area').css('height',fivepct*17);
		$('#hannah_area').css('margin-left',leftedge+(truewidth*0.45)+1);
		$('#hannah_area').css('margin-top',fivepct*2);
		$('#hannah_area').css('width',(truewidth*0.55)-2);
		$('#hannah_area').css('height',fivepct*16);
		$('#showabout').css('margin-left',leftedge+truewidth-48);
		$('#about').css('max-width',0.85*truewidth);
		wait=0;// milliseconds to delay after clicking area (more on mobile)
		if (windowwidth < 600) {wait=500;}
	}
	$(window).on('resize load', reset_dims);
	reset_dims();


// specify picture to show on mouseover of different divs
	$('#aviva_area').mouseenter(function(){
		$('#hl_aviva').css('opacity','1');
	});
	$('#aviva_area').mouseleave(function(){
		$('#hl_aviva').css('opacity','0');
		$('#hl_hannah').css('opacity','0');
	});
	$('#hannah_area').mouseenter(function(){
		$('#hl_hannah').css('opacity','1');	
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

// Show about section when showabout div is clicked
	$("#showabout").on('click', function(){
        $('#about').css('opacity','0.7');
        $('#about').css('z-index','2');
        $('#showabout').css('display','none');
	});
// Hide about section when hideabout div is clicked
	$("#hideabout").on('click', function(){
        $('#about').css('opacity','0');
        $('#about').css('z-index','0');
        $('#showabout').css('display','block');
	});	
	
});

