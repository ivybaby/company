(function($){
	
	//nav的slideDown
	$.fn.navSlideDown=function (){
		$(this).find(".nav-ol").hide().end().find("li").addClass("cursor");
		$(this).children("li").hover(function(){
			$(".nav-ul>li").css({"border-top":"3px solid white","border-bottom":"3px solid white"});
			$(this).css({"border-top":"3px solid #f0ad4e","border-bottom":"3px solid #f0ad4e"});
		});
		$(this).children("li:has(ol)").hover(function() {
             if ($(this).find("li").length > 0) {
                 $(this).children("ol").stop(true, true).slideDown();//下拉的速度
              }
       },function() {
            $(this).children("ol").stop(true, true).slideUp();
        });
		
	}
	
	//tab 轮换
	$.fn.tab=function(options){//tab
		alert("ss");
		opt = $.extend({}, $.fn.tab.defaults, options);
		$(opt.tabContent).hide();
		$(opt.tabItem).each(function(){
			if($(this).hasClass("tab-item-active")){
				var $itemHref=$(this).attr("href");
				$($itemHref).show();
				return;
			}
		});
		$(opt.tabItem).on("click",function(e){
			e.preventDefault();
			if($(this).hasClass("tab-item-active")){
				return;
			}
			else{
				$(opt.tabItem).removeClass("tab-item-active");
			    $(this).addClass("tab-item-active");
			    $(opt.tabContent).hide();
			    $($(this).attr("href")).show();
			}
			
		})
		
	}
	
	
	
	/*top按钮 start*/
	var goToTopTime;
    $.fn.goToTop=function(options){
        var opts = $.extend({},$.fn.goToTop.def,options);
        var $window=$(window);
        $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); // opera fix
        var $this=$(this);
        clearTimeout(goToTopTime);
        goToTopTime=setTimeout(function(){
            var controlLeft;
            if ($window.width() > opts.pageHeightJg * 2 + opts.pageWidth) {
                controlLeft = ($window.width() - opts.pageWidth) / 2 + opts.pageWidth + opts.pageWidthJg;
            }else{
                controlLeft = $window.width()- opts.pageWidthJg-$this.width();
            }
            var cssfixedsupport=$.browser.msie && parseFloat($.browser.version) < 7;//判断是否ie6

            var controlTop=$window.height() - $this.height()-opts.pageHeightJg;

            controlTop=cssfixedsupport ? $window.scrollTop() + controlTop : controlTop;
            var shouldvisible=( $window.scrollTop() >= opts.startline )? true : false;

            if (shouldvisible){
                $this.stop().show();
            }else{
                $this.stop().hide();
            }

            $this.css({
                position: cssfixedsupport ? 'absolute' : 'fixed',
                top: controlTop,
                right:0
                //right: controlLeft
            });
        },30);

        $(this).click(function(event){
            $body.stop().animate( { scrollTop: $(opts.targetObg).offset().top}, opts.duration);
            $(this).blur();
            event.preventDefault();
            event.stopPropagation();
        });
    };

    $.fn.goToTop.def={
        pageWidth:1000,//页面宽度
        //pageWidthJg:20,//按钮和页面的间隔距离
        pageHeightJg:300,//按钮和页面底部的间隔距离
        startline:130,//出现回到顶部按钮的滚动条scrollTop距离
        duration:3000,//回到顶部的速度时间
        targetObg:"body"//目标位置
    };
	/*top按钮 end*/
	
	
	
	
	
	
})(jQuery)