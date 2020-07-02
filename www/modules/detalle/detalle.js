app.controller("Detalle",function($scope,$routeParams,$http){
	$scope.$parent.show_header=true;

	$scope.model={};
	
	$scope.dataPost={};
	$scope.dataPost.respuesta=null;

	$scope.model.solicitudes=[];
	$scope.solicitud={};
	$scope.i=0;
	$scope.total=0;
	$scope.solicitudes_get=function(){
		loading_show();
		id_venta=localStorage.getItem("id_venta_repuesto");
		$http({
			method:"POST",
			url:api_url+"getSolicitudesxventa/"+id_venta,
			data:{filtro:10},
		}).then(function(response){
			if(response.data.success==true){
				//return;
				$scope.model.solicitudes=response.data.solicitudes_nuevas;
				if($scope.model.solicitudes!=false){
					$scope.total=$scope.model.solicitudes.length;
					if($scope.model.solicitudes.length>0){
						$scope.solicitud=$scope.model.solicitudes[0];
						$scope.imagen();
					}
				}else{
					$scope.total=0;
				}
				
			}
			loading_hide();
		});
	};
	$scope.solicitudes_get();

	$scope.enviar=function($event){

		$event.preventDefault();
		$http({
			method:"POST",
			url:api_url+"setDatos/"+$scope.solicitud.id_solicitud_detalle+"/"+$scope.solicitud.id_solicitud_repuesto+"/0/0",
			data:$scope.dataPost
		}).then(function(response){
			$scope.i++;
			$scope.solicitud=$scope.model.solicitudes[$scope.i];
			$scope.total--;
			$scope.imagen();
			$scope.dataPost={};
			$scope.dataPost.respuesta=null;
		});
	}
	$scope.imagen=function(){
		if($scope.solicitud.imagen!=null){
			$scope.solicitud.imagen=base_url+$scope.solicitud.imagen;
		}
	}
});