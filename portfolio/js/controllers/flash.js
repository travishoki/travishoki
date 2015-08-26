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
