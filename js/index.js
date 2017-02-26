$(document).ready(function(){

// set figure properties and opacity of instructions and labels, based on screen height/width 
	function reset_dims_opac() {
		var windowwidth=window.innerWidth || 
    	document.documentElement.clientWidth || 
    	document.body.clientWidth;
		imgwidth = (274/442) * $(window).height();
		$('figure').css('width',imgwidth);
		//$('figure').css('margin-left',(windowwidth/2)-(imgwidth/2));
		if (windowwidth<=450 || $(window).height()<=450) {
        	$('.label').css('opacity','0.7');
        	$('.smallabout').css('display','block');
        	$('.largeabout').css('display','none');
    	} else {
    		$('.label').css('opacity','0');
    		$('.smallabout').css('display','none');
        	$('.largeabout').css('display','block');
    	}
	}
	$(window).on('resize load', reset_dims_opac);
	reset_dims_opac();

// Go to relevant subpages when divs are clicked (can add delay in milliseconds)
	$("#aviva_area").on('click', function(){window.location = "./aviva";});
	$("#hannah_area").on('click', function(){window.location = "./hannah";});

// Change characteristics of various elements when showabout div is clicked
	$("#showabout").on('click', function(){
        $('.about').css('opacity','0.7');
        $('.about').css('z-index','2');
        $('#showabout').css('display','none');
        $('#instructions, .label').css('opacity','0');
	});
// Change back characteristics of various elements when hideabout x is clicked
	$(".hideabout").on('click', function(){
        $('.about').css('opacity','0');
        $('.about').css('z-index','0');
        $('#showabout').css('display','block');
        $('#instructions').css('opacity','0.7');
        reset_dims_opac();
	});

});

