app.config(function($routeProvider){
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
		otherwise({
			redirectTo:'/home',
			templateUrl: 'portfolio/views/home.html',
			controller: HomeCtrl
		});
});