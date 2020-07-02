app.controller("Dashboard",function($scope,$routeParams,$http){
	$scope.$parent.show_header=true;

	$scope.model={};
	$scope.total_ventas=0;
	$scope.get_totals=function(){
		id_venta_repuesto=localStorage.getItem("id_venta_repuesto");
	
		
		$http({
			method:"POST",
			url: api_url+"getSolicitudesxventa/"+id_venta_repuesto,
			data:{filtro:10}
		}).then(function(response){
			if(response.data.solicitudes_nuevas!=false){
				$scope.total_ventas=response.data.solicitudes_nuevas.length;	
			}else{
				$scope.total_ventas=0;
			}
			
			
		});
		


	};
	$scope.get_totals();

});
