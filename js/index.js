window.onload = function()
{
	var oDiv = document.getElementById('div1');  //box容器
	var aA = document.getElementsByTagName('a');  //a标签集合

	for(var i = 0;i < aA.length;i++)  //每个a标签初始化
	{
		aA[i].time = null;  //每个a标签运动开始前暂停的计时器
		initialize(aA[i]);  //初始化每个标签,包括位置,大小,运动前暂停的时机,运动的速度
		aA[i].onmouseover = function()  //鼠标移入时暂停
		{
			this.pause = 0;
		};
		aA[i].onmouseout = function()  //鼠标移出时继续
		{
			this.pause = 1;
		};
	}
	setInterval(starMove,20);  //设置自动运动，

	//运动方法
	function starMove()
	{
		for(var i = 0;i < aA.length;i++)
		{
			if(aA[i].pause)  //为1时运动 每个0.02秒判断一次，
			{
				doMove(aA[i]);
			}
		}
	}
	function doMove(obj)
	{
		if(obj.offsetTop <= -obj.offsetHeight||obj.offsetLeft >= (obj.offsetWidth + oDiv.offsetWidth))  //到达最上层，每个标签的底部移到容器上边界之上
		{
			obj.style.top = oDiv.offsetHeight+"px";  //移动到最低部
			obj.style.left = "-200px";
			initialize(obj);  //再进行次初始化,重新随机获取
		}
		else
		{
			if(obj.iStatus == 0){
				obj.style.top = obj.offsetTop - obj.ispeed + "px";
			}
			else {
				obj.style.left = obj.offsetLeft + obj.ispeed + "px";
			}
		}
	}

	//修改每个a标签位置与大小
	function initialize(obj)
	{
		obj.iStatus = Math.round(Math.random());
		var scale = Math.random()*1+1;  //随机字体放大比例；来达到控制a标签的大小的随机
		var iTimer = parseInt(Math.random()*3000);  //获取随机0~1.5秒的暂停时间
		obj.pause = 0;  //每个a标签开始都是暂停的
		obj.style.fontSize = 12 * scale + 'px';  //设置字体大小

		if(obj.iStatus == 0){  //纵向运动
			var iLeft = parseInt(Math.random() * oDiv.offsetWidth);  //随机设置每个a标签的left，最大为box宽度
			if(iLeft > (oDiv.offsetWidth - obj.offsetWidth))  //判断是否超出右边框
			{
				obj.style.left = iLeft - obj.offsetWidth + "px";
			}
			else
			{
				obj.style.left = iLeft + "px";
			}
			obj.ispeed = Math.ceil(Math.random() * 3) + 1;  //每个a标签的速度随机
		}
		else {  //横向运动
			var iTop = parseInt(Math.random() * oDiv.offsetHeight);  //随机设置每个a标签的top，最大为box高度
			if(iTop > (oDiv.offsetHeight - obj.offsetHeight))  //判断是否超出下边框
			{
				obj.style.top = oDiv.offsetHeight - obj.offsetHeight + "px";
			}
			else
			{
				obj.style.top = iTop + "px";
			}
			obj.ispeed = Math.ceil(Math.random() * 5) + 1;  //每个a标签的速度随机

		}

		clearTimeout(obj.time);  //清除之前的计时器
		obj.time = setTimeout(function(){  //每个啊、标签随机暂停一会再出现，以此达到不同时间出现a标签的效果
			obj.pause = 1;  //开始运动
		},iTimer);
	}
};
