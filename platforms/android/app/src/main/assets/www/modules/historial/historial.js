app.controller("Historial",function($scope,$routeParams,$http){
	$scope.$parent.show_header=true;

	$scope.model={};
	$scope.model.ventas=[];
	$scope.venta={};
	$scope.i=0;
	$scope.historial_get=function(){
		loading_show();
		id_venta=localStorage.getItem("id_venta_repuesto");
		$http({
			method:"POST",
			url:api_url+"getSolicitudesenviadas/"+id_venta
		}).then(function(response){
			if(response.data.success==true){
				$scope.model.ventas=response.data.solicitudes_nuevas;
				if($scope.model.ventas.length>0){
					$scope.venta=$scope.model.ventas[0];
					$scope.imagen();
				}
			}
			loading_hide();
		});
	};
	$scope.historial_get();

	$scope.next=function(){
		$scope.i++;
		$scope.venta=$scope.model.ventas[$scope.i];
		$scope.imagen();
	}
	$scope.prev=function(){
		$scope.i--;
		$scope.venta=$scope.model.ventas[$scope.i];
		$scope.imagen();
	}
	$scope.imagen=function(){
		if($scope.venta.imagen!=null && $scope.venta.imagen!=""){
			$scope.venta.imagen_final=base_url+$scope.venta.imagen;
		}
	}

});