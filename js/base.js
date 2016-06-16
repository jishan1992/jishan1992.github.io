'use strict'
//获取非行间样式
function getStyle(obj,name){
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}
//onready事件
function addEvent(obj,sEv,fn){
	obj.attachEvent?obj.attachEvent('on'+sEv,fn):obj.addEventListener(sEv,fn,false);
}
function DOMReady(fn){
	if(document.addEventListener){
		addEvent(document,'DOMContentLoaded',fn);
	}else{
		addEventListener(document,'readystatechange',fn);
	}
}
/*setStyle*/
function setStyle(obj,json){
	for(var name in json){
		obj.style[name]=json[name];
	}
}
//事件绑定
function addEvent(obj,sEv,fn){
	obj.attachEvent?obj.attachEvent('on'+sEv,fn):obj.addEventListener(sEv,fn,false);
}
//滚轮事件
function addWheel(obj,fn){
	function fnDir(ev){
		var oEvent=ev||event;
		var flag=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0
		fn(flag);
		obj.preventDefault&&obj.preDefault();
		return false;
	}
	if(window.navigator.userAgent.indexOf('Firefox')!=-1){
		addEvent(obj,'DOMMouseScroll',fnDir);
	}else{
		addEvent(obj,'mousewheel',fnDir)
	}
}
//getByClass
function getByClass(obj,sClass){
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(sClass);
	}else{
		var aResult=[];
		var re=new RegExp('\\b'+sClass+'\\b','g');
		var aEle=obj.getElementsByTagName('*');
		for(var i=0;i<aEle.length;i++){
			if(aEle[i].className.search(re)!=-1){
				aResult.push(aEle[i]);
			}
		}
		return aResult;
	}
}

/*getStyle*/
function getStyle(obj,sName){
	return (obj.currentStyle||getComputedStyle(obj,false))[sName];
}
