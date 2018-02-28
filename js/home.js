//封装选择器
var $ = function (selector) {
		var doms = document.querySelectorAll(selector),
			l = doms.length;
			if (l === 1) 
				return doms[0];
			else 
				return doms;
	}


//跨浏览器的事件处理程序
var EventUtil = {
	addHandler: function(element, type, handler) {
		if(element.addEventListener) {
			element.addEventListener(type, handler, false);
		}
		else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		}
		else{
			element["on" + type] = handler;
		}
	},
	removeHandler: function(element, type, handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		}
		else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		}
		else{
			element["on" + type] = null;
		}
	}
};




var lunbo = $('.lunbo');
var imgs  = lunbo.querySelectorAll('img');
var lbContainer = $('.lb-container');
var dians = $('.dian');
var arrL = $('.arr-left');
var arrR = $('.arr-right');
var index = 1;
var play = null;
var timer;


var animate =  function (offset) {
	var newLeft = parseInt(lbContainer.style.left) + offset;
	lbContainer.style.left = newLeft + 'px'; 
	if(newLeft > -720) {
		lbContainer.style.left = -2160 + 'px';
	}
	if(newLeft < -2160) {
		lbContainer.style.left = -720 + 'px';
	}
}


//箭头
var tLeft = function () {
	if(index == 1){
		index = 3;
	}
	else{
		index -= 1;
	}
	showButton();
	animate(-720);
}
var tRight = function() {
	if(index == 3){
		index = 1;
	}
	else{
		index += 1;
	}
	showButton();
	animate(720);
}
EventUtil.addHandler(arrL, "click", tLeft);

EventUtil.addHandler(arrR, "click", tRight);

//自动播放&&隐藏箭头
var autoPlay_hidArr = function() {
	timer = setInterval(function() {
		tRight();
	}, 2000);
	arrL.style.display = "none";
	arrR.style.display = "none";
}


//停止播放&&显示箭头
var stop_showArr = function () {
	clearInterval(timer);
	arrL.style.display = "block";
	arrR.style.display = "block";
}



//小圆点
var showButton = function() {
	for(var i = 0; i < dians.length; i++) {
		if(dians[i].className == "dian checked") {
			dians[i].className = "dian";
			break;
		}
	}
	dians[index - 1].className = "dian checked";
}

for(var i = 0; i < dians.length; i++) {
	dians[i].onclick = function() {
		if(this.className == 'dian checked'){
			return;
		}
		var myIndex = parseInt(this.getAttribute('index'));
		var offset = -720*(myIndex - index);
		animate(offset);
		index = myIndex;
		showButton();
	}
}
lunbo.onmouseover = stop_showArr;
lunbo.onmouseout  = autoPlay_hidArr;

autoPlay_hidArr();


//点击弹出遮罩层
var alertLogin = function() {
	var mask = $('.mask');
	mask.style.display = 'block';
}

var closeLogin = function () {
	var mask = $('.mask');
	mask.style.display = 'none';
}
//点击关闭遮罩层
var close = $('.close');
EventUtil.addHandler(close, 'click', closeLogin);














































