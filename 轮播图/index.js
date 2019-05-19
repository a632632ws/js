var l = document.querySelector(".l"),
    r = document.querySelector(".r"),
    uls = document.querySelector(".photo-item"),
    dotts = document.querySelector(".dotts"),
    liA = dotts.children,
    w = uls.children[0].offsetWidth,        //每个li 的宽度

    n = 0,  //图片下标
    timer2 = null, //右自动的定时器
    wrap = document.querySelector(".wrap");
    arr = document.querySelectorAll(".arr");


autoPlay ()           //一开始就让他自动
wrap.onmouseenter = function (){
    arr.forEach(function(element,i){       //两个参数 第一个是元素  第二个是下标

        element.style.display = "block";
    })
       clearInterval(timer2);
}
wrap.onmouseleave= function (){
    arr.forEach(function(element,i){       //两个参数 第一个是元素  第二个是下标
        element.style.display = "none";
    })
    autoPlay ()  ;
}

l.onclick = function () {
    if (n === 0){
        uls.style.left = -5 * w +"px";
        n = 5;
    }
    n--;
    var target = -n  *  w ;
    animat(uls,target);
    dottsClick (n);
}

r.onclick = function () {
    rClick ()
}


//封住一个 又点击的函数  因为等会自动还要用到 这个事件
function rClick (){
    if (n === 5){
        uls.style.left = 0+"px";
        n = 0;
    }
    n ++;
    var target = -n  *  w ;
    animat(uls,target);
    dottsClick (n);
}

//封装一个自动右点击
function autoPlay (){
    timer2 = setInterval(function(){
        rClick ();                  //前面封装的这里用到了;
    },2000)
}


//小圆点点击
for ( var i = 0; i < liA .length; i++){
    liA[i].index = i;
    liA[i].onclick = function (){
        n = this.index;
        dottsClick (n);
        var target = -n  *  w ;
        animat(uls,target);

    }
}






//封装一个图片移动的动画函数

function animat(obj,target){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var start = obj.offsetLeft;
        var step = (target - start) / 10;
        if(step<1&&step>0){
            step = 1;
        }else if(step>-1&&step<0){
            step = -1;
        }

        // if (step < 1) {
        //     step>0?Math.ceil(step):Math.floor(step);
        // }
        //修改元素位置
        obj.style.left = (start + step) + 'px';
        // console.log('left==>'+(leader+step));
        //终止条件
        if(target==start){obj
            //恢复位置
          obj.style.left = target+'px';
            clearInterval(obj.timer);
            console.log('结束了...');
        }
    },17);
}

//封装一个点击小圆点 改变颜色 act ;

function  dottsClick  (index){
    if (index == 5){
        index = 0;
    }
    var act = document.querySelector(".act");
    act.className = "";
    liA[index].className = "act";       //让点击的那个li 的下标 变颜色

}