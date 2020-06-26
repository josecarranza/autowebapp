var base_url="http://niccosabe.com/";
//var base_url="http://demo.web-informatica.info/nicco/";


function getSolicitudes(id_venta_repuesto){
  var dataString = base_url + "sistema/API2/getSolicitudesxventa/"+id_venta_repuesto;
  $.ajax({
    type: "POST",
    url: dataString,
    beforeSend: function(){ $("#loginMsg").html('ObteniendoDatos');},
    success: function(data){
      //alert(data);
      var dataArray = JSON.parse(data);
  //  alert(dataArray["solicitudes_nuevas"]);
  console.log(dataArray);
  console.log(dataArray.solicitudes_nuevas);

  for(i in dataArray.solicitudes_nuevas){
    item = dataArray.solicitudes_nuevas[i];
    //alert(item.nombre);


    htmltoPrint =  "	<tr class='clickable-row' data-href='verDetalle("+ item.id_solicitud +")'> " +
    "<td>"+ item.marca + "</td>"+
    "<td>" + item.modelo + "</td>"+
    "<td>" + item.cantidad + "</td>"+
    "</tr>";


    $("#dataTable tbody").append(htmltoPrint);
  }

  function verDetalle(idSolicitud){
    localStorage.setItem("idSolicitud", idSolicitud);
    window.location="detalleSolicitud.html";

  }


}
});

};

document.addEventListener("deviceready", onDeviceReady, false);

   // device APIs are available
   //
   function onDeviceReady() {
     console.log(window.localStorage.getItem("id_venta_repuesto"));
     getSolicitudes(window.localStorage.getItem("id_venta_repuesto"));

     //getSolicitudes(window.localStorage.getItem("id_venta_repuesto"))

   }
