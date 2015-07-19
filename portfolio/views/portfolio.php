<div class="home-gallery">

	<?php include '../inc/portfolio_menu.php';?>

	
	<ul class="site-gallery">
		<li ng-repeat="site in sites" 
		class="col-xs-6 col-sm-6 col-md-4 col-lg-4"
		ng-click="openModal($event, $index, site)" 
		ng-class="{full: site.full, item: !site.full, active: site.active}"
		>
			<!-- Items -->
			<site-item site="site" ng-if="!site.full"></site-item>

			<!-- List -->
			<site-info site="site" ng-if="site.full" ></site-info>

		</li>
	</ul><!-- site-gallery -->
</div><!--home-gallery-->
