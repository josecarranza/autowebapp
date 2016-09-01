var base_url="http://repuestosautoweb.com/";

function getSolicitudes(id_venta_repuesto){
var dataString = base_url + "sistema/API/getSolicitudesxventa/"+id_venta_repuesto;
  $.ajax({
    type: "POST",
    url: dataString,
    beforeSend: function(){ $("#loginMsg").html('ObteniendoDatos');},
    success: function(data){

      console.log(data);
      var dataArray = JSON.parse(data);
  for(i in dataArray.solicitudes_nuevas){
    item = dataArray.solicitudes_nuevas[i];
    //alert(item.nombre);

    htmltoPrint = "<div class='item'><div class='table-responsive'><table><thead><tr><th>Marca</th><th>Modelo</th><th>Año</th><th>Repuestos</th></tr></thead><tbody><tr class='clickable-row' data-href='foobar.com'><td>" + item.marca + "</td><td>" + item.modelo + "</td><td>" + item.anio + "</td><td>" + item.pieza + "</td></tr></tbody></table><br><p>Descripción</p><span>" + item.descripcion + "</span></div><div class='preview-container' style='background-image: url( " + base_url + item.imagen + ");'></div><div><p>Comentarios</p><span>" + item.mensaje + "</span></div><br /><div class='respuesta-container'><p>Respuesta</p><table class='table-respuesta'><tr><td><span>Si</span><label for='respuesta' class='glyphicon glyphicon-ok text-yellow'></label><input type='radio' name='respuesta' id='respuesta' value='S'></td><td><span>No</span><label for='respuesta_0' class='glyphicon glyphicon-remove text-yellow'></label><input type='radio' name='respuesta' id='respuesta' value='N'></td></tr><tr><td><p>Precio</p> <input class='input-control id_solicitud_repuesto' value='"+item.id_solicitud_repuesto+"'' type='hidden'>  <input class='input-control id_solicitud_detalle' value='"+item.id_solicitud_detalle+"'' type='hidden'>    <input class='input-control precio'  type='number'></td><td><p>Garantía</p><input class='input-control garantia'  type='number'></td><td><p>Tiempo</p><select name=\"tiempo\" style=\"width:74px\" class=\"input-control tiempo\"><option value=\"dias\">Dias</option><option value=\"meses\">Meses</option></select></td></tr><tr><td><input type='button' value=\"Enviar\" class=\"btn-red boton\"> </td><tr></table></div><div class='clearfix'></div>      </div>";

    $("#lista-items").append(htmltoPrint);
    setFooter();
    loading_hide();
  }


    }
  });

};


$(document).on('click','#respuesta',function(){
  //alert("Dio Click" + this.value);

  if ( this.value == "N"){
    $(this).parent().parent().parent().find(".garantia").hide();
    $(this).parent().parent().parent().find(".precio").hide();
    $(this).parent().parent().parent().find(".tiempo").hide();
    $(this).parent().parent().parent().find(".garantia").val(0);
    $(this).parent().parent().parent().find(".precio").val(0);
    //table-respuesta
  }else{
    $(this).parent().parent().parent().find(".garantia").show();
    $(this).parent().parent().parent().find(".precio").show();
    $(this).parent().parent().parent().find(".tiempo").show();
  }

});

$(document).on('click','.boton',function(){
    var garantia = $(this).parent().parent().parent().find(".garantia").val()+' '+$(this).parent().parent().parent().find(".tiempo").val();
    var precio = $(this).parent().parent().parent().find(".precio").val();
    var id_solicitud_detalle = $(this).parent().parent().parent().find(".id_solicitud_detalle").val();
    var id_solicitud_repuesto = $(this).parent().parent().parent().find(".id_solicitud_repuesto").val();
/*
    if(!$.isNumeric(garantia)){
      alert("Por favor ingrese en número la cantidad de meses");
      return;
      // $(this).parent().parent().parent().find(".garantia").focus();
    }
    */

    if(!$.isNumeric(precio)){
      alert("Por favor ingresar un valor sin comas y signo de moneda");
        return;
      // $(this).parent().parent().parent().find(".garantia").focus();
    }

    var dataString = base_url + "sistema/API/setDatos/"+id_solicitud_detalle+"/"+id_solicitud_repuesto+"/"+precio+"/"+garantia;
      $.ajax({
        type: "POST",
        url: dataString,
        data:{'precio':precio,'garantia':garantia},
        beforeSend: function(){ $("#loginMsg").html('ObteniendoDatos');},
        success: function(data){

          window.location.href = "detalleSolicitud.html";


        }
      });



});


document.addEventListener("deviceready", onDeviceReady, false);

   // device APIs are available
   //
   function onDeviceReady() {
    setFooter();
    loading_show();
    //console.log(window.localStorage.getItem("id_venta_repuesto"));
   getSolicitudes(window.localStorage.getItem("id_venta_repuesto"));

     //getSolicitudes(window.localStorage.getItem("id_venta_repuesto"))

   }
$(document).ready(function(){
  //onDeviceReady();
});