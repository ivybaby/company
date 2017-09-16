(function($){
	//centerSlide 的切换 start
	var bWidth=910;
	var bHeight=80;
	var eWidth=940;
	var eHeight=120;
	$.centerSlide=function (){
		    var centerObj=$(".centerHover");//.centerHover对象
			var rowObj=$(".centerHover .row");//每一行.row对象
			
			function getOrder(obj,flag,endWidth,endHeight){//样式
				var oh=obj.children("h5");
				var oul=obj.find("ul");
				var oli=oul.children("li");
				
				oli.each(function(){
			    	var liLength=oli.length;
				    $(this).css({"width":oul.width()/liLength+'px'});
				});
		 
			    var toTopH=oh.height();
			    var toTopLi=oli.height();
			  
/*h5对象padding-top*/var hPadTop=(endHeight-toTopH)/2; 
/*ul对象padding-top*/var liPadTop=(endHeight-toTopLi)/2; 
          
			    oh.css({"padding-top":hPadTop+'px',"padding-bottom":hPadTop+'px'});/*设置h5对象padding-top*/
			    oli.css({"padding-top":liPadTop+'px',"padding-bottom":liPadTop+'px'});/*设置li对象padding-top*/
			   
			    if(flag){obj.animate({"width":eWidth+'px',"height":eHeight+'px'},"fast"); }
			    	  
			}
			
			
			function  getHover(obj){//hover时触发
				var objh=obj.children("h5");
		        var objul=obj.find("ul");
		       
			    var inx=obj.index();
                var data=objh.attr("data-role");
			    objh.prepend("<img src='img/img"+inx+"_"+data+".png' class='hmar'/><br/>");
				
			    objul.children("li").each(function(){
				    $(this).prepend("<img src='img/img"+inx+"_"+$(this).attr('data-role')+".png' class='mar'/><br/>");
				});
				getOrder(obj,true,eWidth,eHeight);
			}
			function initVar(){
			    rowObj.each(function(){
			       	 if($(this).hasClass("inactive")){
						     getHover($(this)); 
			       	 }
			       	 else{
			       	 	$(this).css({"width":bWidth+'px',"height":bHeight+'px'});
			       	 	getOrder($(this),false,bWidth,bHeight);}
			    });
			}
			initVar();//初始化
			rowObj.each(function(){
				var $this=$(this);
				var t;
				$(this).hover(function(e){
					    
					 	 if($(this).hasClass("inactive")){return true;}
					     else{
					 	 t=setTimeout(function(){
					 	    rowObj.find("img,br").remove();
					        rowObj.each(function(){
				              $(this).removeClass("inactive").addClass("normal").css({"width":bWidth+'px',"height":bHeight+'px'});
						      getOrder($(this),false,bWidth,bHeight);
					        });
					     
					           $this.addClass("inactive");
						       getHover($this);
					        },100); 
					     }
					       
				
			      },function(e){
				     e.stopPropagation();
				     clearTimeout(t);
                     $(this).stop(true,true); 
                   
			     });
			
			  });
			
			}
	//centerSlide 的切换 end
	
	//nav的slideDown
	$.fn.navSlideDown=function (){
		$(this).find(".nav-ol").hide().end().find("li").addClass("cursor");
		$(this).children("li:has(ol)").hover(function() {
             if ($(this).find("li").length > 0) {
                 $(this).children("ol").stop(true, true).slideDown();//下拉的速度
              }
       },function() {
            $(this).children("ol").stop(true, true).slideUp();
        });
		
	}
	
	//云工具img hover
	$.fn.imgHover=function(){
		 var oattr;
		 function imgHover(obj){
		 	oattr=obj.attr("src").toString().replace(/\.png/g,'');
		    obj.attr("src",oattr+"_active.png").next("h2").css({"color":"#008ce6"}).end().siblings("p").css({"color":"#313131"});
		 }
		 function imgInit(obj){
		 	oattr=obj.attr("src").toString().replace(/\_active.png/g,'');
		    obj.attr("src",oattr+".png").next("h2").css({"color":"#313131"}).end().siblings("p").css({"color":"#7b7b7b"});
		 }
		 $(this).children("div").find("img").hover(function(){
		 	    imgHover($(this));
		 	},function(){
		 		imgInit($(this));
		 	});
		 $(this).children("div").find("h2,p").hover(function(){
		  	  imgHover($(this).closest("div").children("img"));
		 },function(){
		 	  imgInit($(this).closest("div").children("img"));
		 });
	}
	
	$.fn.subHover=function(){
		$(this).hover(function(){
			$(this).find("h1,h2").css({"color":"#008ce6"}).end().find("p").css({"color":"#000"});
		},function(){
			$(this).find("h1,h2").css({"color":"#000"}).end().find("p").css({"color":"#7b7b7b"});
		})
	}
	
	//topbar的search
	/*
	$.fn.search=function(){
		$(this).focus(function(){
			$(this).val("").css({"color":"#ffffff","border":"#ffffff solid 1px"}).next().attr("src","img/search_hover.png");
		});
		$(this).blur(function(){
			if(!($(this).val())){
				$(this).val("搜索你想了解的");
			}
			$(this).css({"color":"#3d425c","border":"#008ce6 solid 1px"}).next().attr("src","img/search_normal.png");
		});
	};*/
	
	
	
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
	
	
	/*合作商图片slide start*/
	$.fn.imgSlide=function(){
		function getByClass(oParent,sClass){
	     var aEle=oParent.getElementsByTagName("*");
	     var aResult=[];
	     for(var i=0;i<aEle.length;i++){
		     if(aEle[i].className==sClass){
			      aResult.push(aEle[i]);
		     }
	     }
	     return aResult;
       }
       window.onload=function (){
	     var oDiv=document.getElementById("playimages");
	     var oBtnPrev=getByClass(oDiv,'small-prev')[0];
	     var oBtnNext=getByClass(oDiv,'small-next')[0];
	     var oMarkLeft=getByClass(oDiv,'mark_left')[0];
	     var oMarkRight=getByClass(oDiv,'mark_right')[0];
	
	    //左右按钮
	     oBtnPrev.onmouseover=oMarkLeft.onmouseover=function (){
		    startMove(oBtnPrev,'opacity',80);
		    startMove(oMarkLeft,'opacity',10);
	     }
	     oBtnPrev.onmouseout=oMarkLeft.onmouseout=function (){
		   startMove(oBtnPrev,'opacity',0);
		   startMove(oMarkLeft,'opacity',0);
	     }
	
	     oBtnNext.onmouseover=oMarkRight.onmouseover=function (){
		   startMove(oBtnNext,'opacity',80);
		   startMove(oMarkRight,'opacity',10);
	     }
	     oBtnNext.onmouseout=oMarkRight.onmouseout=function (){
		   startMove(oBtnNext,'opacity',0);
		   startMove(oMarkRight,'opacity',0);
	     }
	
	    var oDivSmall=getByClass(oDiv,'small_pic')[0];
	    var oUlSmall=oDivSmall.getElementsByTagName('ul')[0];
	    var aLiSmall=oDivSmall.getElementsByTagName('li');
	    var now=0;
	
	    oUlSmall.style.width=aLiSmall.length*aLiSmall[0].offsetWidth+'px';
	
       function tab(){
		    
			for(var i=0;i<aLiSmall.length;i++){
				startMove(aLiSmall[i],'opacity',60);
			}
			 startMove(aLiSmall[now],'opacity',100);
			
			
			if(now==0){
				startMove(oUlSmall,'left',0);
			}else if(now==aLiSmall.length-1){
				startMove(oUlSmall,'left',-(now-2)*aLiSmall[0].offsetWidth);
			}
			else{
				startMove(oUlSmall,'left',-(now-1)*aLiSmall[0].offsetWidth);
			}
	    }
	
	    oBtnPrev.onclick=function (){
		    now--;
		    if(now==-1){now=aLiSmall.length-1;}
		    tab();
	     }
	    oBtnNext.onclick=function (){
		    now++;
		    if(now==aLiSmall.length){now=0;}
		    tab();
	    }
	    var timer=setInterval(oBtnNext.onclick,3000);
	    oDiv.onmouseover=function (){
		    clearInterval(timer);
	    }
	    oDiv.onmouseout=function (){
		    timer=setInterval(oBtnNext.onclick,3000);
	    }
	
      }
	};
	/*合作商图片slide end*/
	
})(jQuery)