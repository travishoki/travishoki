function ContactCtrl($scope, $http){
	
	$scope.init = function(){
		$scope.sendingContactForm = false;
	};//init

	$scope.sendContactForm = function(){
		$scope.alerts = Array();
		$scope.sendingContactForm = true;

		var url = 'portfolio/api/api.html';
		url += '?cmd=sendContactForm'
		url += '&name=' + $scope.contactName;
		url += '&email=' + $scope.contactEmail;
		url += '&comment=' + $scope.contactComment;
		$http.get(url).then(function(response) {
			$scope.sendingContactForm = false;
			$scope.contactName = '';
			$scope.contactEmail = '';
			$scope.contactComment = '';
			$scope.alerts = [{ type: 'success', msg: 'Message sent successfully.'}];
		});
	};//sendContactForm

	/*------------------------------ ALERTS ------------------------------*/
	
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
	
	/*------------------------------ INIT ------------------------------*/
	$scope.init();
	
}//ContactCtrl