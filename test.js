var timer = null,
	timerInv = null,
	index = 0,
	img_count = 5,
	locatArr = [0, -720, -1440, -2160,-2880];
var box = document.getElementsByClassName('box')[0],
	dot = document.getElementsByClassName('dot')[0];

/**
*轮播图片展示函数(最新，利用CSS3)，根据索引值到达相应地方
*@param none
*@return none
*/
function disPlay () {
	let initLeft = parseInt(window.getComputedStyle(box).left);
	if(index == img_count - 1){
		moveTo(0);
		index = 0;
	}else{
		moveTo(++index);
	}
}

/**
*上一张/下一章图片
*Function lastPlay/nextPlay
*@param none
*@return none
*/
function lastPlay () {
	if(index == 0){
		moveTo(4);
		index = 4;
	}else{
		moveTo(--index);
	}
}
function nextPlay () {
	if(index == 4){
		moveTo(0);
		index = 0;
	}else{
		moveTo(++index);
	}
}
/**
*绑定时间，包括小圆点、箭头的click事件
*@function bindEvent
*@param none
*@return none
*/
function bindEvent() {
	let li = dot.getElementsByTagName('li');
	let next = document.getElementsByClassName('next')[0];
	let last = document.getElementsByClassName('last')[0];
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
	for(var i = 0; i < 5; i++){
		(function (j) {
			li[j].addEventListener('click',function () {
				clearInterval(timer);
				index = j;
				moveTo(index);
				timer = setInterval(disPlay,2000);
			})
		}(i))
		
	}
}
/**
*跳转到某张图片
*@function moveTo
*@param location 索引值，具体位置存储在locatArr数组中
*@return none
*/
function moveTo(location) {
	var target_position = parseInt(window.getComputedStyle(box).left) - locatArr[location];
	box.style.left = locatArr[location] + 'px';
}
function start() {

	timer = setInterval(disPlay,2000);
	var timerDot = setInterval(function () {
		var dots = document.getElementsByClassName('dot')[0];
		var singledot = dots.getElementsByTagName('li');
		for(var i = 0; i < 5; i++){
			singledot[i].className = '';
		}
		singledot[index].className = 'act';

	},20)
	bindEvent();
}

start();
	
