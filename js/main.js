
/**
 *  This is the entry point for the application. It does following things
 * 
 *  1. Creates wallHome instance - which is basically a cloud9 carousal instance
 *  
 *  2. Activates autoPlay functionality if required
 *  
 *  3. Creates instances of slider/social feeds depending on the type we specified with wallHome elements Ex : - for gallery 
 *  data-type is given as slider so this class creates instance of slider and loads
 *  
 */

require([
        'js/lib/jquery',
        'js/lib/handlebars-v1.3.0',
        'js/wallHome',
        'js/socialFeeds',
        'js/slider',
        'js/autoPlay'
       ],
 function(
		jquery,
		handlebar,
		wallHome,
		socialFeeds,
		slider,
		autoPlay
		){
	
			/**
			 * @class StudioWall
			 */
			var StudioWall = function (){
				
				console.log("studio wall app contsructor called");
				
				this.init();
			};
		
			
			StudioWall.prototype = {
					
				constructor :  StudioWall,
				
				/**
				 * @param autoPlayTime
				 * used for configuring auto play timeout
				 */
				autoPlayTime : 60000,
				
				init : function(){		
					this.initVariable();
					this.initEvents();
					this.initializeWallHomePage();
					this.activateAutoPlay();
				},
				
				
				/**
				 * @method initVariable
				 * Used to cache all the elements which we are going to use throughout this class 
				 */
				initVariable : function(){
					this.homeIcon = $('a.homeIcon');
				    this.wallHomeItems = $('.card');
				    this.cloud9Container = $("#showcase");
		            socialFeedTemplates = {};
				},
				
				
				/**
				 * @method initEvents
				 * initialize all events here
				 */
				initEvents : function(){
					var me = this;
					this.homeIcon.on('click',function(e){
						me.onHomeIconClicked(e);
					});
					
					this.wallHomeItems.on('click',function(e){
						me.onWallHomeItemsClick(e);
					});
				},
				
				/**
				 * @method onHomeIconClicked
				 * @param e
				 * Which actually takes back user to Wall home screen 
				 */
				onHomeIconClicked : function(e){
					var me = this;
					e.preventDefault();
					$(this).fadeOut(); 
					$(".wallView:visible").fadeOut(function() { 
			            me.cloud9Container.fadeIn(); 
			        });
				},
				
				
				/**
				 * @method onWallHomeItemsClick
				 * @param e
				 * Which actually takes user to the respective view depending on wall home item data-type value
				 */
				onWallHomeItemsClick :  function(e){
			        
			    	var me = this;
			        var _this = $(e.currentTarget);
			        var reference = _this.data('containerRef');
			        var type = _this.data('type');
			    	e.stopPropagation();
			        e.preventDefault();
			  
			        console.log("Clicked item:" + reference);
			        
			        this.cloud9Container.fadeOut(function() { 
			            $(reference).fadeIn(function() {  
			                me.homeIcon.fadeIn();  
			                switch (type){
			                	case 'slider' :  me.initializeSliders(_this);break;
			                	case 'socialfeed' : me.loadSocialFeeds(_this);break;
			                	default : console.log('type not given'); break;
			                }
			                
			            });
			        });
			    },
			    
			    
			    /**
			     * Activates auto play functionality
			     * Which enables whole application to run by itself without user interaction. 
			     * views gets changes depending on the autoPlayTime that we pass
			     */
				activateAutoPlay : function(){
					autoPlay.activateAutoPlay(this.autoPlayTime);
				},
				
				
				/**
				 * Creates instance of a wall home
				 */
				initializeWallHomePage : function(){
					var me = this;
					
					this.wallHome = new wallHome({
						carousalContainer :  me.cloud9Container
					});
				},
				
			    
				/**
				 * Creates instance of social feed
				 * @param element
				 */
			    loadSocialFeeds : function(element){
			    	

					var socialFeedContainerId = element.data('containerRef');
					
					var socialFeedContainer = $(socialFeedContainerId);
					
					if(!socialFeedTemplates[socialFeedContainerId]){
						socialFeedTemplates[socialFeedContainerId] = Handlebars.compile($("#" + $(socialFeedContainer).data('templateId')).html());
					}
					
		    	   new socialFeeds({
						socialFeedElement : element,
						socialFeedContainer : socialFeedContainer,
						socialFeedTemplate : socialFeedTemplates[socialFeedContainerId]
		    	   });
			    },
			    
			    /**
			     * Creates instance of slider
			     * @param element
			     */
			    initializeSliders : function(element){
			    	
			    	console.log('initializing slider');
			    	console.log(element);
			    	
			    	new slider ({
			    		sliderElement : element
			    	});
			    }
			    
			};

		//As its a entry point we need to create the instance on Dom load	
	    $(function() {
	        var page = new StudioWall();
	    });
			
 }

);

