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
    <?php include 'portfolio/inc/header.php';?>

    <div id="container">
        <div class="content-holder">
            <div class="content">
                <div ng-view></div>
            </div><!-- content -->
        </div><!-- content-holder -->

        <?php include 'portfolio/inc/footer.php';?>        

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

