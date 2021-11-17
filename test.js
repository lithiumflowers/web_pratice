var timer = null,
	index = 0,
	img_count = 4,
	locatArr = [0, -720, -1440, -2160,-2880];
var box = document.getElementsByClassName('box')[0],
	dot = document.getElementsByClassName('dot')[0];

/**
*跳转到某张图片
*@function moveto
*@param location 索引值，具体位置存储在locatArr数组中
*@return none
*/
function moveto(location) {
	box.style.left = locatArr[location] + 'px';
}

/**
*图片展示函数，根据索引值到达相应地方
*@param none
*@return none
*/
function disPlay () {
	if(index == img_count - 1){
		moveto(0);
		index = 0;
	}else{
		moveto(++index);
	}
}

/**
*上一张/下一章图片
*@param none
*@return none
*/
function lastPlay () {
	if(index == 0){
		moveto(3);
		index = 3;
	}else{
		moveto(--index);
	}
}
function nextPlay () {
	if(index == 3){
		moveto(0);
		index = 0;
	}else{
		moveto(++index);
	}
}
/**
*绑定时间，包括小圆点、箭头的click事件
*@function bindEvent
*@param none
*@return none
*/
function bindEvent() {
	var li = dot.getElementsByTagName('li');
	var next = document.getElementsByClassName('next')[0];
	var last = document.getElementsByClassName('last')[0];
	next.addEventListener('click',function () {
		clearInterval(timer);
		nextPlay();
		timer = setInterval(disPlay,2000);
	});
	last.addEventListener('click',function() {
		clearInterval(timer);
		lastPlay();	
		timer = setInterval(disPlay,2000);
	});
	for(var i = 0; i < 4; i++){
		(function (j) {
			li[j].addEventListener('click',function () {
				clearInterval(timer);
				index = j;
				moveto(index);
				timer = setInterval(disPlay,2000);
			})
		}(i))
		
	}
}

function start() {
	timer = setInterval(disPlay,2000);
	let timerDot = setInterval(function () {
		let dots = document.getElementsByClassName('dot')[0];
		let singledot = dots.getElementsByTagName('li');
		for(var i = 0; i < 4; i++){
			singledot[i].className = '';
		}
		singledot[index].className = 'act';
	},20)
	bindEvent();
}

start();
