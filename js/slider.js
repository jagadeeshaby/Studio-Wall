
/**
 * which basically creates a instance of bxSlider and handles all its functionalities here 
 */

define([
        'js/lib/jquery.bxslider',
        'js/lib/jquery.fitvids'
        ],
 function(){
	
		/**
		 * @Class slider
		 * 
		 * which creates a instance of bx slider and handles all the events related to it 
		 * 
		 * All data-type will instantiate this class  and to avoid creating 2 instances of the same we are checking for hasCarousel class
		 */
	
		var Slider = function(options){
			
			console.log("calling slider constuctor with the below parameters");
			
			if(!options.sliderElement){
				throw new Error("cliked target is(slider element) not defined. you must pass a slider element from which will retrive data for slider");
			}
			
			this.options = {
					sliderElement : null
			};
		
			$.extend(this.options,(options ? options : {}));
			
			console.log(this.options);
			
			this.init();
		};
		
		
		/**
		 * All public properties are defined here
		 */
		
		Slider.prototype = {
				
			constructor : Slider,
			
			init : function(){
				this.initVariable();

				if(this.sliderElement.hasClass('hasCarousel')){
					return true;
				}else{
					this.removeEventListeners();
					this.initEvents();	
					this.getSliderData();
				}
				
			},
			
			initVariable : function(){
			
				this.sliderElement = this.options.sliderElement;
				
				this.sliderContainer = $(this.sliderElement.data('containerRef'));
				
				this.url = this.sliderElement.data('url');
				
				this.carouselControllerWrapper = $('.carouselControllerWrapper');
				
			},
			
			initEvents : function(){
				this.carouselControllerWrapper.on('click','.carouselControllerPrev', this.clickedPrevButton);
				this.carouselControllerWrapper.on('click','.carouselControllerNext',this.clickedNextButton);
			},
			
			clickedPrevButton : function(){
				$('.bx-prev').trigger('click');
			},
			
			
			clickedNextButton : function(){
				$('.bx-next').trigger('click');
			},
			
			/**
			 * @method removeEventListeners
			 * Unbind all events if required 
			 */
			removeEventListeners : function(){
				this.carouselControllerWrapper.off('click','.carouselControllerPrev', this.clickedPrevButton);
				this.carouselControllerWrapper.off('click','.carouselControllerNext',this.clickedNextButton);
			},
			
	
			getSliderData : function(){
				
				var me = this;
				
				 $.ajax({
			            type: "GET",
			            dataType: "json",
			            url: me.url,
			            success: function(data) {
			               me.processSliderData(data);
			            },
			            error: function(data) {
			               me.handleErrors();
			            }
		
			        });	
			},
				
			
			/**
			 * @method processSliderData
			 * @param data
			 * Which does processing of data which is received from server/json
			 */
			processSliderData : function(data){	
					
				this.createSliderImages(data);
				this.createSliderDescription(data);
				
				this.sliderContainer.find('.itemDetails').first().show();
		
				this.applySlider();
			},
			
			
			/**
			 * @method applySlider
			 * Creates a bx-slider instance
			 */
			applySlider : function(){
				
				var me = this;
				
				var carouselRef = this.sliderContainer.find(".viewCarousel");
				
				carouselRef.show();
			
				carouselRef.find('.bxslider').bxSlider({
		            touchEnabled: true,
		            touchEnabled: true,
		            mode: 'horizontal',
		            video: true,
		            responsiv: true,
		            autoHover: true,
		            useCSS: false,
		            captions: true,
		            auto: true,
		            parentRef: me.sliderContainer
		        });
		
		        this.sliderElement.addClass("hasCarousel");
		        
		        $(window).trigger('resize');
			},
			
			/**
			 * @method createSliderImages
			 * @param data
			 * @param id
			 * Create a slider images here
			 */
		    createSliderImages  : function (data, id) {
				var templateIdImage = this.sliderContainer.find(".bxslider").attr("data-ref-id");
				var imageTemplate = Handlebars.compile($(templateIdImage).html());
				this.sliderContainer.find('.bxslider').append((imageTemplate(data)));		
			},
			

			/**
			 * @method createSliderDescription
			 * @param data
			 * @param id
			 * Create a slider descriptions here
			 */
			createSliderDescription : function (data, id) {
				var templateId = this.sliderContainer.find(".carouselDescription").attr("data-ref-id");
				var descriptionTemplate = Handlebars.compile($(templateId).html());
				this.sliderContainer.find('.carouselDescription').append((descriptionTemplate(data)));	
			},
			
			
			/**
			 * All ajax error handling should come here
			 */
			handleErrors : function(){
				
			}
			
				
		};

		return Slider;
	}
)
