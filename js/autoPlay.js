
/**
 * singleton.
 * Activates auto play functionality
 * Which enables whole application to run by itself without user interaction. 
 * views gets changes depending on the autoPlayTime that we pass
 */
define(['js/lib/jquery'],function(){

    var idleTime = 0 ;
   
    var currentView = 0;
    
    var playVideo = false;
    
    var wallHomeElements = $('.card');
    
	function timerIncrement() {
        idleTime = idleTime + 1;
        if (idleTime > 1 && !playVideo) { // 1 minutes
            //window.location.reload();
            if($("#showcase:visible").length){
                idleTime = 0;
                autoPlay();
            }else{
                idleTime = 0;
                $("#showcase").scrollTop(0);
                $("a.homeIcon").trigger("click");
            }
        }
    };
    

   function autoPlay(){
        $(wallHomeElements[currentView]).trigger("click");
        (currentView < wallHomeElements.length -1) ? currentView += 1 : currentView = 0;
    }  
   
   
	$(document).bind("mousemove mousedown keypress", function(e){
        idleTime = 0;
     });
    
    return {
    	
    	activateAutoPlay : function(timeout){
    	   console.log("starting autoplay with timeout " + timeout);
    	   setInterval(timerIncrement, timeout ? timeout : 60000); // 1 minute
    	}
  }
	
});