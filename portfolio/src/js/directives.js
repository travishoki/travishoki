app.directive('siteInfo', function(){
	return {
		scope: {site: "="},
		templateUrl: 'portfolio/views/portfolio-site-info.html'
	};
})
.directive('siteItem', function(){
	return {
		scope: {site: "="},
		templateUrl: 'portfolio/views/portfolio-site-item.html'
	};
});