//var base_url="http://niccosabe.com/";
var base_url="http://demo.web-informatica.info/nicco/";

function getSolicitudes(id_venta_repuesto){
  var dataString = base_url + "sistema/API/getSolicitudesxventa/"+id_venta_repuesto;
  $.ajax({
    type: "POST",
    url: dataString,
    data:{filtro:$("#filtro").val()},
    beforeSend: function(){ $("#loginMsg").html('ObteniendoDatos');},
    success: function(data){
      console.log(data);
      var dataArray = JSON.parse(data);
      for(i in dataArray.solicitudes_nuevas){
        item = dataArray.solicitudes_nuevas[i];
        item.fecha_creacion = item.fecha_creacion.split(' ')[0];
    //alert(item.nombre);

   // htmltoPrint = "<div class='item'><div class='table-responsive'><table><thead><tr><th>Marca</th><th>Modelo</th><th>Año</th><th>Repuestos</th></tr></thead><tbody><tr class='clickable-row' data-href='foobar.com'><td>" + item.marca + "</td><td>" + item.modelo + "</td><td>" + item.anio + "</td><td>" + item.pieza + "</td></tr></tbody></table><br><p>Descripción</p><span>" + item.descripcion + "</span></div><div class='preview-container' style='background-image: url( " + base_url + item.imagen + ");'></div><div><p>Comentarios</p><span>" + item.mensaje + "</span></div><br /><div class='respuesta-container'><p>Respuesta</p><table class='table-respuesta'><tr><td><span>Si</span><label for='respuesta' class='glyphicon glyphicon-ok text-yellow'></label><input type='radio' name='respuesta' id='respuesta' value='S'></td><td><span>No</span><label for='respuesta_0' class='glyphicon glyphicon-remove text-yellow'></label><input type='radio' name='respuesta' id='respuesta' value='N'></td></tr><tr><td><p>Precio</p> <input class='input-control id_solicitud_repuesto' value='"+item.id_solicitud_repuesto+"'' type='hidden'>  <input class='input-control id_solicitud_detalle' value='"+item.id_solicitud_detalle+"'' type='hidden'>    <input class='input-control precio'  type='number'></td><td><p>Garantía</p><input class='input-control garantia'  type='number'></td><td><p>Tiempo</p><select name=\"tiempo\" style=\"width:74px\" class=\"input-control tiempo\"><option value=\"dias\">Dias</option><option value=\"meses\">Meses</option></select></td></tr><tr><td><input type='button' value=\"Enviar\" class=\"btn-red boton\"> </td><tr></table></div><div class='clearfix'></div>      </div>";
   htmltoPrint= ""+
   "<div class='item'>"+
   "<div class='table-responsive'>"+
   "<table>"+
   "<thead>";

   if(item.notificar_correo==0 && item.notificar_telefono==1){
     htmltoPrint+="<tr><td colspan='2'>Este cliente ha solicitado su respuesta por teléfono</td></tr>";
   }else{
    if(item.notificar_telefono==0)
      htmltoPrint+="<tr><td colspan='2'>Notificar al cliente por Correo eletrónico</td></tr>";
    else
      htmltoPrint+="<tr><td colspan='2'>Notificar al cliente por Correo eletrónico o telefono</td></tr>";
  }
  

  htmltoPrint+="<tr><th style='text-align: left;'>Nombre</th><th style='text-align: left;'>Teléfono</th></tr>"+
  "</thead>"+
  "<tbody>"+
  "<tr class='clickable-row'><td style='text-align: left;'>" + item.nombre + "</td><td style='text-align: left;'>" + item.telefono + "</td></tr>"+
  "</tbody>"+
  "<thead>"+
  "<tr><th style='text-align: left;'>Correo</th><th>Fecha</th style='text-align: left;'></tr>"+
  "</thead>"+
  "<tbody>"+
  "<tr class='clickable-row'><td style='text-align: left;'>" + item.correo + "</td><td style='text-align: left;'>" + item.fecha_creacion + "</td></tr>"+
  "</tbody>"+
  "</table>"+
  "<table>"+
  "<thead>"+
  "<tr><th>Marca</th><th>Modelo</th><th>Año</th><th>Repuestos</th></tr>"+
  "</thead>"+
  "<tbody>"+
  "<tr class='clickable-row' ><td>" + item.marca + "</td><td>" + item.modelo + "</td><td>" + item.anio + "</td><td>" + item.pieza + "</td></tr>"+
  "</tbody>"+
  "</table>"+
  "<br><p>Descripción</p>"+
  "<span>" + item.descripcion + "</span>"+
  "</div>"+
  "<div class='preview-container' style='background-image: url( " + base_url + item.imagen + ");'></div>"+
   //"<div><p>Comentarios</p><span>" + item.mensaje + "</span></div>"+
   "<div class='respuesta-container'><p>Respuesta</p>"+
   "<table class='table-respuesta'>"+
   "<tr>"+
   "<td><span>Si</span><input type='radio' name='respuesta' id='respuesta' value='S'></td>"+
   "<td><span>No</span></label><input type='radio' name='respuesta' id='respuesta' value='N'></td>"+
   "</tr>"+
   "<tr><td> </td><tr></table></div>"+
   "<div class='descripcion-container'>"+
   "<table class='table-descripcion'>"+
   "<tr>"+
   "<td><label>Descripción del producto</label><textarea name='descripcion' class='form-control'></textarea>"+
   "</td>"+
   "</tr>"+
   "</table>"+
   "</div>"+
   "<div class='clearfix'></div><input type='button' value=\"Enviar\" class=\"btn-red boton\" id_solicitud_detalle='"+item.id_solicitud_detalle+"' id_solicitud_repuesto='"+item.id_solicitud_repuesto+"' ></div>";
   
   $("#lista-items").append(htmltoPrint);
   
   
 }
 if(dataArray.solicitudes_nuevas==false){
  $("#lista-items").append('<b>No se poseen solicitudes nuevas</b>');
  
}
setFooter();
loading_hide();

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
  var id_solicitud_detalle = $(this).attr("id_solicitud_detalle");
  var id_solicitud_repuesto = $(this).attr("id_solicitud_repuesto");
/*
    if(!$.isNumeric(garantia)){
      alert("Por favor ingrese en número la cantidad de meses");
      return;
      // $(this).parent().parent().parent().find(".garantia").focus();
    }
    */
    index=$(this).index(".boton");
   // if(!$.isNumeric(precio)){
     // alert("Por favor ingresar un valor sin comas y signo de moneda");
    //    return;
      // $(this).parent().parent().parent().find(".garantia").focus();
   // }
   respuesta=$(".table-respuesta:eq("+index+")").find('[name="respuesta"]:checked').val();
   respuesta=(respuesta=="S"?"Si":"No");
   var descripcion = $(".table-descripcion:eq("+index+")").find('[name="descripcion"]').val();
   
   var dataString = base_url + "sistema/API/setDatos/"+id_solicitud_detalle+"/"+id_solicitud_repuesto+"/0"+"/0";
   $.ajax({
    type: "POST",
    url: dataString,
    data:{'precio':precio,'garantia':garantia,'respuesta':respuesta,'descripcion':descripcion},
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
    onDeviceReady();
    $("#filtro").change(function(){
      loading_show();

      getSolicitudes(window.localStorage.getItem("id_venta_repuesto"));
    });
  });