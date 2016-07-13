/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
var base_url="http://demo.web-informatica.info/autowebapp/";

function onLoad(){

}

function setFooter(){

     H=$(window).height();
    BH=$("body").height();
    if(H>BH){
        $("footer").css("position","fixed");
    }else{
         $("footer").css("position","relative");
    }

}

$(window).resize(function(){
            setFooter();
            });

function loading_show(){
    $(".loading-panel").remove();
    H=$(window).height();
    W=$(window).width();
    $('body').append('<div class="loading-panel"><table><tr><td><img src="images/loading.gif" /></td></tr></table></div>');
     $(".loading-panel").height(H).width(W);

}

function loading_hide(){
    $(".loading-panel").fadeOut(500);
}
$(document).ready(function(){
    $("#menu").click(function(){
        $(".main-menu").slideToggle();
    });
});

function load_more_hide(){
    $(".load-more").fadeOut(500);
}

function load_more_show(){
    $(".load-more").remove();
    html='<div class="load-more"><img src="images/loading.gif" /></div>';
    $(html).insertBefore('footer');
    $(".load-more").fadeIn(500);
}


function login(){
var txtUsuario=$("#txtUsuario").val();
var txtContrasena=$("#txtContrasena").val();

var dataString = + base_url + "sistema/API/ValidarUsuario/"+txtUsuario+"/"+txtContrasena+""


if($.trim(txtUsuario).length>0 & $.trim(txtContrasena).length>0)
{
  $.ajax({
    type: "POST",
    url: url,
    data: dataString,
    crossDomain: true,
    cache: false,
    beforeSend: function(){ $("#loginMsg").html('Conectando...');},
    success: function(data){
    if(data=="success")
    {
      localStorage.login="true";
      localStorage.id_venta_repuesto=data.id_venta_repuesto;
      window.location.href = "dashboard.html";
    }
    else if(data="failed")
    {
      alert("Credenciales Incorrectas");
      $("#loginMsg").html('Login');
    }
    }
  });
}return false;
};
