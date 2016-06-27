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



function onLoad() {
    loading_show();
    setFooter();
    document.addEventListener("deviceready", onDeviceReady, false);
    onDeviceReady();
    getNoticias();



}

function onDeviceReady() {

}
function getNoticias(){

num_news_load=$("#list-empresas .item-empresa").size();
num_news_load=Number(num_news_load);
if(num_news_load>0){
      load_more_show();
}
   // $("#list-empresas").html("");
       $.ajax({
                    type: "POST",
                    url: base_url+"Servicio.php?Camarasal=noticias2&num="+num_news_load,
                    //contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType: 'json',
                   
                    beforeSend: function(){
                     //   alert("start");
                    },
                    success: function (response) {
                       
                
                        for(i in response.noticias){
                            item=response.noticias[i];
                           // item.introtext=item.introtext.substring(0,80);
                            $("#list-empresas").append(html_item_noticia(item.id,item.title,item.introtext,item.images));
                        }
                        setFooter();
                        loading_hide();
                        load_more_hide();
                    },
                  error: function(xhr, status, error) {
                      var err = eval("(" + xhr.responseText + ")");
                       setFooter();
                        loading_hide();
                        load_more_hide();
                     // alert("error: "+xhr.responseText+ " | "+error +" | "+status);
                    }
                });
       return false;
}



$(document).ready(function(e){
  
});

/*$(document).scroll(function(e){
    sc=$(document).scrollTop();
    h=$(document).height();
    wh=$(window).height();
    h=(h-wh);
    //console.log(sc+" - "+(h-wh));
    if(sc==h){
        getNoticias();
    }
});*/


function html_item_noticia(id,title,desc,img){
    html='<a href="detalle_noticias.html?id='+id+'"><div class="row item-empresa">'
            +'<div class="col-xs-4"><div class="img-container">'
            +((img!=null) ? '<img src="'+site_url+img+'">':'')

            +'</div></div><div class="col-xs-7">'
             +'<label class="title-empresa">'+title+'</label>'
               // +'<div class="description-empresa">'+desc+'</div>'
            +'</div><div class="col-xs-1"></div>'
        +'</div></a>';
     return html;
}
