<?php 
$local = true;
$blog = true;

function init(){
    global $local;
    global $blog;

    if($_SERVER['HTTP_HOST'] == 'localhost'){
        $local = true;
    }else{
        $local = false;
    }

    if($_SERVER['HTTP_HOST'] == 'blog.travishoki.com'){
        $blog = true;
    }else{
        $blog = false;
    }
}//init

function getLink($str){
    global $blog;
    if($blog){
        return 'href="http://travishoki.com/#/'.$str.'"';
    }else{
        return 'ng-class="{active: currentPage == \''.$str.'\'}" ng-click="setRoute(\''.$str.'\')"';
    }
}//getLink

init();
?>
<div id="header" scroll-nav>
    <div class="header-inner">
        <div class="branding">
            <?php if($blog):?>
                <a href="http://travishoki.com">
            <?php else:?>
                <a ng-click="setRoute('home')">
            <?php endif;?>
                <h1>Travis Hoki</h1>
            </a>
        </div><!-- branding -->
        <i class="fa fa-reorder mobileMenuBtn hidden-sm hidden-md hidden-lg" ng-click="showMobileMenu = !showMobileMenu"></i>

        <nav collapse="!showMobileMenu" ng-init="showMobileMenu = false" ng-cloak>
            <ul>
                <li>
                    <a <?php echo getLink('home');?>>Home</a>
                </li>
                <li>
                    <a <?php echo getLink('portfolio');?>>Portfolio</a>
                </li>
                <li>
                    <a <?php echo getLink('resume');?>>Resume</a>
                </li>
                <li>
                    <a <?php echo getLink('about');?>>About Me</a>
                </li>
                <li>
                    <a <?php echo getLink('contact');?>>Contact</a>
                </li>
                <li>
                <?php if(!$local):?>
                    <?php if($blog):?>
                        <a class="btn btn-green active">
                    <?php else:?>
                        <a class="btn btn-green" href="http://blog.travishoki.com">
                    <?php endif;?>
                        Blog</a>
                <?php endif;?>
                </li>
            </ul>
        </nav>

    </div><!-- header -->
</div><!-- header-holder -->
