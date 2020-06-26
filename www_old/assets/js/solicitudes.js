$(window).load(function() {


	$(document).on('click', '.clickable-row', function(event) {
		event.preventDefault();
		alert("fooBar");
	});

	/*FOOTER*/
	var header = $("#header").outerHeight();
	var content = $("#content").outerHeight();
	var w_height = $(window).height();

	if ((header+content) > w_height) {
		$("#footer").addClass('relative');
	}
	else {
		$("#footer").addClass('absolute');	
	}

});

$(window).resize(function(event) {
	
	/*FOOTER*/
	var header = $("#header").outerHeight();
	var content = $("#content").outerHeight();
	var w_height = $(window).height();

	if ((header+content) >= w_height) {
		$("#footer").removeClass('absolute');
		$("#footer").addClass('relative');
	}
	else {
		$("#footer").removeClass('relative');
		$("#footer").addClass('absolute');	
	}

});