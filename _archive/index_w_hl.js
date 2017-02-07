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
        	$('#instructions').css('opacity','0.7');
        	$('.label').css('opacity','0.7');
    	} else {
    		$('#instructions').css('opacity','0');
        	$('.label').css('opacity','0');
    	}
	}
	$(window).on('resize load', reset_dims_opac);
	reset_dims_opac();

// Go to relevant subpages when divs are clicked (can add delay in milliseconds)
	$("#aviva_area").on('click', function(){window.location = "./aviva";});
	$("#hannah_area").on('click', function(){window.location = "./hannah";});

// Show about section when showabout div is clicked
	$("#showabout").on('click', function(){
        $('#about').css('opacity','0.7');
        $('#about').css('z-index','2');
        $('#showabout').css('display','none');
        $('#instructions').css('opacity','0');
        $('.label').css('opacity','0');
	});
// Hide about section when hideabout div is clicked and reset opacity of relevant elements
	$("#hideabout").on('click', function(){
        $('#about').css('opacity','0');
        $('#about').css('z-index','0');
        $('#showabout').css('display','block');
        reset_dims_opac();
	});
	
});

