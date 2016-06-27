function onLoad() {
 loading_show();
    setFooter();
    document.addEventListener("deviceready", onDeviceReady, false);
    onDeviceReady();
    get_detalle_cupon(getUrlParameter('id'));

    if(getUrlParameter('frommap')!='1'){
        $("#back-btn").attr("href","descuentos.html?cat="+getUrlParameter('cat')+"&empresa="+getUrlParameter('empresa'));
    }
    else{
         $("#back-btn").attr("href","javascript:history.back()");
     }
}
function get_detalle_cupon(id){
$.ajax({
                    type: "POST",
                    url: base_url+"Servicio.php?Camarasal=cupones&id="+id,
                    //contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType: 'json',
                 
                    //timeout: 5000,
                    beforeSend: function(){
                     //   alert("start");
                    },
                    success: function (response) {
                 //   alert("GET END");
                      for(i in response.cupones){
                            item=response.cupones[i];
                           // item.description=item.description.substring(0,80);
                        
                            $("#img-empresa").attr("src",site_url+item.intro_image);
                            $("#title-empresa").text(item.title);
                            $("#description-empresa").html(item.description);

                        }
                        
                       loading_hide();
                       setFooter();
                        //alert("getRubros END");
                        
                    },
                  error: function(xhr, status, error) {
                    //  var err = eval("(" + xhr.responseText + ")");
                      alert("error: "+xhr.responseText+ " | "+error +" | "+status);
                    }
                });


}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
function onDeviceReady() {
	}