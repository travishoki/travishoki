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
}).
config(function($routeProvider){

	$routeProvider.
		when('/resume', {
			templateUrl: 'portfolio/views/resume.php'
		}).
		when('/about', {
			templateUrl: 'portfolio/views/about.php'
		}).
		when('/contact', {
			templateUrl: 'portfolio/views/contact.php',
			controller: contactCtrl
		}).
		when('/flash', {
			templateUrl: 'portfolio/views/flash.php',
			controller: FlashCtrl
		}).
		when('/apps', {
			templateUrl: 'portfolio/views/apps.php',
			controller: FlashCtrl
		}).
		otherwise({
			redirectTo:'/portfolio',
			templateUrl: 'portfolio/views/portfolio.php',
			controller: portfolioCtrl
		});
})
.directive('siteInfo', function(){
	return {
		scope: {site: "="},
		templateUrl: 'portfolio/views/portfolio-site-info.html'
	}
})
.directive('siteItem', function(){
	return {
		scope: {site: "="},
		templateUrl: 'portfolio/views/portfolio-site-item.html'
	}
})

.filter('techFilter', function() {
	// return function (items, site_filters) {
	// 	angular.forEach(site_filters, function(filter){
	// 		angular.forEach(items, function(item){
	// 			if(filter.active){
	// 				if(items.title == filter.title){

	// 				}
	// 			}			
	// 		});
	// 	});
	// 	return item;
	// };
	return function(items, site_filters){
		var filter_array = [];
		angular.forEach(site_filters, function(filter){
			if(filter.active){
				filter_array.push(filter.title);
			}
		});

		var new_items = [];
		var valid_count = 0;
		angular.forEach(items, function(item){
			valid_count = 0;
			angular.forEach(filter_array, function(filter){
				angular.forEach(item.techs, function(tech){
					if(filter == tech){
						valid_count++;
					}
				});
			});
			if(valid_count === filter_array.length){
				new_items.push(item);						
			}
		});
		return new_items;
	}
});

function portfolioCtrl($scope, $http, $modal, $compile){

	$scope.init = function(){
		$scope.sites = $scope.getSites();
		$scope.site_filters = $scope.getFilters();
	};//init

	$scope.openModal = function ($event, $index, site) {		
		// console.log('---- openModal ----');
			// $scope.sites = $scope.getSites();

		//Get the count of the previously injected items before this index
		var actives_before = 0;
		for(var i = 0 ; i < $index ; i++){
			if(i < $index && $scope.sites[i].full){
				actives_before++;
			}
		}//for

		var alreadyClicked = site.active;
		//Remove the injected items
		//Loop backwards because of the array splicing
		if(!alreadyClicked){
			var i = $scope.sites.length;
			while (i--) {
			    if ($scope.sites[i].full) {
			        $scope.sites.splice(i, 1);
			    }
			}//while
		}

		//Unactivate them all
		angular.forEach($scope.sites, function(s){
			s.active = false;
		});

		//Compensate for the previously injected items in the array
		$index -= actives_before;

		//Create new site
		var new_site = angular.copy(site);
		new_site.full = true;


		var current_index = $index;

		var diff = 0;
		var new_index;
		var breakpoint = getBreakpoint();
		switch(breakpoint){
			case 'xs':
				diff = current_index % 2;
				diff = 2 - diff;
				break;
			case 'sm':
			case 'md':
			case 'lg':
				diff = current_index % 3;
				diff = 3 - diff;
				break;
			default:

		}//switch
		new_index = diff + $index;

		if(new_index > $scope.sites.length-1){
			if(alreadyClicked){
				new_index = $scope.sites.length-1;
			}else{
				new_index = $scope.sites.length;
			}
		}

		if(alreadyClicked){
			//remove object
			// console.log('remove object');
			$scope.sites.splice(new_index, 1);
		}else{
			//Update object
			site.active = true;
			// console.log('sites length: ' + ($scope.sites.length-1));
			if(new_index > $scope.sites.length-1){
				// console.log("has to add to end");
				$scope.sites.push(new_site);
				// $scope.sites.splice(new_index, 0, new_site);
			}else{
				// console.log('add to array');
				if($scope.sites[new_index].full){
					// console.log('update item');
					$scope.sites[new_index] = new_site;
				}else{
					// console.log('create item');
					$scope.sites.splice(new_index, 0, new_site);
				}
			}
		}

		function getBreakpoint() {
			var windowWidth = window.innerWidth;

			if(windowWidth < 768) {
				return 'xs';
			} else if (windowWidth >= 768 && windowWidth < 992) {
				return 'sm';
			} else if (windowWidth >= 992 && windowWidth < 1200) {
				return 'md';
			} else if (windowWidth >= 1200) {
				return 'lg';
			}					
		}//getBreakpoint

	};

	$scope.filterStyle = function(tech){
		// return tech.title+'.' {'inactive':tech.active}
		var str = tech.title;
		if(!tech.active){
			str += ' inactive';
		}
		return str;
	};//filterStyle

	$scope.clickFilter = function(tech){
		tech.active = !tech.active;

		//Unactivate opposite tech filters
		switch(tech.title){
			case 'PHP':
			case 'WordPress':
				$scope.switchFilter('Python', false);
				break;
			case 'Python':
				$scope.switchFilter('PHP', false);
				$scope.switchFilter('WordPress', false);
				break;
			case 'jQuery':
				$scope.switchFilter('AngularJs', false);
				break;
			case 'AngularJs':
				$scope.switchFilter('jQuery', false);
				break;
		}//switch
	};//clickFilter

	$scope.switchFilter = function(title, bool){
		for(var i = 0 ; i < $scope.site_filters.length ; i++){
			if($scope.site_filters[i].title == title){
				$scope.site_filters[i].active = bool;
				break;
			}
		}//for
	}//switchFilter

	$scope.getFilters = function(){
		var array = [
				{
					title: 'jQuery'
				},
				{
					title: 'AngularJs'
				},
				{
					title: 'WordPress'
				},
				{
					title: 'Python'
				},
				{
					title: 'PHP'
				},
				{
					title: 'LESS-CSS'
				}
				];
		angular.forEach(array, function(item){
			item.active = false;
		});
		return array;
	};//getFilters

	$scope.getSites = function(){
		var array = [
			{
				title : 'Room Choice',
				url : 'http://roomchoice.com/',
				desc : 'This is a steady downhill race perfect for first time runners, as well as those looking to improve their time. Fun to be had includes saints and sinners aid stations and heaven and heck finish lines.',
				img: 'roomchoice.png',
				contribution : 'Creationg of registration form, authorize.net intergration, customization of WordPress theme.',
				techs: 'Python|AngularJs|JavaScript|HTML|LESS-CSS',
			},
			{
				title : 'Eric Aroca',
				url : 'http://ericaroca.com/',
				desc : 'This is a steady downhill race perfect for first time runners, as well as those looking to improve their time. Fun to be had includes saints and sinners aid stations and heaven and heck finish lines.',
				img: 'ericaroca.png',
				contribution : 'Creationg of registration form, authorize.net intergration, customization of WordPress theme.',
				techs: 'PHP|WordPress|JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'Rooke Capital Management',
				url : 'http://rookecapital.com/',
				desc : 'This is a steady downhill race perfect for first time runners, as well as those looking to improve their time. Fun to be had includes saints and sinners aid stations and heaven and heck finish lines.',
				img: 'rooke-capital-management.png',
				contribution : 'Creationg of registration form, authorize.net intergration, customization of WordPress theme.',
				techs: 'PHP|WordPress|JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'Saints and Sinners Half Marathon and Team Relay',
				url : 'http://saintsandsinnershalf.com/',
				desc : 'This is a steady downhill race perfect for first time runners, as well as those looking to improve their time. Fun to be had includes saints and sinners aid stations and heaven and heck finish lines.',
				img: 'saints-and-sinners.png',
				contribution : 'Creationg of registration form, authorize.net intergration, customization of WordPress theme.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'New Life Recovery',
				url : 'http://www.newlife-recovery.org/',
				desc : 'Creative Media Group is a full service media production house based in Orem, Utah. We specialize in high quality digital video production, post-production, and motion graphics.',
				img: 'newLife-recovery.png',
				contribution : 'Customization of WordPress theme.',
				techs: 'PHP|WordPress|JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'Creative Media Education',
				url : 'http://cmeducation.org/',
				desc : 'Creative Media Group is a full service media production house based in Orem, Utah. We specialize in high quality digital video production, post-production, and motion graphics.',
				img: 'cmeducation.png',
				contribution : 'Front-end and Back-end, integrating courses the custom LMS.',
				techs: 'AngularJs|PHP|JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'LavaVolt',
				url : 'http://lavavolt.com',
				desc : 'LavaVolt is an online film festival and digital distribution solution for independent filmmakers.',
				img: 'lavavolt.png',
				contribution : 'All of the back-end, everything from user accounts, to film uploading, to querying from the film library.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'Enspark LMS',
				url : 'http://lms.enspark.com',
				desc : 'From Leadership Skills to Time Management, our interactive e-Learning courses make people better.',
				img : 'enspark-lms.png',
				contribution : 'Finished the second version of the LMS. Restructured the user account and course tracking database. Made information requests dynamic with page jQuery AJAX.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'Paradigm Life LMS (Infinite Banking)',
				url : 'http://lms.paradigmlife.net/',
				desc : 'Infinite Banking is a concept that allows individuals to utilize Permanent Life Insurance in ways that most individuals and even insurance professionals could never have imagined.',
				img : 'paradigm-life-lms.png',
				contribution : 'The Paradigm Life LMS was created from the base of the Enspark LMS then customized to fit the needs of Paradigm Life. I added the functionality for multiple user tracks.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'International Fulfillment',
				url : 'http://enspark.net/internationalfulfillment/',
				siteDesc : 'We provide discounted integrated solutions to ship your products or your customers products for less money.',
				img : 'international-fulfillment.png',
				contribution : 'All back-end. Worked with the Flash developer sending information to and from the mobile app. Creating a delivery route system, "text message like" system, and automated tasks.',
				techs: 'PHP|AngularJs|JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'The Putting Tour',
				url : 'http://theputtingtour.com',
				desc : 'The Putting Tour at Qualifiers Golf will train your nervous system by challenging you with dozens of such putts in a 30 minute round. It really works!',
				img : 'the-putting-tour.png',
				contribution : 'Created the user account system, sending information to and from the mobile app. Helped to develop the mobile app for the golf kiosk, as well as the bracket system for the online competitions.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'WinInsights',
				url : 'http://wininsights.com',
				desc : 'WIN Insights is a Diversity and Inclusion - focused learning management system that delivers training, networking, tools, resources, and analytics.',
				img : 'wininsights.png',
				contribution : 'Hand created a custom blog for communities to converse about their executive and cultural groups. Also created a custom slider, and several WordPress pages.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'Barrier Pest Control',
				url : 'http://barrierpc.com',
				desc : 'Barrier Pest Control will proactively conquer your existing pest populations and prevent future invasions.',
				img : 'barrier.png',
				contribution : "Created a cronjob to store customer transactions in a MYSQL database then email a list of those transactions in a daily report to the company owners. Front-end fixes to the WordPress site, fixing styles and updating images. ",
				techs: 'JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'Enspark',
				url : 'http://enspark.com',
				desc : 'From Leadership Skills to Time Management, our interactive e-Learning courses make people better.',
				img : 'enspark.png',
				contribution : 'Helping to push the second version of Enspark.com live. Implementing a feed, creating forms, and various front-end fixes.',
				techs: 'JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'Utah Casa',
				url : 'http://utahcasa.org/',
				desc : 'Casa is a volunteer organization that empowers everyday citizens with the ability to transform the lives of abused and neglected children.',
				img : 'utah-casa.png',
				contribution : 'Helped to fix the blog functionality and structure in WordPress as well as front-end fixes.',
				techs: 'PHP|HTML|CSS',
			},
			{
				title : 'All American Sod Farms',
				url : 'http://allamericansod.com/',
				desc : 'All American Sod Farms is a family owned and operated business.',
				img : 'all-american-sod.png',
				contribution : 'Before I started working full time as a web developer I was the office manager on the farm. I created and am maintaining this site. It is still a work in progress. I designed and created this custom WordPress theme.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
			},
			{
				title : 'Paradigm Life (Infinite Banking)',
				url : 'http://paradigmlife.net/',
				desc : 'Infinite Banking is a concept that allows individuals to utilize Permanent Life Insurance in ways that most individuals and even insurance professionals could never have imagined.',
				img : 'paradigm-life.png',
				contribution : 'Helped with the WordPress theme and structure architecture.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS'
			},
			{
				title : 'Debt Free Planning',
				url : 'http://debt-free-planning.com',
				desc : 'Get a Free Online Report and recommended solution to your debt problem.',
				img : 'debt-free-planning.png',
				contribution : 'Front-end construction. Creating a email form for user information requests.',
				techs: 'PHP,Less-CSS|HTML|JavaScript'
			},
			{
				title : 'Southam Consulting',
				url : 'http://southamconsulting.net',
				desc : 'Southam Consulting is a consortium of business specialists in several states who have extensive experience and expertise in helping clients achieve peak performance.',
				img : 'southam-consulting.png',
				contribution : 'Creating a email form for user information requests. Other front-end fixes.',
				techs: 'PHP|CSS|HTML|JavaScript'
			}
		];
		angular.forEach(array, function(site){
			site.techs = site.techs.split('|');
		});
		return array;
	};//getSites

	$scope.init();

}//portfolioCtrl


function siteModalCtrl($scope, $modalInstance, params) {
	$scope.init = function(){
		if(params.site){
			$scope.site = params.site;
		}
	};//init
	
	$scope.closeModal = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.init();

};//siteModalCtrl

function FlashCtrl($scope){
	$scope.openFlashBanner = function(fileName,flashWidth,flashHeight){
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			$('.flashHolder').html('<span class="red">To view these flash banners please use a desktop or laptop computer.</span>');
		}else{
			var flashObject = '<object type="application/x-shockwave-flash" data="portfolio/swfs/' + fileName + '.swf" width="' + flashWidth + '" height="' + flashHeight + '"><param name="movie" value="portfolio/swfs/' + fileName + '.swf" /><param name="quality" value="high"/></object>';
			$('.flashHolder').html(flashObject);
		}
	}//openFlashBanner

	$scope.ensparCourses = [
		{
			title: 'Conflict Resolution',
			link: 'conflict-resolution'
		},
		{
			title: 'Everyone is a Leader',
			link: 'everyone-a-leader'
		},
		{
			title: 'Hiring Practices',
			link: 'hiring-practices'
		},
		{
			title: 'Managing Up',
			link: 'managing-up'
		},
		{
			title: 'Powerful Presentation',
			link: 'powerful-presentations'
		},
		{
			title: 'Sexual Harassment - Employee',
			link: 'sexual-harassment-employee'
		},

		{
			title: 'Sexual Harassment - Manager',
			link: 'sexual-harassment-manager'
		},
		{
			title: 'Work Life Balance',
			link: 'work-life-balance'
		},
		{
			title: 'Time Management',
			link: 'time-management'
		},
		{
			title: 'Making Decision',
			link: 'making-decisions'
		},
		{
			title: 'Meetings That Get Results',
			link: 'meetings-that-get-results'
		},
		{
			title: 'Interviewing Skills 101',
			link: 'interviewing-skills-101'
		},
		{
			title: 'Interviewing Skills 201',
			link: 'interviewing-skills-201'
		},
		{
			title: 'Managing Stress to Get Results',
			link: 'managing-stress'
		},
		{
			title: 'The Art of Negotiation',
			link: 'art-of-negotiation'
		},
		{
			title: 'Giving Feedback That Gets Results',
			link: 'giving-feedback'
		},
		{
			title: 'It\'s My Job: Taking Charge of Your Career',
			link: 'its-my-job'
		},
		{
			title: 'Business Ethics & Code of Conduct',
			link: 'business-ethics'
		},
		{
			title: 'Developing Leadership Style',
			link: 'developing-leadership-style'
		},
		{
			title: 'Guide to Networking',
			link: 'guide-to-networking'
		},
		{
			title: 'Building Leadership Capability',
			link: 'building-leadership'
		},
		{
			title: 'Company Layoffs & Downsizing',
			link: 'company-layoffs'
		},
		{
			title: 'Critical Thinking & Problem Solving',
			link: 'critical-thinking'
		},
		{
			title: 'Business Email Etiquette',
			link: 'email-etiquette'
		}
	];
}//FlashCtrl


function contactCtrl($scope, $http){
	
	$scope.init = function(){
		$scope.sendingContactForm = false;
	};//init

	$scope.sendContactForm = function(){
		$scope.alerts = Array();
		$scope.sendingContactForm = true;

		var url = 'portfolio/api/api.php';
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
	
}//contactCtrl