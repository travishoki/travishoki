<!doctype html>
<html lang="en" ng-app="APP">
<head>
    <title>TravisHoki.com</title>

    <!--Bootstrap-->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"/>

	<!-- Font Awesome -->
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="portfolio/css/main.css" rel="stylesheet" type="text/css"/>

    <meta name="viewport" content="width=device-width" />   

    <!-- favicon -->
    <link rel="icon" type="image/ico" href="portfolio/imgs/favicon.ico" />
      
</head>
<body ng-controller="mainCtrl" class="{{currentPage}}">

    <div id="container">
        <div id="header">
        	<div class="branding">
                <a ng-click="setRoute('portfolio')">
                    <img src="portfolio/imgs/headerImg_shadow.png" title="TravisHoki.com"/>
                </a>
			</div><!-- branding -->
            <i class="fa fa-reorder mobileMenuBtn hidden-sm hidden-md hidden-lg" ng-click="showMobileMenu = !showMobileMenu"></i>
            
            <nav collapse="!showMobileMenu" ng-init="showMobileMenu = false" ng-cloak>
                <ul>
<!--
                    <li class="btn btn-green" ng-class="{active: currentPage == 'portfolio', active: currentPage == 'flash', active: currentPage == 'apps'}"><a ng-click="setRoute('portfolio')">PORTFOLIO</a></li>
-->
                    <li>
                        <a class="btn btn-green" ng-click="setRoute('portfolio')">PORTFOLIO</a>
                    </li>
                    <li>
                        <a class="btn btn-green" ng-class="{active: currentPage == 'resume'}" ng-click="setRoute('resume')">RESUME</a>
                    </li>
                    <li>
                        <a class="btn btn-green" ng-class="{active: currentPage == 'about'}" ng-click="setRoute('about')">ABOUT ME</a>
                    </li>
                    <li>
                        <a class="btn btn-green" ng-class="{active: currentPage == 'contact'}" ng-click="setRoute('contact')">CONTACT</a>
                    </li>
                </ul>
            </nav>
        </div><!-- header -->

        <div class="banner-container">
            <div class="banner-holder">
                <div class="banner">
                    <div class="bannerText">
                        <h1>Travis Hoki</h1>
                        <p>Back-end developer with <br/>front-end and flash experience.</p>
                    </div><!-- bannerText -->
                    <img src="portfolio/imgs/myPic_cutout.png"/>
                </div><!-- banner -->
            </div><!-- banner-holder -->
        </div><!-- banner-container -->

        <div class="content-holder">
            <div class="content">
                <div ng-view></div>
            </div><!-- content -->
        </div><!-- content-holder -->
        
        <div id="footer">
            <p>
                <span>Copyright Travishoki.com <?php echo date('Y');?></span> 
                <br  class="phoneOnly"/>
                <span class="tabletVisible desktopVisible">&nbsp;&minus;&nbsp;</span>
                <span>All Rights Reserved</span>
            </p>
            
            <p class="backToTop" ng-click="backToTop()">Back to Top</p>
        </div><!-- #footer -->
    </div><!--container-->

    <!-- jQuery -->
    <script src="portfolio/lib/jquery.min.js" type="text/javascript"></script>

    <!-- Bootstrap -->  
	<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

    <!-- Angular JS -->
    <script src="portfolio/lib/angular/angular.min.js" type="text/javascript"></script>
    <script src="portfolio/lib/angular/angular.route.min.js" type="text/javascript"></script>
    <script src="portfolio/lib/angular/angular.animate.min.js" type="text/javascript"></script>
    <script src="portfolio/lib/angular/angular-ui-bootstrap.js" type="text/javascript"></script>

    <!-- Custom -->
    <script src="portfolio/controllers/controller.js" type="text/javascript"></script>

</body>
</html>

