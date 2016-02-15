app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.
		when('/portfolio', {
			templateUrl: 'portfolio/views/portfolio.html',
			controller: PortfolioCtrl
		}).
		when('/resume', {
			templateUrl: 'portfolio/views/resume.html'
		}).
		when('/about', {
			templateUrl: 'portfolio/views/about.html'
		}).
		when('/contact', {
			templateUrl: 'portfolio/views/contact.html',
			controller: ContactCtrl
		}).
		when('/flash', {
			templateUrl: 'portfolio/views/flash.html',
			controller: FlashCtrl
		}).
		when('/apps', {
			templateUrl: 'portfolio/views/apps.html',
			controller: FlashCtrl
		}).
		when('/code-snippets/:collection?', {
			templateUrl: 'portfolio/views/code-snippets.html',
			controller: CodeSnippetsCtrl
		}).
		otherwise({
			redirectTo:'/home',
			templateUrl: 'portfolio/views/home.html',
			controller: HomeCtrl
		});

    $locationProvider.html5Mode(true);

}]);