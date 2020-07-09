function loading_show(){
    $(".loading-panel").remove();
    H=$(window).height();
    W=$(window).width();
    $('body').append('<div class="loading-panel"><table><tr><td><img src="assets/images/loading2.gif" height="50" /></td></tr></table></div>');
     $(".loading-panel").height(H).width(W);
    
}
function loading_hide(){
    $(".loading-panel").fadeOut(500);
}
$(window).resize(function(event) {
	 H=$(window).height();
    W=$(window).width();
	$(".loading-panel").height(H).width(W);
});