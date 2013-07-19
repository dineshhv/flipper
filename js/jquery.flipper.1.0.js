/*****************************************************
*													 *
*	Author: Dinesh Vadivel							 *
*	Plugin: Jquery.flipper.1.0.0.js					 *
*	Date:	12-07-2013								 *
*													 *
*													 *
*													 *
*													 *
*													 *
*													 *
*****************************************************/

(function($){
   var Flipper = function(element, options)
   {
       var elem = $(element);
       var obj = this;

       // Merge options with defaults
       var settings = $.extend({
          target 	: 999999,
          speed		: 1000,
          direction	: "incr",
          type 		: "alphanum",	//alphanum, alpha, numeric
          sequential: "false",
          jump		: 3,
          trigger	: true
          
       }, options || {});
       
       var matched, browser;
      
       jQuery.uaMatch = function( ua ) {
	   ua = ua.toLowerCase();
	   var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

		    return {
		        browser: match[ 1 ] || "",
		        version: match[ 2 ] || "0"
		    };
		};

		matched = jQuery.uaMatch( navigator.userAgent );
		browser = {};
		
		if ( matched.browser ) {
		    browser[ matched.browser ] = true;
		    browser.version = matched.version;
		}
		
		// Chrome is Webkit, but Webkit is also Safari.
		if ( browser.chrome ) {
		    browser.webkit = true;
		} else if ( browser.webkit ) {
		    browser.safari = true;
		}
		
		jQuery.browser = browser;
	
	
	   if(settings.trigger==true)
	   {
		  $('button').bind('click',function(e){
			  e.preventDefault();
			  console.log()
			  counter(elem, settings, matched.browser);
	          animate(elem, settings, matched.browser);
		  });
	   }
	   else
	   {
       counter(elem, settings, matched.browser,time);
      
       animate(elem, settings, matched.browser,time);
       }
       
       // Public method
       this.addhighlight = function()
       {
           
       };
   };

   function counter(element, options, browser) 
   {
		
		ID=element.attr('id');
		$('#'+ID).empty();

		$('#'+ID).each(function( index ) {
			if(options.type=='alphanum')
			{
				textlength=options.target.length;
				$(this).append('<ul id="myflip"></ul>');
				for(i=0;i<textlength;i++)
				{
					$(this).children('#myflip').append('<li id="'+i+'" data-dig='+options.target[i]+'></li>');
				}
				
			}
			else if(options.type=='alpha')
			{
				$(this).html(options.target);	
			}
			else if(options.type=='numeric')
			{
				length=options.target.toString().length;
				console.log(length);
				$(this).html(options.target);	
			}

		});
	    	
   }
   function animate(element, options, browser) 
   {
   		var time;
   		i=0;
		var flag=[];
   		
   		ID=element.attr('id');
   		textlength=options.target.length;
   		if(options.type=='alphanum')
		{
			var arr = ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		}
		else if(options.type=='alpha')
		{
			var arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		}
		else if(options.type=='numeric')
		{
			var arr = [1,2,3,4,5,6,7,8,9,0];
		}
		
		for(ins=0;ins<=textlength;ins++)
		{
			flag[ins]=0;
		}
		
		
		var inte=self.setInterval(function(){
			$('#'+ID+' #myflip li').each(function( index ) {
	   			crid=$(this).attr('id');
	   			
				digit=$(this).data('dig').toString();
				
				if(flag[crid]!=1)
				{
					
					if(digit.toLowerCase()==arr[i])
					{
						$('#'+crid).text(arr[i]);
						myv=parseInt(crid);
						
						flag[myv]=1;
					   
					  
					}
					else
					{	
					    $('#'+crid).text(arr[i]);
					}
				}
				else
				{	
					console.log('test');
					tot=0;
					$.each(flag,function(key,index){
						tot+=parseInt(this);
					});
					if(tot==textlength)
					{
						clearInterval(inte);
					}
					
				}
			});
	   		
	   		i++;
			
		},10);
	
   }
  
   
  function isAlphanumeric( str ) {
	  return /^[0-9]+$/.test(str);
  }
  
   $.fn.flipper = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('flipper')) return;

           // pass options to plugin constructor
           var relocate = new Flipper(this, options);
          
           // Store plugin object in this element's data
           element.data('flipper', relocate);
       });
   };
})(jQuery);