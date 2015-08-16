function HomeCtrl($scope, $http){
	
	$scope.init = function(){
		$scope.getIcons();
	};//init

	/*------------------------------ Get Icons ------------------------------*/
	$scope.getIcons = function(){
		$scope.iconArray = ['JavaScript','HTML','CSS','jQuery','AngularJs','WordPress','Python','PHP','LESS-CSS','Coffee-Script'];
	};
	
	/*------------------------------ INIT ------------------------------*/
	$scope.init();
	
}//HomeCtrl
