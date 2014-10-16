/**
 * Which creates instance of social feeds and upadtes the dom
 * 
 */

define([
        'js/helpers'
        ],
 function(){
	
	var SocialFeeds = function(options){
		console.log("calling social feed constuctor");

		if(!options.socialFeedContainer){
			throw new Error("socialFeedContainer element is not defined. you must pass a socialFeedContainer which we wll be using it for " +
					"updating social feed output");
		}
		
		this.options = {
				socialFeedContainer : $("#socialUpdates"),
				templateId: 'socialMessages'
		};
		
		$.extend(this.options,(options ? options : {}));
		
		console.log(this.options);
		
		this.init();
	};


	SocialFeeds.prototype = {
			
		constructor : SocialFeeds,
		
		init : function(){
			this.initvariable();
			this.removeEventListenrs();
			this.initEvents();	
			this.getSocialFeeds();
		},
		
		initvariable : function(){
				
			this.socialFeedTemplate = this.options.socialFeedTemplate;//Handlebars.compile($(this.options.templateId).html()),
			this.socialFeedContainer = this.options.socialFeedContainer;
			
			this.url = this.options.socialFeedElement.data('url');
			
		},
		
		initEvents : function(){
			
			 $(document).on('click',".socialMediaLink",this.socialMediaLinkClicked);
			 
		},
		
		removeEventListenrs : function(){
			
			$(document).off('click',".socialMediaLink",this.socialMediaLinkClicked);
		},
		
		
		socialMediaLinkClicked : function(){
		    
			window.open($(this).data('url'), "", "width="+window.innerWidth+", height="+window.innerHeight);
		},
		
		getSocialFeeds : function(){
			
			var me = this;
			
			 $.ajax({
		            type: "GET",
		            dataType: "json",
		            url: me.url,
		            success: function(data) {
		               me.processSocialData(data);
		            },
		            error: function(data) {
		               me.handleErrors();
		            }

		        });	
		},
			
		processSocialData : function(data){	
			 this.socialFeedContainer.html('');
			 this.socialFeedContainer.html(this.socialFeedTemplate(data));
		},
		
		
		handleErrors : function(){	
			this.socialFeedContainer.html("Failed to Load:");
		}
		
			
	};

	return SocialFeeds;
}

);


