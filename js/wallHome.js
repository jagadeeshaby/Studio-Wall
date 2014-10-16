/**
 * initializes wall home clould 9 carousal 
 */

define([
        'js/lib/jquery.cloud9carousel',
        'js/lib/jquery.reflection'
       ],
function(
		carousal,
		reflection
		){
	
			var WallHome = function(options){
				
				console.log("wall home contsructor called");
				
				this.init();
			};
	
	
			WallHome.prototype = {
					
				constructor :  WallHome,
				
				init : function(){
					this.initVariable();
					this.initEvents();	
					this.initializeCarousal();
				},
				
				initVariable : function(){
					this.showcase =  $("#showcase");
				},
				
				initEvents : function(){
				
				},
		
				initializeCarousal : function(){
					
					var me = this;
					
					this.carousal = this.showcase.Cloud9Carousel({ 
							itemClass: "card",
							buttonLeft: $("#nav > .left"),
							buttonRight: $("#nav > .right"),
							autoPlay: 1,
							bringToFront: true,
							onLoaded : function(){
								me.showcase.css('visibility', 'visible');
								me.showcase.css('display', 'none');
								me.showcase.fadeIn(1500);		
							},
					});
				}
			};

			return WallHome;
		 }
);

