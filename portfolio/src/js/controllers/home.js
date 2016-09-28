function HomeCtrl($scope, $http){
	
	$scope.init = function(){
		$scope.iconArray = $scope.getIcons();
	};//init

	/*------------------------------ Get Icons ------------------------------*/
	$scope.getIcons = function(){
		return ['JavaScript','HTML','CSS','jQuery','AngularJs','WordPress','Python','PHP','LESS-CSS','Coffee-Script'];
	};
	
	/*------------------------------ INIT ------------------------------*/
	$scope.init();
	
}//HomeCtrl
