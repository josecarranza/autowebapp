app.controller("Login",function($scope,$routeParams,$http){
	$scope.$parent.show_header=false;

	$scope.model={};
	$scope.dataPost={};


	$scope.login=function(){
		loading_show();
		console.log("start post");
		$scope.dataPost.regid=localStorage.getItem("registrationId");
		console.log($scope.dataPost);
		$http({
			method:"POST",
			url:api_url+"ValidarUsuario/",
			data:$scope.dataPost
		}).then(function(response){
			console.log("login success");
			loading_hide();
			var dataArray = response.data;
              
              if(dataArray["result"]==true )
              {
                window.localStorage.setItem("version",version);
                window.localStorage.setItem("id_venta_repuesto",dataArray["data"]["id_venta_repuesto"]);
                window.location.href = "#/dashboard";
              }
              else
              {
                alert("Credenciales Incorrectas");
              
              }
		},function(e){
			console.log("error login");
			console.log(JSON.stringify(e));
			alert("error");
		});
	};

	

});
