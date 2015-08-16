function ContactCtrl($scope, $http){
	
	$scope.init = function(){
		$scope.alerts = [];
		$scope.sendingContactForm = false;
	};//init

	$scope.sendContactForm = function(){
		$scope.sendingContactForm = true;

		var url = 'portfolio/api/api.html';
		url += '?cmd=sendContactForm'
		url += '&name=' + $scope.contactName;
		url += '&email=' + $scope.contactEmail;
		url += '&comment=' + $scope.contactComment;
		$http.get(url).then(function(results) {
			$scope.sendingContactForm = false;
			$scope.contactName = '';
			$scope.contactEmail = '';
			$scope.contactComment = '';
			var alert;
			if(results == 'success'){
				alert = {type: 'success', msg: 'Message sent successfully'};
			}else{
				alert = {type: 'danger', msg: 'Message failed. Please contact Travis via email at travis.hoki@gmail.com'};
			}
			$scope.alerts.push(alert);
		});
	};//sendContactForm

	/*------------------------------ ALERTS ------------------------------*/
	
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
	
	/*------------------------------ INIT ------------------------------*/
	$scope.init();
	
}//ContactCtrl