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