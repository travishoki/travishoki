<div class="above-footer">
	<div class="above-footer-inner">
        <div class="row">
            <div class="col-sm-12 col-sm-6">
                <ul class="social-icons">
                    <li>
                        <a href="https://github.com/travishoki/" target="_blank" title="Travis's Github">
                            <i class="fa fa-git"></i>
                        </a>
                    </li>    
                    <li>
                        <a href="https://www.linkedin.com/pub/travis-hoki/85/b0b/113" target="_blank" title="Travis's Linked In">
                            <i class="fa fa-linkedin"></i>
                        </a>
                    </li>    
                </ul>
            </div>
            <div class="col-sm-12 col-sm-6">
                <form role="form" ng-submit="sendContactForm()">
                    <alert ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</alert>
                    
                    <input type="text" ng-model="contactName" placeholder="Name" required/>
                    <input type="email" ng-model="contactEmail" placeholder="Email" required/>
                    <textarea id="last-name" ng-model="contactComment" placeholder="Comment" required></textarea>

                    <input type="submit" class="btn btn-green" value="Send"/>
                </form>
            </div>
        </div><!-- row -->
    </div>
</div>

<div id="footer">
    <div class="footer-inner">
        <p>
            <span>Copyright Travishoki.com <?php echo date('Y');?></span> 
            <span>All Rights Reserved</span>
        </p>
    	<i class="fa fa-angle-up back-to-top"  ng-click="backToTop()"></i>
	</div><!-- footer-inner -->
</div><!-- #footer -->
