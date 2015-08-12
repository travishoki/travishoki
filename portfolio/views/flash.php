<div class="flash-gallery">

	<?php include '../inc/portfolio_menu.php';?>

	<div class="section">
		<h1>Flash Banners</h1>
		
		<p>I animated each of these banners in AS3.</p>
		
        <div class="row">
            <ul class="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 flashBannerThumbs">
                <li class="col-md-3 col-sm-3 col-xs-6">
                    <img src="portfolio/imgs/flashBanners/blendtec_thumb.jpg" ng-click="openFlashBanner('blendtec','970','250')" title="Blend Tec"/>
                </li>
                <li class="col-md-3 col-sm-3 col-xs-6">
                    <img src="portfolio/imgs/flashBanners/lexus_thumb.jpg" ng-click="openFlashBanner('lexus','160','600')" title="Lexus of Lindon"/>
                </li>
                <li class="col-md-3 col-sm-3 col-xs-6">
                    <img src="portfolio/imgs/flashBanners/monavie_thumb.jpg" ng-click="openFlashBanner('monavie','300','250')" title="Monavie"/>
                </li>
                <li class="col-md-3 col-sm-3 col-xs-6">
                    <img src="portfolio/imgs/flashBanners/questBar_thumb.jpg" ng-click="openFlashBanner('questproteinbar','300','250')" title="Quest Bar"/>
                </li>
            </ul>
		</div><!-- row -->
		<p class="caption">(Click the icons to view the flash banners)</p>
			
		<div class="flashHolder"></div>
	</div><!-- section -->
		
	<div class="section">
		<h1>eLearning Courses</h1>
		<h2>Enspark Courses</h2>

		<p>I helped to code each of these eLearning courses in ActionScript 3 at Enspark.</p>
		
		<a href="http://enspark.com/" class="btn btn-green" target="_blank">Go To Website</a>
		<br/>
		<br/>

		<ul class="ensparkCourseThumbs">
            <li ng-repeat="item in ensparCourses" class="col-xl-3 col-md-4 col-sm-4 col-xs-6">
				<img ng-src="{{'portfolio/imgs/ensparkCourses/'+item.link+'.png'}}" class="img-responsive" title="{{item.title}}"/>
            </li>
		</ul>
	</div><!-- section -->

</div><!--flash-gallery-->