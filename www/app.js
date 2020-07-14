var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'modules/login/login.html',
			controller: 'Login'
		}).
		when('/dashboard', {
			templateUrl: 'modules/dashboard/dashboard.html',
			controller: 'Dashboard'
		}).
		when('/detalle_solicitud', {
			templateUrl: 'modules/detalle/detalle.html',
			controller: 'Detalle'
		}).
		when('/historial', {
			templateUrl: 'modules/historial/historial.html',
			controller: 'Historial'
		}).
		otherwise({
			redirectTo: '/'
		});
	}]);
app.config(['$httpProvider', function ($httpProvider) {
  // Intercept POST requests, convert to standard form encoding
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
  	var key, result = [];

  	if (typeof data === "string")
  		return data;

  	for (key in data) {
  		if (data.hasOwnProperty(key))
  			result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
  	}
  	return result.join("&");
  });
}]);

app.controller("ctrl",function($scope,$http,$location){
	$scope.model={};
	$scope.menu_active=false;
	$scope.show_header=true;
	

	$scope.titulo="";
	$scope.color_titulo="";

	$scope.menu_toggle=function(){
		if($scope.menu_active){
			$scope.menu_active=false;
		}else{
			$scope.menu_active=true;
		}
	};
	$scope.$on('$routeChangeStart', function($event, next, current) { 
		$scope.menu_active=false;
		//$scope.check_login();
	});
	$scope.check_login=function(){
		if(localStorage.getItem("id_venta_repuesto")==undefined || localStorage.getItem("id_venta_repuesto")==null){
			window.location.href = "#/";
		}else{
			window.location.href = "#/dashboard";
		}

	}
	$scope.check_login();


	$scope.logout=function(){
		localStorage.removeItem("id_venta_repuesto");
		window.location.href = "#/";
	}
});

var REGID="0";
var pushNotification;


/* fin de parametros */

var app_codova = {
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
    	app_codova.receivedEvent('deviceready');
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
    		/*if(window.localStorage.getItem("id_venta_repuesto")!=null ){

    			window.location.href = "dashboard.html";

    		}*/
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
  app_codova.initialize();


  var version = "1.0.24";
  var api_url="http://niccosabe.com/sistema/API2/";
  var base_url="http://niccosabe.com/";
