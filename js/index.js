
//滚轮事件
function toPage(){
	var oRight=document.getElementById('right');
	var aLi=oRight.getElementsByTagName('li');
	var aA=oRight.getElementsByTagName('a');
	var oBox=document.getElementById('box');
	var aDiv=getByClass(oBox,'page');
	var oBg=document.getElementById('bg');
	var cH=document.documentElement.clientHeight;
	var cW=document.documentElement.clientWidth;
	var oNav=document.getElementById('nav');
	var oNav_div=document.getElementById('nav-div');
	
	//nav导航栏
	startMove(oNav,{ top:0},{ duration:2500,easing:'linear'});
	if(cW<640 || cH<600){
			
	}else{
		toAddwheel();
	}
	//判断导航栏的宽度
		if(cW<640){
			oBox.style.position="relative";
			right.style.display='none';
			oNav_div.innerHTML='&#xe63f; <div class="clearfix">'
								+'<a href="javascript:;">首页</a>'
								+'<a href="javascript:;">关于</a>'
								+'<a href="javascript:;">作品</a>'
								+'<a href="javascript:;">联系</a>'
							+'</div>';
			var oDiv4=oNav_div.getElementsByTagName('div')[0];
			
			if(getStyle(oDiv4,'display')=='block'){
				oDiv4.style.display='block';
				oDiv4.style.width=cW+'px';
		}else{
			oNav_div.onclick=function(){
				if(getStyle(oDiv4,'display')=='none'){
					oDiv4.style.display='block';
					oDiv4.style.width=cW+'px';
				}else{
					oDiv4.style.display='none';
				}
			};
		}
		
	}else{
		oBox.style.position="fixed";
		right.style.display='block';
		oNav_div.innerHTML='<div class="clearfix">'
								+'<a href="javascript:;">首页</a>'
								+'<a href="javascript:;">关于</a>'
								+'<a href="javascript:;">作品</a>'
								+'<a href="javascript:;">联系</a>'
							+'</div>';
						
		
	}
	
	var index=0;
	var iNum=0;
	for(var i=0;i<aDiv.length;i++){
		aDiv[i].style.width=cW+'px';
		aDiv[i].style.height=cH+'px';
	}
	
	function toAddwheel(){
		addWheel(oBox,function(flag){
			if(flag){
				index++;
				if(index>aDiv.length-1){
					index=0;
				}
			}else{
				index--;
				if(index<0){
					index=0;
				}
			}
			for(var i=0;i<aA.length;i++){
				aA[i].className='';
			}
			oBg.style.zIndex=8;
			startMove(oBg,{opacity:1},{duration:1000,complete:function(){
				startMove(oBg,{opacity:0},{complete:function(){
					oBg.style.zIndex=-1;
				}});
				oBox.style.top=-index*cH+'px';
			}});
			
			aA[index].className='on';
		});
	}
	
	for(var i=0;i<aA.length;i++){
		if(aA[i].className=='on'){
			oBox.style.top=-i*cH+'px';
		}
	}
	for(var i=0;i<aLi.length;i++){
		;(function(index){
			aLi[i].onclick=function(){
				for(var i=0;i<aLi.length;i++){
					aA[i].className='';
				}
				aA[index].className='on';
				startMove(oBg,{opacity:1},{duration:1000,complete:function(){
					oBg.style.zIndex=9;
					startMove(oBg,{opacity:0},{complete:function(){
						oBg.style.zIndex=-1;
					}});
					oBox.style.top=-index*cH+'px';
				}});
			};
		})(i);
	}
}

//无缝滚动运动
function toMove1(obj,iTarget,w,left){
	var start=left;
	var dis=iTarget-start;
	var count=Math.floor(800/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		var a=1-n/count;
		left=start+dis*(1-Math.pow(a,3));
		if(left<0){
			obj.style.left=left%w+'px';
		}else{
			obj.style.left=-w+left%w+'px';
		}
		if(n==count){
			clearInterval(obj.timer);
		}
	},30);
}


//轮播图自适应屏幕
function toSize(index){
	if(index>=0){
		index%=3;
	}else{
		index=(index%3+3)%3;
	}
	var oDiv1=document.getElementById('page0');
	var oUl=oDiv1.getElementsByTagName('ul')[0];
	var oA1=oDiv1.getElementsByTagName('a')[0];
	var oA2=oDiv1.getElementsByTagName('a')[1];
	var aLi=oDiv1.getElementsByTagName('li');
	var cW=document.documentElement.clientWidth;
	var cH=document.documentElement.clientHeight;
	var left=0;
	var timer1=null;
	
	var oInput=document.getElementById('text');

	for(var i=0;i<aLi.length;i++){
		aLi[i].style.width=cW+'px';
		aLi[i].style.height=cH+'px';
	}
	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
	oUl.style.left=-aLi[0].offsetWidth*index+'px';
	oA2.onclick=function(){
		index=parseInt(oInput.value);
		index++;
		oInput.value=index;
		left = -aLi[0].offsetWidth*(index-1);
		console.log("xxxx",oInput.value,left,oUl.offsetLeft);
		toMove1(oUl,-aLi[0].offsetWidth*index,oUl.offsetWidth/2,left);
	};
	oA1.onclick=function(){
		index=parseInt(oInput.value);
		index--;
		oInput.value=index;
		left = -aLi[0].offsetWidth*(index+1);
		console.log("xxxx",oInput.value,left,oUl.offsetLeft);
		toMove1(oUl,-aLi[0].offsetWidth*index,oUl.offsetWidth/2,left);
	};

	if(cW<480){
		
	}
}

//page0自动无缝轮播
function toAuto(index){
	var oDiv1=document.getElementById('page0');
	var oUl=oDiv1.getElementsByTagName('ul')[0];
	var oA1=oDiv1.getElementsByTagName('a')[0];
	var oA2=oDiv1.getElementsByTagName('a')[1];
	var aLi=oDiv1.getElementsByTagName('li');
	var cW=document.documentElement.clientWidth;
	var cH=document.documentElement.clientHeight;
	var oInput=document.getElementById('text');
	var timer1=null;
	
	
	function show(){
		timer1=setInterval(function(){
			index=parseInt(oInput.value);
			index++;
			oInput.value=index;
			left = -aLi[0].offsetWidth*(index-1);
			console.log("xxxx",oInput.value,left,oUl.offsetLeft);
			toMove1(oUl,-aLi[0].offsetWidth*index,oUl.offsetWidth/2,left);
		},5000);
	}
	show();
	oDiv1.onmouseenter=function(){
		clearInterval(timer1);
		startMove(oA1,{ opacity:1});
		startMove(oA2,{ opacity:1});
	};
	
	oDiv1.onmouseleave=function(){
		clearInterval(timer1);
		show();
		startMove(oA1,{ opacity:0});
		startMove(oA2,{ opacity:0});
	};
	
	return index;
}
window.onresize=function(){
	var oDiv1=document.getElementById('page0');
	var oUl=oDiv1.getElementsByTagName('ul')[0];
	var aLi=oDiv1.getElementsByTagName('li');
	var oInput=document.getElementById('text');
	var n=parseInt(oInput.value);
	toPage();
	toSize(n);
	
};

DOMReady(function(){
	var oDiv1=document.getElementById('page0');
	var oUl=oDiv1.getElementsByTagName('ul')[0];
	var aLi=oDiv1.getElementsByTagName('li');
	oUl.innerHTML+=oUl.innerHTML;
	/*var oInput=document.getElementById('text');
	var index=parseInt(oInput.value);*/
	var index=0;
	toAuto(index);
	toSize(index);
	toPage();
	
});

