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
var current_departamento=getUrlParameter('depatos');

var current_productos= getUrlParameter('pro_serv');

var current_palabra_clave= getUrlParameter('pala_cla');




function onLoad() {
   loading_show();
    setFooter();

 $('#depa').val(current_departamento);
   document.addEventListener("deviceready", onDeviceReady, false);
    onDeviceReady();
     getDepato();


$('#txt_empresa').val(current_empresa);
    document.addEventListener("deviceready", onDeviceReady, false);
    onDeviceReady();
     //getRubros();

$('#txt_pro_serv').val(current_productos);
    document.addEventListener("deviceready", onDeviceReady, false);
    onDeviceReady();


  $('#txt_p_c').val(current_palabra_clave);
    document.addEventListener("deviceready", onDeviceReady, false);
    onDeviceReady();

}

function onDeviceReady() {

}

 /*function getRubros(){
   // alert("getRubros");
    var items="<option value=''>-Todos-</option>";
  
   
   $.ajax({
                    type: "POST",
                    url: base_url+"Servicio.php?Camarasal=rubros",
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

                        // items+="<option value='1'>Otros</option>";
                        
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


}*/


function getDepato(){
   // alert("getRubros");
    var items="<option value=''>-Todos-</option>";
  
   
   $.ajax({
                    type: "POST",
                    url: base_url+"Servicio.php?Camarasal=depatos",
                    //contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType: 'json',
                 
                    //timeout: 5000,
                    beforeSend: function(){
                     //   alert("start");
                    },
                    success: function (response) {
                 //   alert("GET END");
                       for(i in response.departamentos){
                            item=response.departamentos[i];
                            items+="<option value='"+item.id+"'>"+item.title+"</option>";
                        }

                        // items+="<option value='1'>Otros</option>";
                        
                        jQuery("#depa").html(items);
                       
                        if(current_departamento!=0){
                           jQuery("#depa").val(current_departamento);
                        }
                         if(current_departamento!=0 || current_departamento!=""){
                           // search_cupones();
                          }
                        //alert("getRubros END");
                        loading_hide();
                        
                        
                    },
                  error: function(xhr, status, error) {
                    //  var err = eval("(" + xhr.responseText + ")");
                      alert("error: "+xhr.responseText+ " | "+error +" | "+status);
                    }
                });


}

$(document).ready(function(e){
  
});
function clear_list(){
  $("#list-empresas").html("");
  search_cupones();
  return false;
}
function search_cupones(){

num_news_load=$("#list-empresas .item-empresa").size();
num_news_load=Number(num_news_load);
if(num_news_load>0){
      load_more_show();
}

    //var rubro=$("#rubro").val(); 
    var empresa=$('#txt_empresa').val(); 
    var depato=$('#depa').val();
    var producto=$('#txt_pro_serv').val();
    var palabra_c=$('#txt_p_c').val();
   // $("#list-empresas").html("");
    setFooter();
 
       $.ajax({
                    type: "POST",
                    //url: base_url+"Servicio.php?Camarasal=socios2&rubro="+rubro+"&razon_social="+empresa+"&num="+num_news_load,
            url: base_url+"Servicio.php?Camarasal=socios2&depa="+depato+"&razon_social="+empresa+"&producto="+producto+"&palabra_clave="+palabra_c+"&num="+num_news_load,
                    //contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType: 'json',
                    
                    beforeSend: function(){
                     //   alert("start");
                    },
                    success: function (response) {
                      
                    
                        for(i in response.socios){
                            item=response.socios[i];
                            item.description=item.razon_social.substring(0,80);
                            if(item.tipo_usuario=='premium')
                              $("#list-empresas").append(html_item_empresa_premium(item.id,item.razon_social,item.url_logo_thumb,item.alias));
                            else
                              $("#list-empresas").append(html_item_empresa(item.id,item.razon_social,item.url_logo_thumb,item.telefono,item.fax,item.direccion));
                        }
                        setFooter();
                       loading_hide();
                        load_more_hide();

                    },
                  error: function(xhr, status, error) {
                    //  var err = eval("(" + xhr.responseText + ")");
                      alert("error: "+xhr.responseText+ " | "+error +" | "+status);
                    }
                });
 return false;
}

function html_item_empresa(id,razon_social,url_logo_thumb,telefono,fax,direccion){
    html='<div class="row item-empresa invitado">'
            +'<div class="col-xs-12">'
             +'<label class="title-empresa">'+razon_social+'</label>'
             +'<p>Tel: '+telefono+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+'Fax: '+fax+'<br/>'
             +'<p>'+direccion+'</p>'
            +'</div><div class="col-xs-1"></div>'
        +'</div>';
     return html;
}
function html_item_empresa_premium(id,razon_social,url_logo_thumb,alias){
    html='<a href="javascript:openExternalBrowser(\''+site_url+alias+'\')"><div class="row item-empresa">'
            +'<div class="col-xs-4"><div class="img-container">'
            +((url_logo_thumb!=null) ? '<img src="'+site_url+url_logo_thumb+'">':'')
            +'</div></div><div class="col-xs-7" style="height:100%">'
             +'<table class="valing"><tr><td><label class="title-empresa">'+razon_social+'</label></td></tr></table>'
            +'</div><div class="col-xs-1"></div>'
        +'</div></a>';
     return html;
}
function openExternalBrowser(url){
  
  navigator.app.loadUrl(url, {openExternal: true});
  //window.open(url, '_blank', 'location=yes');
}

$(document).scroll(function(e){
    sc=$(document).scrollTop();
    h=$(document).height();
    wh=$(window).height();
    h=(h-wh);
    //console.log(sc+" - "+(h-wh));
    if(sc==h){
        search_cupones();
    }
});
