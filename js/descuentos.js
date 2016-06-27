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

var current_cat=getUrlParameter('cat');
var current_empresa=getUrlParameter('empresa');
var loading_more=false;
var is_loading_more_data=false;

function onLoad() {
     loading_show();
    setFooter();
$('#txt_empresa').val(current_empresa);
    document.addEventListener("deviceready", onDeviceReady, false);
    onDeviceReady();
     getRubros();



}

function onDeviceReady() {
/*navigator.geolocation.getCurrentPosition(geolocationSuccess,
                                         [geolocationError],
                                         [geolocationOptions]);
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);*/
    
}
function geolocationSuccess(){

}
function geolocationError(){

}
function geolocationOptions(){
    
}
function getRubros(){
   // alert("getRubros");
    var items="<option value=''>-Todos-</option>";
  
   
   $.ajax({
                    type: "POST",
                    url: base_url+"Servicio.php?Camarasal=categorias",
                    //contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType: 'json',
                 
                    //timeout: 5000,
                    beforeSend: function(){
                     //   alert("start");
                    },
                    success: function (response) {
                 //   alert("GET END");
                       for(i in response.categorias){
                            item=response.categorias[i];
                            items+="<option value='"+item.id+"'>"+item.title+"</option>";
                        }
                        
                        jQuery("#rubro").html(items);
                       
                        if(current_cat!=0){
                           jQuery("#rubro").val(current_cat);
                        }
                         if(current_cat!=0 || current_empresa!=""){
                            search_cupones();
                          }
                        //alert("getRubros END");
                         loading_hide();
                    },
                  error: function(xhr, status, error) {
                    //  var err = eval("(" + xhr.responseText + ")");
                      alert("error: "+xhr.responseText+ " | "+error +" | "+status);
                    }
                });

/*
  var xmlhttp  = new XMLHttpRequest();
  //  request.open("GET", "http://demo.web-informatica.info/camarasal/webapi/Servicio.php?Camarasal=categorias", true);

   


xmlhttp.onreadystatechange = function() {
    alert(xmlhttp.readyState+" status: "+xmlhttp.status);
    alert(xmlhttp.responseText);
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //var myArr = JSON.parse(xmlhttp.responseText);
        alert(xmlhttp.responseText);
       // myFunction(myArr);
    }
}
xmlhttp.open("GET", "http://demo.web-informatica.info/camarasal/webapi/Servicio.php?Camarasal=categorias", true);
xmlhttp.send();

function myFunction(arr) {
   alert(arr);
}*/


}
$(document).ready(function(e){
  
});

function search_cupones(){

num_news_load=$("#list-empresas .item-empresa").size();
num_news_load=Number(num_news_load);
if(num_news_load>0){
      load_more_show();
}
if(is_loading_more_data){
  return false;
}
if(!loading_more){
     loading_show();
     $("#list-empresas").html("");
}else{
  loading_more=false;
   is_loading_more_data=true;
}
    var rubro=$("#rubro").val();
    var empresa=$('#txt_empresa').val();
 
    setFooter();
       $.ajax({
                    type: "POST",
                    url: base_url+"Servicio.php?Camarasal=cupones&idcategory="+rubro+"&empresa="+empresa+"&num="+num_news_load,
                    //contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType: 'json',
                   
                    beforeSend: function(){
                     //   alert("start");
                    },
                    success: function (response) {
                       
                    
                        for(i in response.cupones){
                            item=response.cupones[i];
                            item.description=item.description.substring(0,70)+"...";
                            $("#list-empresas").append(html_item_empresa(item.id,item.title,item.description,item.intro_image,item.category,empresa));
                        }
                        if(response.cupones.length==0){
                          $(".fixed").removeClass("fixed");
                        }
                        setFooter();
                         loading_hide();
                         load_more_hide();
                         is_loading_more_data=false;
                    },
                  error: function(xhr, status, error) {
                    //  var err = eval("(" + xhr.responseText + ")");
                     setFooter();
                        loading_hide();
                        load_more_hide();
                         is_loading_more_data=false;
                     // alert("error: "+xhr.responseText+ " | "+error +" | "+status);
                    
                    }
                });
       return false;
}

function html_item_empresa(id,title,desc,img,cat,empresa){
    html='<a href="detalle_cupon.html?id='+id+'&cat='+cat+'&empresa='+empresa+'"><div class="row item-empresa">'
            +'<div class="col-xs-4"><div class="img-container"><img src="'+site_url+img+'"></div></div>'
            +'<div class="col-xs-7">'
             +'<label class="title-empresa">'+title+'</label>'
                +'<div class="description-empresa">'+desc+'</div>'
            +'</div><div class="col-xs-1"></div>'
        +'</div></a>';
     return html;
}

$(document).scroll(function(e){
    sc=$(document).scrollTop();
    h=$(document).height();
    wh=$(window).height();
    h=(h-wh);

    if(sc==h){
      loading_more=true;

        search_cupones();
    }
});