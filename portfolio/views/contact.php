<div class="contact-page">

    <h1>Contact Me</h1>
	<div class="row">
        <div class="col-md-6 col-sm-6">
            <img src="portfolio/imgs/myPic2.jpg" class="img-responsive" width="400" height="267"/>
        </div><!-- col-md-6 col-sm-6 -->
        <div class="col-md-6 col-sm-6">
            <p>Needing full-time or contract work.</p>
            <br/>
            <p>Feel free to contact me with comments or critiques at HokiRocko@gmail.com</p>

            <form class="form-horizontal" role="form" ng-submit="sendContactForm()">
				<alert ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</alert>
                
                <div class="form-group">
                    <label for="name" class="col-sm-2 control-label">Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="name" ng-model="contactName" placeholder="Name" required/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="email" class="col-sm-2 control-label">Email:</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="email" ng-model="contactEmail" placeholder="Email" required/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="last-name" class="col-sm-2 control-label">Comment:</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" id="last-name" ng-model="contactComment" placeholder="Comment" required></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                        <input type="submit" class="btn btn-green fright" ng-show="!sendingContactForm" value="Send"/>
                    </div>
                </div>
                <div class="loaderHolder">
                    <img src="portfolio/imgs/gifs/Travis_Hoki_Loader.gif" class="loader" ng-show="sendingContactForm"/>
                    <img src="portfolio/imgs/gifs/loader_space_holder.png"/>
                </div><!-- loaderHolder -->
            </form>

        </div><!-- col-md-6 col-sm-6 -->
	</div><!-- row -->
</div><!-- contact-page -->