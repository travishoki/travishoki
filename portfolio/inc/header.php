<?php 
if($_SERVER['HTTP_HOST'] == 'travishoki.com'){
    $local = true;
}else{
    $local = false;
}

function getLink($str){
    global $local;
    if($local){
        return 'ng-class="{active: currentPage == \''.$str.'\'}" ng-click="setRoute(\''.$str.'\')"';
    }else{
        return 'href="http://travishoki.com/#/'.$str.'"';
    }
}
?>
<div id="header-holder">
    <div id="header">
        <div class="branding">
            <?php if($local):?>
                <a ng-click="setRoute('portfolio')">
            <?php else:?>
                <a href="http://travishoki.com">
            <?php endif;?>
                <img src="http://travishoki.com/portfolio/imgs/headerImg_shadow.png" title="TravisHoki.com"/>
            </a>
        </div><!-- branding -->
        <i class="fa fa-reorder mobileMenuBtn hidden-sm hidden-md hidden-lg" ng-click="showMobileMenu = !showMobileMenu"></i>

        <nav collapse="!showMobileMenu" ng-init="showMobileMenu = false" ng-cloak>
            <ul>
                <li>
                    <a class="btn btn-green" <?php echo getLink('portfolio');?>>PORTFOLIO</a>
                </li>
                <li>
                    <a class="btn btn-green" <?php echo getLink('resume');?>>RESUME</a>
                </li>
                <li>
                    <a class="btn btn-green" <?php echo getLink('about');?>>ABOUT ME</a>
                </li>
                <li>
                    <a class="btn btn-green" <?php echo getLink('contact');?>>CONTACT</a>
                </li>
                <li>
                <?php if($local):?>
                    <a class="btn btn-green" href="http://travishoki.com">
                <?php else:?>
                    <a class="btn btn-green active">
                <?php endif;?>
                </li>
            </ul>
        </nav>
    </div><!-- header -->
</div><!-- header-holder -->
