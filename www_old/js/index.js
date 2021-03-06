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
//var base_url="http://repuestosautoweb.com/";
var version = "1.0.20";
var base_url="http://niccosabe.com/";
//var base_url = "http://demo.web-informatica.info/nicco/";
$(window).load(function() {


	$(document).on('click', '.clickable-row', function(event) {
		event.preventDefault();
		alert("fooBar");
	});

	/*FOOTER*/
	var header = $("#header").outerHeight();
	var content = $("#content").outerHeight();
	var w_height = $(window).height();

	if ((header+content) > w_height) {
		$("#footer").addClass('relative');
	}
	else {
		$("#footer").addClass('absolute');
	}

});

$(window).resize(function(event) {

	/*FOOTER*/
	var header = $("#header").outerHeight();
	var content = $("#content").outerHeight();
	var w_height = $(window).height();

	if ((header+content) >= w_height) {
		$("#footer").removeClass('absolute');
		$("#footer").addClass('relative');
	}
	else {
		$("#footer").removeClass('relative');
		$("#footer").addClass('absolute');
	}

});
if(window.localStorage.getItem("version")==null || window.localStorage.getItem("version")!=version){
  localStorage.removeItem("id_venta_repuesto");
  localStorage.removeItem("registrationId");
}

if(window.localStorage.getItem("id_venta_repuesto")!=null  && (window.localStorage.getItem("registrationId")!=null && window.localStorage.getItem("registrationId")!=""))
{
  window.location.href = "dashboard.html";

}


console.log("Paso 1");


var REGID="0";
var pushNotification;


/* fin de parametros */

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
      console.log("Device READY!");
      

      var push = PushNotification.init({
        android: {
          senderID: 269296394294
        },
        ios:{
          alert: 'true',
          badge: 'true',
          sound: 'true'
        }
      });

      push.on('registration', function(data) {
        console.log("REGID ready: "+data.registrationId);
        localStorage.setItem("registrationId", data.registrationId);
        if(window.localStorage.getItem("id_venta_repuesto")!=null ){
          
          window.location.href = "dashboard.html";

        }
      });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {


    },
    successHandler: function(result) {
      console.log("Paso 3");
      //alert('Callback Success! Result = '+result)
    },errorHandler:function(error) {
      console.log("Paso 4");

    },
    onNotificationGCM: function(e) {

      switch( e.event )
      {
        case 'registered':
        if ( e.regid.length > 0 )
        {
          console.log("Regid " + e.regid);
          REGID= e.regid;
                    //alert('registration id = '+e.regid);
                  }
                  break;

                  case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
              break;

              case 'error':
              alert('GCM error = '+e.msg);
              break;

              default:
              alert('An unknown GCM event has occurred');
              break;
            }
          }

        };
        app.initialize();

        function doLogin(){

          var txtUsuario=$("#txtUsuario").val();
          var txtContrasena=$("#txtContrasena").val();
          var dataString = base_url + "sistema/API2/ValidarUsuario/";

          loading_show();
          dataPost={
            'user':txtUsuario,
            'pass':txtContrasena,
            'regid':localStorage.getItem("registrationId")
          };
          $.ajax({
            type: "POST",
            url: dataString,
            data:dataPost,
            beforeSend: function(){},
            success: function(data){
              loading_hide();
              var dataArray = JSON.parse(data);
              
              if(dataArray["result"]==true )
              {
                window.localStorage.setItem("version",version);
                window.localStorage.setItem("id_venta_repuesto",dataArray["data"]["id_venta_repuesto"]);
                window.location.href = "dashboard.html";
              }
              else
              {
                alert("Credenciales Incorrectas");
                $("#loginMsg").html('Intente nuevamente');
              }
            }
          });

        };
