var $ = function(selector) {
	var doms = document.querySelectorAll(selector);
	var l = doms.length;
	if (l === 1) {
		return doms[0];
	}
	else{
		return doms;
	}
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



var list = $('section');
var lis = list.children; 
var timer;//存放定时器



//删除节点的函数
var removeNode = function (node) {
	node.parentNode.removeChild(node);
}

//赞、分享
var praiseBox = function(box, el) {
	var praiseElement = box.getElementsByClassName('praise-tol')[0];
	var oldTotal = parseInt(praiseElement.getAttribute('total'));
	var txt = el.innerHTML;
	var newTotal;
	if (txt == '赞') {
		newTotal = oldTotal + 1;
		praiseElement.innerHTML = newTotal == 1 ? '我觉得很赞' : '我和' + oldTotal + '个人觉得很赞';
		el.innerHTML = '取消赞';
	}
	else {
		newTotal = oldTotal - 1;
		praiseElement.innerHTML = newTotal == 0 ? '' : newTotal + '个人觉得很赞';
		el.innerHTML = '赞';
	}
	praiseElement.setAttribute('total', newTotal);
	praiseElement.parentNode.style.display = (newTotal == 0) ? 'none' : 'block';
}


//事件代理
for(var i = 0; i < lis.length; i++) {
	lis[i].onclick = function(e) {
		e = e || window.event;//兼容IE
		var el = e.srcElement;
		switch (el.className) {
			//删除按钮
			case 'delete':
				removeNode(el.parentNodse);
				break;
			//赞，分享
			case 'praise-pic pic-hover':
				praiseBox(el.parentNode.parentNode.parentNode.parentNode, el);
				break;
			//回复按钮灰色

		}
	}
	//输入框
	var textarea = lis[i].getElementsByTagName('textarea')[0];
		// console.log(textarea);
	textarea.onfocus = function() {
		this.parentNode.className = 'text-box text-box-on';
		this.value = this.value = '评论' ? '' : this.value;
		this.onkeyup();
		this.parentNode.parentNode.parentNode.style.height = '500px';
	}
	textarea.onblur = function () {
		var me = this;
		if (this.value == '') {
			timer = setTimeout(function() {
				me.parentNode.className = 'text-box';
				me.value = '评论';//
			}, 400)
		}
	}
	textarea.onkeyup = function () {
		var len = this.value.length;
		var p = this.parentNode;
		var btn = p.children[1];
		var word = p.children[2];
		if (len == 0 || len > 140) {
			btn.className = 'btn btn-off';
		}
		else {
			btn.className = 'btn';
		}
		word.innerHTML = len + '/140';
	}
	
}










































