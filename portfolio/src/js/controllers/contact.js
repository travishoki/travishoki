function ContactCtrl($scope, $http){
	
	$scope.init = function(){
		$scope.alerts = [];
		$scope.sending = false;
	};//init

	$scope.sendContactForm = function(){
		$scope.sending = true;

		var url = 'portfolio/api/api.php';
		url += '?cmd=sendContactForm';
		url += '&name=' + $scope.contactName;
		url += '&email=' + $scope.contactEmail;
		url += '&comment=' + $scope.contactComment;
		$http.get(url).then(function(results) {
			$scope.sending = false;
			if(results.data == 'success'){
				$scope.contactName = '';
				$scope.contactEmail = '';
				$scope.contactComment = '';
				$scope.formSuccess();
			}else{
				$scope.formFailure();
			}
		}, function(results){
			$scope.formFailure();
		});
	};//sendContactForm

	/*------------------------------ ALERTS ------------------------------*/
	
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.formSuccess = function(){
		var alert = {type: 'success', msg: 'Message sent successfully'};
		$scope.alerts.push(alert);
	};//formSuccess

	$scope.formFailure = function(){
		var alert = {type: 'danger', msg: 'Message failed. Please contact Travis via email at travis.hoki@gmail.com'};
		$scope.alerts.push(alert);
	};//formFailure

	/*------------------------------ INIT ------------------------------*/
	$scope.init();
	
}//ContactCtrl