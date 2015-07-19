var app = angular.module('APP',[]).
controller('PropListCtrl',['$scope','$location','$compile','$http',function($scope,$location,$compile,$http){


	// Getting the current page from the url
	var urlStr = $location.path();
	var lastSlash = urlStr.lastIndexOf("/");
	$scope.currentPage = urlStr.substring(lastSlash+1);
	
	$scope.setRoute = function(route){
		$location.path(route);
		$scope.currentPage = route;
	};//setRoute

	$scope.backToTop = function(route){
		$('body,html').animate({
			scrollTop: 0
		}, 800);
	}	
}]).
config(function($routeProvider){

	$routeProvider.
		when('/resume', {
			template: 'portfolio/views/resume.php'
		}).
		when('/about', {
			template: 'portfolio/views/about.php'
		}).
		when('/contact', {
			template: 'portfolio/views/contact.php'
		}).
		when('/flash', {
			template: 'portfolio/views/flash.php',
			controller: FlashCtrl
		}).
		when('/apps', {
			template: 'portfolio/views/apps.php',
			controller: FlashCtrl
		}).
		otherwise({
			redirectTo:'/portfolio',
			template:'portfolio/views/portfolio.php',
			controller: HomeCtrl
		});
})

function HomeCtrl($scope,$http){

	$scope.sites = [
		{
			title : 'Room Choice',
			url : 'http://roomchoice.com/',
			desc : 'This is a steady downhill race perfect for first time runners, as well as those looking to improve their time. Fun to be had includes saints and sinners aid stations and heaven and heck finish lines.',
			img: 'roomchoice.png',
			contribution : 'Creationg of registration form, authorize.net intergration, customization of wordpress theme.',
			lang : 'AngularJs, Python, JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'Eric Aroca',
			url : 'http://ericaroca.com/',
			desc : 'This is a steady downhill race perfect for first time runners, as well as those looking to improve their time. Fun to be had includes saints and sinners aid stations and heaven and heck finish lines.',
			img: 'ericaroca.png',
			contribution : 'Creationg of registration form, authorize.net intergration, customization of wordpress theme.',
			lang : 'Wordpress, JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'Rooke Capital Management',
			url : 'http://rookecapital.com/',
			desc : 'This is a steady downhill race perfect for first time runners, as well as those looking to improve their time. Fun to be had includes saints and sinners aid stations and heaven and heck finish lines.',
			img: 'rooke-capital-management.png',
			contribution : 'Creationg of registration form, authorize.net intergration, customization of wordpress theme.',
			lang : 'Wordpress, PHP, JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'Saints and Sinners Half Marathon and Team Relay',
			url : 'http://saintsandsinnershalf.com/',
			desc : 'This is a steady downhill race perfect for first time runners, as well as those looking to improve their time. Fun to be had includes saints and sinners aid stations and heaven and heck finish lines.',
			img: 'saints-and-sinners.png',
			contribution : 'Creationg of registration form, authorize.net intergration, customization of wordpress theme.',
			lang : 'AngularJs, PHP, JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'New Life Recovery',
			url : 'http://www.newlife-recovery.org/',
			desc : 'Creative Media Group is a full service media production house based in Orem, Utah. We specialize in high quality digital video production, post-production, and motion graphics.',
			img: 'newLife-recovery.png',
			contribution : 'Customization of wordpress theme.',
			lang : 'AngularJs, PHP, JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'Creative Media Education',
			url : 'http://cmeducation.org/',
			desc : 'Creative Media Group is a full service media production house based in Orem, Utah. We specialize in high quality digital video production, post-production, and motion graphics.',
			img: 'cmeducation.png',
			contribution : 'Front-end and Back-end, integrating courses the custom LMS.',
			lang : 'AngularJs, PHP, JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'LavaVolt',
			url : 'http://lavavolt.com',
			desc : 'LavaVolt is an online film festival and digital distribution solution for independent filmmakers.',
			img: 'lavavolt.png',
			contribution : 'All of the back-end, everything from user accounts, to film uploading, to querying from the film library.',
			lang : 'PHP, JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'Enspark LMS',
			url : 'http://lms.enspark.com',
			desc : 'From Leadership Skills to Time Management, our interactive e-Learning courses make people better.',
			img : 'enspark-lms.png',
			contribution : 'Finished the second version of the LMS. Restructured the user account and course tracking database. Made information requests dynamic with page jQuery AJAX.',
			lang : 'PHP, JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'Paradigm Life LMS (Infinite Banking)',
			url : 'http://lms.paradigmlife.net/',
			desc : 'Infinite Banking is a concept that allows individuals to utilize Permanent Life Insurance in ways that most individuals and even insurance professionals could never have imagined.',
			img : 'paradigm-life-lms.png',
			contribution : 'The Paradigm Life LMS was created from the base of the Enspark LMS then customized to fit the needs of Paradigm Life. I added the functionality for multiple user tracks.',
			lang : 'PHP, JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'International Fulfillment',
			url : 'http://enspark.net/internationalfulfillment/',
			siteDesc : 'We provide discounted integrated solutions to ship your products or your customers products for less money.',
			img : 'internationalfulfillment.png',
			contribution : 'All back-end. Worked with the Flash developer sending information to and from the mobile app. Creating a delivery route system, "text message like" system, and automated tasks.',
			lang : 'PHP, JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'The Putting Tour',
			url : 'http://theputtingtour.com',
			desc : 'The Putting Tour at Qualifiers Golf will train your nervous system by challenging you with dozens of such putts in a 30 minute round. It really works!',
			img : 'the-putting-tour.png',
			contribution : 'Created the user account system, sending information to and from the mobile app. Helped to develop the mobile app for the golf kiosk, as well as the bracket system for the online competitions.',
			lang : 'PHP, JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'WinInsights',
			url : 'http://wininsights.com',
			desc : 'WIN Insights is a Diversity and Inclusion - focused learning management system that delivers training, networking, tools, resources, and analytics.',
			img : 'wininsights.png',
			contribution : 'Hand created a custom blog for communities to converse about their executive and cultural groups. Also created a custom slider, and several WordPress pages.',
			lang : 'PHP, JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'Barrier Pest Control',
			url : 'http://barrierpc.com',
			siteDesc : 'Barrier Pest Control will proactively conquer your existing pest populations and prevent future invasions.',
			img : 'barrier.png',
			contribution : "Created a cronjob to store customer transactions in a MYSQL database then email a list of those transactions in a daily report to the company owners. Front-end fixes to the WordPress site, fixing styles and updating images. ",
			lang : 'JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'Enspark',
			url : 'http://enspark.com',
			siteDesc : 'From Leadership Skills to Time Management, our interactive e-Learning courses make people better.',
			img : 'enspark.png',
			contribution : 'Helping to push the second version of Enspark.com live. Implementing a feed, creating forms, and various front-end fixes.',
			lang : 'JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'Utah Casa',
			url : 'http://utahcasa.org/',
			siteDesc : 'Casa is a volunteer organization that empowers everyday citizens with the ability to transform the lives of abused and neglected children.',
			img : 'utah-casa.png',
			contribution : 'Helped to fix the blog functionality and structure in WordPress as well as front-end fixes.',
			lang : 'PHP, HTML, CSS',
		},
		{
			title : 'All American Sod Farms',
			url : 'http://allamericansod.com/',
			siteDesc : 'All American Sod Farms is a family owned and operated business.',
			img : 'allAmSod.png',
			contribution : 'Before I started working full time as a web developer I was the office manager on the farm. I created and am maintaining this site. It is still a work in progress. I designed and created this custom WordPress theme.',
			lang : 'PHP, JavaScript, jQuery, HTML, CSS',
		},
		{
			title : 'Paradigm Life (Infinite Banking)',
			url : 'http://paradigmlife.net/',
			siteDesc : 'Infinite Banking is a concept that allows individuals to utilize Permanent Life Insurance in ways that most individuals and even insurance professionals could never have imagined.',
			img : 'paradigm-life.png',
			contribution : 'Helped with the WordPress theme and structure architecture.',
			lang : 'PHP, JavaScript, jQuery, HTML, CSS'
		},
		{
			title : 'Debt Free Planning',
			url : 'http://debtfreeplanning.com',
			siteDesc : 'Get a Free Online Report and recommended solution to your debt problem.',
			img : 'debtFreePlanning.png',
			contribution : 'Front-end construction. Creating a email form for user information requests.',
			lang : 'PHP, Less CSS, HTML, JavaScript'
		},
		{
			title : 'Southam Consulting',
			url : 'http://southamconsulting.net',
			siteDesc : 'Southam Consulting is a consortium of business specialists in several states who have extensive experience and expertise in helping clients achieve peak performance.',
			img : 'southamConsulting.png',
			contribution : 'Creating a email form for user information requests. Other front-end fixes.',
			lang : 'PHP, CSS, HTML, JavaScript'
		}
	];
}//HomeCtrl

function FlashCtrl($scope){
	$scope.openFlashBanner = function(fileName,flashWidth,flashHeight){
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			$('.flashHolder').html('<span class="red">To view these flash banners please use a desktop or laptop computer.</span>');
		}else{
			var flashObject = '<object type="application/x-shockwave-flash" data="portfolio/swfs/' + fileName + '.swf" width="' + flashWidth + '" height="' + flashHeight + '"><param name="movie" value="portfolio/swfs/' + fileName + '.swf" /><param name="quality" value="high"/></object>';
			$('.flashHolder').html(flashObject);
		}

	}//openFlashBanner
}//FlashCtrl
