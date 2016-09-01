var base_url="http://repuestosautoweb.com/";

function getVentas(id_venta_repuesto){
var dataString = base_url + "sistema/API/ventas_ventarepuestos_get/"+id_venta_repuesto;
  $.ajax({
    type: "POST",
    url: dataString,
    beforeSend: function(){ $("#loginMsg").html('ObteniendoDatos');},
    success: function(data){

      console.log(data);
  var dataArray = JSON.parse(data);
  for(i in dataArray.ventas){
    item = dataArray.ventas[i];
    //alert(item.nombre);

  
    html='<tr><td>'+item.modelo+'</td><td>'+item.anio+'</td><td>'+item.pieza+'</td><td>'+item.cantidad+'</td><td>'+item.fecha_venta+'</td></tr>';
    $(".tbody-ventas").append(html);
  }

setFooter();
loading_hide();
    }
  });

};




document.addEventListener("deviceready", onDeviceReady, false);

   // device APIs are available
   //
   function onDeviceReady() {
    setFooter();
    loading_show();
     console.log(window.localStorage.getItem("id_venta_repuesto"));
     getVentas(window.localStorage.getItem("id_venta_repuesto"));

     //getSolicitudes(window.localStorage.getItem("id_venta_repuesto"))

   }
$(document).ready(function(){

 // getVentas(window.localStorage.getItem("id_venta_repuesto"));
});