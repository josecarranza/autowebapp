var base_url="http://niccosabe.com/";
//var base_url="http://demo.web-informatica.info/nicco/";

function getSolicitudes(id_venta_repuesto){


  var dataString = base_url + "sistema/API2/ObtenerDashboard/"+id_venta_repuesto;



  $.ajax({
    type: "POST",
    url: dataString,
    beforeSend: function(){ $("#loginMsg").html('Conectando...');},
    success: function(data){
      var dataArray = JSON.parse(data);

      if(dataArray.success==true )
      { 

        console.log(dataArray);
     
        $(".cont-sol").html('<p class="n-solicitudes">'+dataArray.solicitudes_nuevas+'</p>');
      }
      else
      {
        console.log("hola");
       
         $(".cont-sol").html('<p class="n-solicitudes">0</p>');
      }
    }
  });

};

document.addEventListener("deviceready", onDeviceReady, false);

function get_totals(id_venta_repuesto){
  total_ventas=0;
  total_solicitudes=0;
  var dataString = base_url + "sistema/API2/ventas_ventarepuestos_get/"+id_venta_repuesto;
  $.ajax({
    type: "POST",
    url: dataString,
    data:{regid:localStorage.getItem("registrationId")},
    beforeSend: function(){ $("#loginMsg").html('ObteniendoDatos');},
    success: function(data){
      var dataArray = JSON.parse(data);
      total_ventas=dataArray.ventas.length;
      $(".cont-ventas").html(total_ventas);

    }
  });

  
}





   // device APIs are available
   //
   function onDeviceReady() {
    if(localStorage.getItem("registrationId")=="" || localStorage.getItem("registrationId")==null)
      logout();
     //alert(window.localStorage.getItem("id_venta_repuesto"));
     getSolicitudes(window.localStorage.getItem("id_venta_repuesto"));

    //  $("a").attr("href", "DETAL")
     //getSolicitudes(window.localStorage.getItem("id_venta_repuesto"))
     get_totals(window.localStorage.getItem("id_venta_repuesto"));

   }

   $(document).ready(function($) {
 // get_totals(window.localStorage.getItem("id_venta_repuesto"));
 //onDeviceReady();

});