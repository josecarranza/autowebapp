$(window).load(function() {

	/*FOOTER*/
	var header = $("#header").outerHeight();
	var content = $("#content").outerHeight();
	var footer = $("#footer").outerHeight();

	var w_height = $(window).height();

	if ((header+content+footer) > w_height) {
		$("#footer").removeClass('absolute');
		$("#footer").addClass('relative');
	}
	else {
		$("#footer").removeClass('relative');
		$("#footer").addClass('absolute');	
	}

	$("[name='respuesta']").change(function(event) {
		
		alert("Respuesta: "+$(this).val());

	});
	
});

$(window).resize(function(event) {
	
	/*FOOTER*/
	var header = $("#header").outerHeight();
	var content = $("#content").outerHeight();
	var footer = $("#footer").outerHeight();

	var w_height = $(window).height();

	if ((header+content+footer) > w_height) {
		$("#footer").removeClass('absolute');
		$("#footer").addClass('relative');
	}
	else {
		$("#footer").removeClass('relative');
		$("#footer").addClass('absolute');	
	}

});