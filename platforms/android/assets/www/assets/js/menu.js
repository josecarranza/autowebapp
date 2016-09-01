$(document).ready(function(){
$("#BurgerButton a img").click(function(event) {

	status_menu=$(".menu-app").attr("status");
	if(status_menu=="close"){
		$("body").animate({'margin-left':"-200px",'margin-right':"200px"},500);
		$(".menu-app").animate({'width':'200px'},500);
		$(".menu-app").attr("status",'open');
	}else{
		$("body").animate({'margin-left':"0",'margin-right':"0"},500);
		$(".menu-app").attr("status",'close');
		$(".menu-app").animate({'width':'0'},500);
	}
});
});

function logout(){
	dataString = base_url + "sistema/API/logout/";
	$.ajax({
    type: "POST",
    url: dataString,
    data:{'idventa':window.localStorage.getItem("id_venta_repuesto")},
    beforeSend: function(){ },
    success: function(data){
      var dataArray = JSON.parse(data);
	   	window.localStorage.clear();
		window.location.href = "index.html";
    }
  });
	
}

function setFooter(){
   
     H=$(window).height();
    BH=$("#content").height();
    if(H>BH){
        $("#footer").css("position","fixed");
    }else{
         $("#footer").css("position","relative");
    }
   
}

function loading_show(){
    $(".loading-panel").remove();
    H=$(window).height();
    W=$(window).width();
    $('body').append('<div class="loading-panel"><table><tr><td><img src="images/loading2.gif" height="50" /></td></tr></table></div>');
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