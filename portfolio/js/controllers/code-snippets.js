function CodeSnippetsCtrl($scope, $http, $routeParams){
	
	$scope.init = function(){

 		$scope.collections = [
			{
				id: 'ABaMOo',
				title: 'Angular JS'
			},
			{
				id: 'AOyEwK',
				title: 'Handlebars JS'
			},
			{
				id: 'nwkWZa',
				title: 'Backbone JS'
			},
			{
				id: 'nbGrxG',
				title: 'React JS'
			},
			{
				id: 'AQbZVw',
				title: 'Object Oriented Programming'
			}
		];	

		if($routeParams.collection){
			$scope.showingOptions = false;
			$scope.currentCollection = true;
			angular.forEach($scope.collections, function(collection){
				if(collection.id === $routeParams.collection){
					$scope.getFeed(collection);
				}
			});
		}else{
			$scope.showingOptions = true;
			$scope.currentCollection = false;
		}

	};//init

	/*------------------------------ Show Options ------------------------------*/
	$scope.showOptions = function(){
		$scope.showingOptions = !$scope.showingOptions;
	};//showOptions

	/*------------------------------ Get Feed ------------------------------*/
	$scope.getFeed = function(collection){
		$scope.pageTitle = collection.title;
		$scope.currentCollection = true;
		$scope.showingOptions = false;

		var url = 'http://codepen.io/collection/'+collection.id+'/feed'; 
		$http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url))
		.then(function(response){

			var feed = response.data.responseData.feed;
			console.dir('feed');
			console.dir(feed);

			$scope.codepens = [];


			console.log('feed.entries');
			console.dir(feed.entries);
			$scope.feed_entries = feed.entries;

			angular.forEach(feed.entries, function(entry){
				console.log('entry');
				console.dir(entry);

				console.log('id: ' + entry.link.split('pen/')[1]);
				$scope.codepens.push({
					'id': entry.link.split('pen/')[1],
					'title': entry.title,
					'link': entry.link
				});
			});

			console.log('codepens');
			console.dir($scope.codepens);
		});
	};

	/*------------------------------ Pen Holder Class ------------------------------*/
	$scope.penHolderClass = function(){
		switch($scope.codepens.length){
			case 1:
				break;
			case 2:
				return 'col-md-6';
				break;
			default:
				return 'col-md-6 col-lg-4';
		}//switch
	};//penHolderClass

	/*------------------------------ INIT ------------------------------*/
	$scope.init();
	
}//CodeSnippetsCtrl







