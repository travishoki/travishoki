var app = angular.module('APP',['ngRoute','ngAnimate','ui.bootstrap', 'ngSanitize']);

app.controller('mainCtrl', function($scope, $http, $location, anchorSmoothScroll){

	// Getting the current page from the url
	var urlStr = $location.path();
	var lastSlash = urlStr.lastIndexOf("/");
	$scope.currentPage = urlStr.substring(lastSlash+1);
	
	$scope.setRoute = function(route){
		$location.path(route);
		$scope.currentPage = route;
		$scope.showMobileMenu = false;
	};//setRoute

	$scope.scrollTo = function(str){
		anchorSmoothScroll.scrollTo(str);
	};//backToTop
})
.directive("scrollNav", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 50) {
                 element.addClass('scrolled');
             } else {
                 element.removeClass('scrolled');
             }
        });
    };
})
.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var header_height = 60;
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (var k = startY; k > stopY; k -= step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop-header_height;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    
});
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.
		when('/websites', {
			templateUrl: 'portfolio/views/websites.html',
			controller: WebsitesCtrl
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
app.filter('techFilter', function() {
	return function(items, current_filter){
		if(current_filter ===  null){
			return items;
		}else{
			var new_items = [];
			angular.forEach(items, function(item){
				angular.forEach(item.techs, function(tech){
					if(tech === current_filter.title){
						new_items.push(item);						
					}
				});
			});
			return new_items;
		}
	};
});
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
			title: 'Powerful Presentation',
			link: 'powerful-presentations'
		},
		{
			title: 'Work Life Balance',
			link: 'work-life-balance'
		},
		{
			title: 'Business Email Etiquette',
			link: 'email-etiquette'
		},
		{
			title: 'Developing Leadership Style',
			link: 'developing-leadership-style'
		},
		{
			title: 'It\'s My Job: Taking Charge of Your Career',
			link: 'its-my-job'
		}
	];
/*
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
			title: 'Sexual Harassment - Employee',
			link: 'sexual-harassment-employee'
		},

		{
			title: 'Sexual Harassment - Manager',
			link: 'sexual-harassment-manager'
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
			title: 'Business Ethics & Code of Conduct',
			link: 'business-ethics'
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
	];
*/
}//FlashCtrl

function HomeCtrl($scope, $http){
	
	$scope.init = function(){
		$scope.iconArray = $scope.getIcons();
	};//init

	/*------------------------------ Get Icons ------------------------------*/
	$scope.getIcons = function(){
		return ['JavaScript','HTML','CSS','jQuery','AngularJs','WordPress','Python','PHP','LESS-CSS','Coffee-Script'];
	};
	
	/*------------------------------ INIT ------------------------------*/
	$scope.init();
	
}//HomeCtrl

function WebsitesCtrl($scope, $http, $modal, $compile, $window, $filter){

	$scope.init = function(){
		$scope.sites = $scope.getSites();
		$scope.current_filter = null;
		$scope.site_filters = $scope.getFilters();

		var w = angular.element($window);
		w.bind('resize', function () {
		    $scope.resetSites();
		    $scope.$apply();
		});
	};//init

	$scope.resetSites = function(){
		// Unactivate all items and remove the ones that are the full descriptions
		var i = $scope.sites.length;
		while (i--){
			$scope.sites[i].active = false;
		    if ($scope.sites[i].full){
		        $scope.sites.splice(i, 1);
		    }
		}//while
	};//resetSites

	$scope.openModal = function ($event, $index, site) {		
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
			var k = $scope.sites.length;
			while (k--) {
			    if ($scope.sites[k].full) {
			        $scope.sites.splice(k, 1);
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
				diff = current_index % 3;
				diff = 3 - diff;
				break;
			case 'md':
			case 'lg':
				diff = current_index % 4;
				diff = 4 - diff;
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
		var str = '';
		if($scope.current_filter !== null){
			if(!tech.active){
				str = 'inactive';
			}
		}
		return str;
	};//filterStyle

	$scope.clickFilter = function(tech){
		// $scope.resetSites();
		if($scope.current_filter === tech){
			$scope.current_filter.active = false;
			$scope.current_filter = null;
		}else{
			$scope.current_filter = tech;
			angular.forEach($scope.site_filters, function(t){
				if(t === tech){
					t.active = true;
				}else{
					t.active = false;
				}
			});
		}
		$scope.sites = $filter('techFilter')($scope.getSites(), $scope.current_filter);
	};//clickFilter

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
				title : 'Overstock.com',
				subtitle : 'Reviews breakout',
				url : 'http://overstock.com/',
				desc : 'Allowing a user to leave rating only reviews.',
				img: 'overstock',
				contributions : 'Coordinate deployments with multiple departments.',
				techs: 'HTML|LESS-CSS|JavaScript|jQuery',
				live: true
			},
			{
				title : 'Truly Lindsey Photography',
				subtitle : '',
				url : 'http://trulylindseyphotography.com/',
				desc : 'Truly Lindsey Photography is my wife\'s photography company. I am helping to brand her company.',
				img: 'truly-lindsey-photography',
				contributions : 'Wordpress customization, design and branding.',
				techs: 'WordPress|HTML|CSS',
				live: true
			},
			{
				title : 'Room Choice',
				subtitle : '',
				url : 'http://roomchoice.com/',
				desc : 'Room Choice is a student housing property management software that allows you to see room assignments and reservation requests.',
				img: 'roomchoice',
				contributions : 'Full Stack Development|Django and python|Restful API calls.',
				techs: 'Python|AngularJs|JavaScript|HTML|LESS-CSS',
				live: true
			},
			{
				title : 'Rooke Capital Management',
				subtitle : '',
				url : 'http://rookecapital.com/',
				desc : 'This is a steady downhill race perfect for first time runners, as well as those looking to improve their time. Fun to be had includes saints and sinners aid stations and heaven and heck finish lines.',
				img: 'rooke-capital-management',
				contributions : 'Creationg of registration form|authorize.net intergration|customization of WordPress theme.',
				techs: 'PHP|WordPress|JavaScript|jQuery|HTML|CSS',
				live: true
			},
			{
				title : 'RGDJanitorial',
				subtitle : '',
				url : 'http://rgdjanitorial.com/',
				desc : 'RGD Janitorial has been providing Janitorial Services in Utah for over 17 years.',
				img: 'rgdjanitorial',
				contributions : 'Wordpress theme customization|WP Advanced Custom Fields|Design',
				techs: 'PHP|WordPress|JavaScript|HTML|CSS',
				live: true
			},
			{
				title : 'Wedding Website',
				subtitle : '',
				url : 'http://wedding.hokihappenings.com/',
				desc : 'This is the wedding website that I made for my wedding.',
				img: 'wedding',
				contributions : 'Site design and development',
				techs: 'AngularJs|JavaScript|HTML|SCSS',
				live: true
			},
			{
				title : 'Eric Aroca',
				subtitle : '',
				url : 'http://ericaroca.com/',
				desc : 'This is a steady downhill race perfect for first time runners, as well as those looking to improve their time. Fun to be had includes saints and sinners aid stations and heaven and heck finish lines.',
				img: 'eric-aroca',
				contributions : 'Creationg of registration form|customization of WordPress theme.',
				techs: 'PHP|WordPress|JavaScript|jQuery|HTML|CSS',
				live: true
			},
			{
				title : 'Saints and Sinners Half Marathon and Team Relay',
				subtitle : '',
				url : 'http://saintsandsinnershalf.com/',
				desc : 'This is a steady downhill race perfect for first time runners, as well as those looking to improve their time. Fun to be had includes saints and sinners aid stations and heaven and heck finish lines.',
				img: 'saints-and-sinners',
				contributions : 'Creationg of registration form, authorize.net intergration|customization of WordPress theme.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
				live: true
			},
			{
				title : 'New Life Recovery',
				subtitle : '',
				url : 'http://www.newlife-recovery.org/',
				desc : 'Creative Media Group is a full service media production house based in Orem|Utah. We specialize in high quality digital video production, post-production, and motion graphics.',
				img: 'new-life-recovery',
				contributions : 'Customization of WordPress theme.',
				techs: 'PHP|WordPress|JavaScript|jQuery|HTML|CSS',
				live: false
			},
			{
				title : 'Creative Media Education',
				subtitle : '',
				url : 'http://cmeducation.org/',
				desc : 'Creative Media Group is a full service media production house based in Orem, Utah. We specialize in high quality digital video production, post-production, and motion graphics.',
				img: 'creative-media-education',
				contributions : 'Stripe Integration|Front-end and Back-end|integrating courses the custom LMS.',
				techs: 'AngularJs|PHP|JavaScript|jQuery|HTML|CSS',
				live: false
			},
			{
				title : 'LavaVolt',
				subtitle : '',
				url : 'http://lavavolt.com',
				desc : 'LavaVolt is an online film festival and digital distribution solution for independent filmmakers.',
				img: 'lavavolt',
				contributions : 'All of the back-end|everything from user accounts, to film uploading, to querying from the film library.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
				live: true
			},
			{
				title : 'Enspark LMS',
				subtitle : '',
				url : 'http://lms.enspark.com',
				desc : 'From Leadership Skills to Time Management, our interactive e-Learning courses make people better.',
				img : 'enspark-lms',
				contributions : 'Finished the second version of the LMS. Restructured the user account and course tracking database. Made information requests dynamic with page jQuery AJAX.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
				live: true,
			},
			{
				title : 'First Mile',
				subtitle : '',
				url : 'http://enspark.net/internationalfulfillment/',
				desc : 'We provide discounted integrated solutions to ship your products or your customers products for less money.',
				img : 'first-mile',
				contributions : 'All back-end. Worked with the Flash developer sending information to and from the mobile app. Creating a delivery route system, "text message like" system, and automated tasks.',
				techs: 'PHP|AngularJs|JavaScript|jQuery|HTML|CSS',
				live: true,
			},
			{
				title : 'The Putting Tour',
				subtitle : '',
				url : 'http://theputtingtour.com',
				desc : 'The Putting Tour at Qualifiers Golf will train your nervous system by challenging you with dozens of such putts in a 30 minute round. It really works!',
				img : 'the-putting-tour',
				contributions : 'Created the user account system, sending information to and from the mobile app. Helped to develop the mobile app for the golf kiosk, as well as the bracket system for the online competitions.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
				live: true,
			},
			{
				title : 'WinInsights',
				subtitle : '',
				url : 'http://wininsights.com',
				desc : 'WIN Insights is a Diversity and Inclusion - focused learning management system that delivers training, networking, tools, resources, and analytics.',
				img : 'wininsights',
				contributions : 'Hand created a custom blog for communities to converse about their executive and cultural groups. Also created a custom slider, and several WordPress pages.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
				live: true,
			},
			{
				title : 'Barrier Pest Control',
				subtitle : '',
				url : 'http://barrierpc.com',
				desc : 'Barrier Pest Control will proactively conquer your existing pest populations and prevent future invasions.',
				img : 'barrier',
				contributions : "Created a cronjob to store customer transactions in a MYSQL database then email a list of those transactions in a daily report to the company owners. Front-end fixes to the WordPress site, fixing styles and updating images. ",
				techs: 'JavaScript|jQuery|HTML|CSS',
				live: true,
			},
			{
				title : 'Enspark',
				subtitle : '',
				url : 'http://enspark.com',
				desc : 'From Leadership Skills to Time Management, our interactive e-Learning courses make people better.',
				img : 'enspark',
				contributions : 'Helping to push the second version of Enspark.com live. Implementing a feed, creating forms, and various front-end fixes.',
				techs: 'JavaScript|jQuery|HTML|CSS',
				live: true,
			},
			{
				title : 'Utah Casa',
				subtitle : '',
				url : 'http://utahcasa.org/',
				desc : 'Casa is a volunteer organization that empowers everyday citizens with the ability to transform the lives of abused and neglected children.',
				img : 'utah-casa',
				contributions : 'Helped to fix the blog functionality and structure in WordPress as well as front-end fixes.',
				techs: 'PHP|HTML|CSS',
				live: true,
			},
			{
				title : 'All American Sod Farms',
				subtitle : '',
				url : 'http://allamericansod.com/',
				desc : 'All American Sod Farms is a family owned and operated business.',
				img : 'all-american-sod',
				contributions : 'Before I started working full time as a web developer I was the office manager on the farm. I created and am maintaining this site. It is still a work in progress. I designed and created this custom WordPress theme.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
				live: true,
			},
			{
				title : 'Paradigm Life',
				subtitle : '',
				url : 'http://paradigmlife.net/',
				desc : 'Infinite Banking is a concept that allows individuals to utilize Permanent Life Insurance in ways that most individuals and even insurance professionals could never have imagined.',
				img : 'paradigm-life',
				contributions : 'Helped with the WordPress theme and structure architecture.',
				techs: 'PHP|JavaScript|jQuery|HTML|CSS',
				live: true,
			},
			{
				title : 'Debt Free Planning',
				subtitle : '',
				url : 'http://debt-free-planning.com',
				desc : 'Get a Free Online Report and recommended solution to your debt problem.',
				img : 'debt-free-planning',
				contributions : 'Front-end construction. Creating a email form for user information requests.',
				techs: 'PHP,Less-CSS|HTML|JavaScript',
				live: false
			},
			{
				title : 'Southam Consulting',
				subtitle : '',
				url : 'http://southamconsulting.net',
				desc : 'Southam Consulting is a consortium of business specialists in several states who have extensive experience and expertise in helping clients achieve peak performance.',
				img : 'southam-consulting',
				contributions : 'Creating a email form for user information requests. Other front-end fixes.',
				techs: 'PHP|CSS|HTML|JavaScript',
				live: true
			}
		];

		angular.forEach(array, function(site){
			site.techs = site.techs.split('|');
			site.contributions = site.contributions.split('|');
		});
		return array;
	};//getSites

	$scope.init();

}//WebsitesCtrl