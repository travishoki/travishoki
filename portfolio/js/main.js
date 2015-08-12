var app = angular.module('APP',['ngRoute','ngAnimate','ui.bootstrap']);

app.controller('mainCtrl', function($scope, $http, $location){

	// Getting the current page from the url
	var urlStr = $location.path();
	var lastSlash = urlStr.lastIndexOf("/");
	$scope.currentPage = urlStr.substring(lastSlash+1);
	
	$scope.setRoute = function(route){
		$location.path(route);
		$scope.currentPage = route;
		$scope.showMobileMenu = false;
	};//setRoute

	$scope.backToTop = function(route){
		$('body|html').animate({
			scrollTop: 0
		}, 800);
	}	
});