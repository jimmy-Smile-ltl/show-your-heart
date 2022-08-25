/**
 * author:jimmy smile
 * e-mail:jimmysmileltl@163.com
 * thanks to:Space Galaxy Wallpaper NewTab - freeaddon.com
 *  一年四季的修饰
 * **/
// 背景图片  文字图片 内容
var temp_length=screen.availWidth>screen.availHeight?screen.availHeight:screen.availWidth;
 var spring={
    "BgImage" :"url('/img/spring.jpg')",// 背景图片
    "Image": "/img/word/word_spring.png",// 四季文字图片
    "text":"十里春风，怦然心动\n玫瑰绚丽，以表心迹",// 四季配文
    "blackImage":"/img/blackImage/sned_flower.png",//  中间位置图像
      // 文字颜色
      "textStyle":"animation: springShine 2s infinite; font-size:"+temp_length*0.05+"px;",
    // 中间图像 style
    "style":"position:fixed; transform:translate(-50%,-50%);top:50vh;left:50vw;width:"+temp_length*0.4+"px;height: "+temp_length*0.6+"px;"
  
 },
 summer={
    "BgImage" :"url('/img/summer.jpg')",
    "Image": "/img/word/word_summer.png",
    "text":"盛夏相交，携风浴雨\n深情相拥，不再离分",
    "blackImage":"/img/blackImage/hug_umbrella.png",
    "textStyle":"animation: summerShine 2s infinite; font-size:"+temp_length*0.05+"px;",
    "style":"position:fixed; transform:translate(-50%,-50%);top:60vh;left:50vw;width:"+temp_length+"px;height: "+temp_length+"px;"
},
 autumn={
    "BgImage":"url('/img/autumn.jpg')",
    "Image": "/img/word/word_autumn.png",
    "text":"一叶知秋，此心君知\n执子之手，共历前程",
    "blackImage":"/img/blackImage/handInHand.png",
    "textStyle":"animation: autumnShine 2s infinite; font-size:"+temp_length*0.05+"px;",
    "style":"position:fixed; transform:translate(-50%,-50%);top:70vh;left:55vw;width:"+temp_length*0.5+"px;height: "+temp_length*0.5+"px;"
   },
 winter={
    "BgImage": "url('/img/winter.jpg')",
    "Image": "/img/word/word_winter.png",
    "text":"风花雪月，情投意合\n钻石永恒，似那情义",
    "blackImage":"/img/blackImage/send_ring.png",
    "textStyle":"animation: winterShine 2s infinite; font-size:"+temp_length*0.05+"px;",
    "style":"position:fixed; transform:translate(-50%,-50%);top:60vh;left:50vw;width:"+temp_length*0.5+"px;height: "+temp_length*0.5+"px;"
   },
 end={
    "BgImage": "url('/img/universe.jpg')",
    "Image": "/img/word/word_end.png",
    "text":"终成眷侣，幸甚至哉\n烟火璀璨，以告四方",
    "blackImage":"/img/blackImage/wedding.png",
    "textStyle":" animation: endShine 2s infinite; font-size:"+temp_length*0.05+"px;",
    "style":"position:fixed; transform:translate(-50%,-50%);top:60vh;left:60vw;width:"+temp_length*0.8+"px;height: "+temp_length*0.8+"px;"
};

var id_Animation=null // 这个是防止requestAnimationFrame  一直在后台跑

// 这是有数组嵌套数组的情况
//  框架什么的，不懂,看样子是处理不同浏览器之间的兼容性的
window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e) {
        window.setTimeout(e, 1e3 / 24)
    }
}();

//  暂停动画，主要是切换效果是应该是暂停当前，在切换为新的
window.pausedAnimation = false;

// 表示现在是否正在播放烟花
var startedFireworks = false;

// 暂停播放烟花的方法
var stopFireworksCanvas = function () {
    // 这是在检查有没有 fireworks-canvas
    window.cancelAnimationFrame(id_Animation)
    var e = document.getElementById("fireworks-canvas");
    // 如果有就删除，这样那个烟花特效自然就消失是
    if (e)
        e.parentNode.removeChild(e);  // 执行删除
    // 重置一些全局属性
    startedFireworks = false;  // 不使用火花特效
    window.pausedAnimation = false;   // 特效不停顿
    console.log("stop-firework");
}
    ;
// 使用烟花特效
var startFireworksCanvas = function () {
    let season_img=document.getElementById("season_img")
    let season_txt=document.getElementById("season_txt")
    season_img.src=end.Image;
    // season_txt.innerText=end.text;
    season_txt.style=end.textStyle;
    printer(season_txt,end.text)
    var bg = document.getElementById("__bg");
    var temp_length = screen.availWidth > screen.availHeight ? screen.availHeight : screen.availWidth * 1.5;
    bg.innerHTML="<img src=\""+end.blackImage +"\" style=\""+end.style+"\">\
    <img src=\"/img/end_top_right.png\" style=\"width: "+temp_length*0.2+"px;height:"+temp_length*0.2+"px;position:fixed; top:0;right:0;\">\
    <img src=\"/img/end_bottom_right.png\" style=\"width: "+temp_length*0.2+"px;height:"+temp_length*0.2+"px;position:fixed; bottom: 0;right:0;\">\
    <img src=\"/img/end_bottom_left.png\" style=\"width: "+temp_length*0.2+"px;height:"+temp_length*0.2+"px;position:fixed; bottom: 0;left:0;\">"
   bg.style.backgroundImage = end.BgImage
    bgClassList()
    // 如果已经在使用烟花特效就直接结束，return结束这个方法的执行
    if (startedFireworks)
        return;
    // 声明正在使用烟花特性，与stop方法中最后重置变量呼应
    startedFireworks = true;
    // 同上，检查是否已经有了fireworks
    var e = document.getElementById("fireworks-canvas");
    if (e)
        e.parentNode.removeChild(e);
    // 确保没有fireworks-canvas的情况下，创建一个fireworks-canvas 对象
    e = document.createElement("canvas");
    e.id = "fireworks-canvas";
    e.style.zIndex = "5";
    e.style.display = "block";
    // 添加为body的子元素
    document.body.appendChild(e);
    // 下面是canvas的相关语法了
    var t = e.getContext("2d"), n = window.innerWidth, a = window.innerHeight, s = [], i = [], o = 120, r = 5, d = 0, h = 50, u = 0, c = false, l, p;
    e.width = n;  // 这是使得canvas的长宽与window相同，如此就能全屏显示了
    e.height = a;
    // 生成e到t之间的数，大小顺序不受影响
    function f(e, t) {
        return Math.random() * (t - e) + e
    }
    // 联系下面的m方法，这是算起点与重点间距离的
    function w(e, t, n, a) {
        var s = e - n
            , i = t - a;
        return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2))
    }
    function m(e, t, n, a) {
        this.x = e;   // 开始位置的x，y坐标
        this.y = t;
        this.sx = e;  // speed xy 运动速度
        this.sy = t;
        this.tx = n;  // target xy 目标点坐标
        this.ty = a;
        this.distanceToTarget = w(e, t, n, a); // 总距离
        this.distanceTraveled = 0; // 已经前进的距离，用于判断是否完成
        this.coordinates = [];
        this.coordinateCount = Math.floor(f(5, 10));  // 同时发射的烟花数量，考虑random代替
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y])
        }

        this.angle = Math.atan2(a - t, n - e);// 夹角大小
        this.speed = 2.5;//，前行速度
        this.acceleration = 1.1;  //类似于加速度，使得速度增大，speed*=acceleration
        this.brightness = f(50, 80);// 颗粒大小
        this.targetRadius = 1
    }
    m.prototype.update = function (e) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        // 越远，最后爆炸的圆圈越大
        if (this.targetRadius < 50) {
            this.targetRadius += 1
        } else {
            this.targetRadius = 1
        }
        this.speed *= this.acceleration; //加速
        var t = Math.cos(this.angle) * this.speed
            , n = Math.sin(this.angle) * this.speed;
        // 计算是否完成
        this.distanceTraveled = w(this.sx, this.sy, this.x + t, this.y + n);
        // 完成
        if (this.distanceTraveled >= this.distanceToTarget) {
            // 到达目的地 调用y方法 生成爆炸后的效果，30个子烟花
            y(this.tx, this.ty);
            s.splice(e, 1) // 清空s
        }
        // 没有完成，改变位置 
        else {
            this.x += t;
            this.y += n
        }
    }
        ;
    m.prototype.draw = function () {
        t.beginPath();
        t.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        t.lineTo(this.x, this.y);
        t.strokeStyle = "hsl(" + o + ", 100%, " + this.brightness + "%)";
        t.stroke();
        t.beginPath();
        t.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
        t.stroke()
    }
        ;
    // 生成烟花最后炸开的几个小烟花
    function v(e, t) {
        this.x = e;
        this.y = t;
        this.coordinates = [];
        this.coordinateCount = 5;
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y])
        }
        this.angle = f(0, Math.PI * 2);
        this.speed = f(1, 10);
        this.friction = .95;
        this.gravity = 1;
        this.hue = f(o - 50, o + 50);
        this.brightness = f(50, 80);
        this.alpha = 1;
        this.decay = f(.015, .03)
    }
    v.prototype.update = function (e) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;
        if (this.alpha <= this.decay) {
            i.splice(e, 1)
        }
    }
        ;
    v.prototype.draw = function () {
        t.beginPath();
        t.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        t.lineTo(this.x, this.y);
        t.strokeStyle = "hsla(" + this.hue + ", 100%, " + this.brightness + "%, " + this.alpha + ")";
        t.stroke()
    }
        ;
    // y 方法 调用v方法 生成爆炸后的子烟花
    function y(e, t) {
        // 生成30个子烟花
        var n = 30;
        while (n--) {
            i.push(new v(e, t))
        }
    }
    // main 主方法,调用执行，生成烟花
    function g() {
        // 暂停了就不执行
        if (window.pausedAnimation) {
            if (startedFireworks)
            id_Animation=  window.requestAnimFrame(g);
            return
        }
        o = f(0, 360);
        t.globalCompositeOperation = "destination-out";
        t.fillStyle = "rgba(0, 0, 0, 0.5)";
        t.fillRect(0, 0, n, a);
        t.globalCompositeOperation = "lighter";
        // 开始画,初始条件长度为零
        var e = s.length;
        while (e--) {
            s[e].draw();
            s[e].update(e)
        }
        var e = i.length;
        while (e--) {
            // 方法y 生成 是子烟花，最开始没有显示是因为没有达到触发条件
            i[e].draw();
            i[e].update(e)
        }

        if (u >= h) {
            if (!c) {
                if (s.length < 10) {
                    var w = f(1, 100);
                    // 看样子是没有10个要补足到10个，
                    // 也是初始条件，最开始的s i 两个都是空的，所以上面的调用是假调用
                    if (w < 10) {
                        s.push(new m(n / 2, a, f(n * 16 / 50, n * 18 / 50), f(a * 16 / 50, a * 18 / 50)));
                        s.push(new m(n / 2, a, f(n * 18 / 50, n * 20 / 50), f(a * 18 / 50, a * 20 / 50)));
                        s.push(new m(n / 2, a, f(n * 20 / 50, n * 22 / 50), f(a * 20 / 50, a * 22 / 50)));
                        s.push(new m(n / 2, a, f(n * 22 / 50, n * 24 / 50), f(a * 22 / 50, a * 24 / 50)));
                        s.push(new m(n / 2, a, f(n * 24 / 50, n * 26 / 50), f(a * 24 / 50, a * 26 / 50)));
                        s.push(new m(n / 2, a, f(n * 26 / 50, n * 28 / 50), f(a * 26 / 50, a * 28 / 50)));
                        s.push(new m(n / 2, a, f(n * 28 / 50, n * 30 / 50), f(a * 28 / 50, a * 30 / 50)));
                        s.push(new m(n / 2, a, f(n * 30 / 50, n * 32 / 50), f(a * 30 / 50, a * 32 / 50)));
                        s.push(new m(n / 2, a, f(n * 32 / 50, n * 34 / 50), f(a * 32 / 50, a * 34 / 50)))
                    } else if (w < 20) {
                        s.push(new m(n / 2, a, f(n * 32 / 50, n * 30 / 50), f(a * 16 / 50, a * 18 / 50)));
                        s.push(new m(n / 2, a, f(n * 30 / 50, n * 32 / 50), f(a * 18 / 50, a * 20 / 50)));
                        s.push(new m(n / 2, a, f(n * 28 / 50, n * 30 / 50), f(a * 20 / 50, a * 22 / 50)));
                        s.push(new m(n / 2, a, f(n * 26 / 50, n * 28 / 50), f(a * 22 / 50, a * 24 / 50)));
                        s.push(new m(n / 2, a, f(n * 24 / 50, n * 26 / 50), f(a * 24 / 50, a * 26 / 50)));
                        s.push(new m(n / 2, a, f(n * 22 / 50, n * 24 / 50), f(a * 26 / 50, a * 28 / 50)));
                        s.push(new m(n / 2, a, f(n * 20 / 50, n * 22 / 50), f(a * 28 / 50, a * 30 / 50)));
                        s.push(new m(n / 2, a, f(n * 18 / 50, n * 20 / 50), f(a * 30 / 50, a * 32 / 50)));
                        s.push(new m(n / 2, a, f(n * 16 / 50, n * 18 / 50), f(a * 32 / 50, a * 34 / 50)))
                    } else if (w < 30) {
                        s.push(new m(n / 2, a, f(n * 18 / 50, n * 20 / 50), f(a * 18 / 50, a * 20 / 50)));
                        s.push(new m(n / 2, a, f(n * 20 / 50, n * 22 / 50), f(a * 20 / 50, a * 22 / 50)));
                        s.push(new m(n / 2, a, f(n * 22 / 50, n * 24 / 50), f(a * 22 / 50, a * 24 / 50)));
                        s.push(new m(n / 2, a, f(n * 24 / 50, n * 26 / 50), f(a * 24 / 50, a * 26 / 50)));
                        s.push(new m(n / 2, a, f(n * 26 / 50, n * 28 / 50), f(a * 26 / 50, a * 28 / 50)))
                    } else if (w < 40) {
                        s.push(new m(n / 2, a, f(n * 22 / 50, n * 24 / 50), f(a * 22 / 50, a * 24 / 50)));
                        s.push(new m(n / 2, a, f(n * 24 / 50, n * 26 / 50), f(a * 24 / 50, a * 26 / 50)));
                        s.push(new m(n / 2, a, f(n * 26 / 50, n * 28 / 50), f(a * 26 / 50, a * 28 / 50)));
                        s.push(new m(n / 2, a, f(n * 28 / 50, n * 30 / 50), f(a * 28 / 50, a * 30 / 50)));
                        s.push(new m(n / 2, a, f(n * 30 / 50, n * 32 / 50), f(a * 30 / 50, a * 32 / 50)))
                    } else if (w < 50) {
                        s.push(new m(n / 2, a, f(n * 8 / 50, n * 30 / 50), f(a * 8 / 50, a * 30 / 50)));
                        s.push(new m(n / 2, a, f(n * 10 / 50, n * 32 / 50), f(a * 12 / 50, a * 32 / 50)));
                        s.push(new m(n / 2, a, f(n * 12 / 50, n * 34 / 50), f(a * 12 / 50, a * 34 / 50)));
                        s.push(new m(n / 2, a, f(n * 14 / 50, n * 36 / 50), f(a * 14 / 50, a * 36 / 50)));
                        s.push(new m(n / 2, a, f(n * 16 / 50, n * 38 / 50), f(a * 16 / 50, a * 38 / 50)));
                        s.push(new m(n / 2, a, f(n * 18 / 50, n * 40 / 50), f(a * 18 / 50, a * 40 / 50)));
                        s.push(new m(n / 2, a, f(n * 20 / 50, n * 42 / 50), f(a * 20 / 50, a * 42 / 50)));
                        s.push(new m(n / 2, a, f(n * 20 / 50, n * 42 / 50), f(a * 8 / 50, a * 30 / 50)));
                        s.push(new m(n / 2, a, f(n * 18 / 50, n * 40 / 50), f(a * 10 / 50, a * 32 / 50)));
                        s.push(new m(n / 2, a, f(n * 16 / 50, n * 38 / 50), f(a * 12 / 50, a * 34 / 50)));
                        s.push(new m(n / 2, a, f(n * 14 / 50, n * 36 / 50), f(a * 14 / 50, a * 36 / 50)));
                        s.push(new m(n / 2, a, f(n * 12 / 50, n * 34 / 50), f(a * 16 / 50, a * 38 / 50)));
                        s.push(new m(n / 2, a, f(n * 10 / 50, n * 32 / 50), f(a * 18 / 50, a * 40 / 50)));
                        s.push(new m(n / 2, a, f(n * 8 / 50, n * 30 / 50), f(a * 20 / 50, a * 42 / 50)));
                        s.push(new m(n / 2, a, f(n * 8 / 50, n * 30 / 50), f(a * 8 / 50, a * 30 / 50)));
                        s.push(new m(n / 2, a, f(n * 10 / 50, n * 32 / 50), f(a * 12 / 50, a * 32 / 50)));
                        s.push(new m(n / 2, a, f(n * 12 / 50, n * 34 / 50), f(a * 12 / 50, a * 34 / 50)));
                        s.push(new m(n / 2, a, f(n * 14 / 50, n * 36 / 50), f(a * 14 / 50, a * 36 / 50)));
                        s.push(new m(n / 2, a, f(n * 16 / 50, n * 38 / 50), f(a * 16 / 50, a * 38 / 50)));
                        s.push(new m(n / 2, a, f(n * 18 / 50, n * 40 / 50), f(a * 18 / 50, a * 40 / 50)));
                        s.push(new m(n / 2, a, f(n * 20 / 50, n * 42 / 50), f(a * 20 / 50, a * 42 / 50)));
                        s.push(new m(n / 2, a, f(n * 20 / 50, n * 42 / 50), f(a * 8 / 50, a * 30 / 50)));
                        s.push(new m(n / 2, a, f(n * 18 / 50, n * 40 / 50), f(a * 10 / 50, a * 32 / 50)));
                        s.push(new m(n / 2, a, f(n * 16 / 50, n * 38 / 50), f(a * 12 / 50, a * 34 / 50)));
                        s.push(new m(n / 2, a, f(n * 14 / 50, n * 36 / 50), f(a * 14 / 50, a * 36 / 50)));
                        s.push(new m(n / 2, a, f(n * 12 / 50, n * 34 / 50), f(a * 16 / 50, a * 38 / 50)));
                        s.push(new m(n / 2, a, f(n * 10 / 50, n * 32 / 50), f(a * 18 / 50, a * 40 / 50)));
                        s.push(new m(n / 2, a, f(n * 8 / 50, n * 30 / 50), f(a * 20 / 50, a * 42 / 50)))
                    }
                }
                s.push(new m(n / 2, a, f(n / 6, n * 5 / 6), f(a / 6, a * 5 / 6)));
                u = 0;
                h = f(40, 50)
            }
        } else {
            u++
        }
        if (d >= r) {
            if (c) {// 对应下方鼠标事件，鼠标按下，烟花朝鼠标而来
                s.push(new m(n / 2, a, l, p));
                d = 0
            }
        } else {
            d++
        }
        if (startedFireworks)
          id_Animation= window.requestAnimFrame(g)
    }
    // 鼠标事件处理
    e.addEventListener("mousemove", function (t) {
        l = t.pageX - e.offsetLeft;
        p = t.pageY - e.offsetTop
        // 计算鼠标位置
    });
    e.addEventListener("mousedown", function (e) {
        e.preventDefault();
        c = true
    });
    e.addEventListener("mouseup", function (e) {
        e.preventDefault();
        c = false
    });

    // g方法里面调用g 方法，无限回调，直至满足解释条件
    // 结束条件 c==false
    g()

}

    ;
var startedSnowCanvas = false;
var stopSnowCanvas = function () {
    var e = document.getElementById("snow-canvas-container");
    window.cancelAnimationFrame(id_Animation)
    window.cancelAnimationFrame(0)
    if (e)
        e.parentNode.removeChild(e);
    startedSnowCanvas = false;
    window.pausedAnimation = false
    console.log("stop-snow");
};
var startSnowCanvas = function (e) {
    let season_img=document.getElementById("season_img")
    let season_txt=document.getElementById("season_txt")
    season_img.src=winter.Image;
    season_txt.style=winter.textStyle;
    printer(season_txt,winter.text)
    //season_txt.innerText=winter.text;
    var bg = document.getElementById("__bg");
    bg.innerHTML= "<img src=\""+winter.blackImage +"\" style=\""+winter.style+"\">"
    bg.style.backgroundImage = winter.BgImage
    bgClassList()
    if (startedSnowCanvas)
        return;
    startedSnowCanvas = true;
    var t = "&#10052;"
        , n = "#efe"
        , a = 30;
    var s = 200 + Math.random() * 200; //个数
    if (e === "ball") {// 雪花形状
        t = "&#x2022;";
        n = "#bbb";
        a = 35;  // 大小
        s =200 + Math.random() * 200
    }
    var i = document.getElementById("snow-canvas-container");
    if (i)
        i.parentNode.removeChild(i);
    i = document.createElement("div");
    i.id = "snow-canvas-container";
    i.innerHTML = `<p class="snowflake" style="color:${n}">${t}</p>`;
    document.body.appendChild(i);
    var o = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];
    var r = l(o);
    var d = [];
    var h;
    var u;
    var c = false;
    function l(e) {
        for (var t = 0; t < e.length; t++) {
            if (typeof document.body.style[e[t]] != "undefined") {
                return e[t]
            }
        }
        return null
    }
    function p(e, t, n, s) {
        this.element = e;
        this.speed = t;
        this.xPos = n;
        this.yPos = s;
        this.counter = 0;
        this.sign = Math.random() < .5 ? 1 : -1;
        this.element.style.opacity = .3 + Math.random() * .5;
        this.element.style.fontSize = 10 + Math.random() * a + "px"
    }
    p.prototype.update = function () {
        this.counter += this.speed / 1e4;
        this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40;
        this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;
        f(this.element, Math.round(this.xPos), Math.round(this.yPos));
        if (this.yPos > u) {
            this.yPos = -50
        }
    }
        ;
    function f(e, t, n) {
        var a = "translate3d(" + t + "px, " + n + "px" + ", 0)";
        e.style[r] = a
    }
    function w() {
        var e = document.querySelector(".snowflake");
        var t = e.parentNode;
        h = screen.availWidth;
        u = screen.availHeight;
        for (var n = 0; n < s; n++) {
            var a = e.cloneNode(true);
            t.appendChild(a);
            var i = v(50, h);
            var o = v(50, u);
            var r = 10 + Math.random() * 40;
            var c = new p(a, r, i, o);
            d.push(c)
        }
        t.removeChild(e);
        m()
    }
    function m() {
        if (window.pausedAnimation) {
            if (startedSnowCanvas)
             id_Animation=   window.requestAnimFrame(m);
            return
        }
        for (var e = 0; e < d.length; e++) {
            var t = d[e];
            t.update()
        }
        if (c) {
            h = screen.availWidth;
            u = screen.availHeight;
            for (var e = 0; e < d.length; e++) {
                var t = d[e];
                t.xPos = v(50, h);
                t.yPos = v(50, u)
            }
            c = false
        }
        if (startedSnowCanvas)
         id_Animation=  window.requestAnimFrame(m)
    }
    function v(e, t) {
        return Math.round(e+Math.random() * (t- e))
    }
    function y(e) {
        c = true
    }
    window.removeEventListener("resize", y);
    window.addEventListener("resize", y, false);
    w()
};
var startedFlowersCanvas = false;
var stopFlowersCanvas = function () {
    window.cancelAnimationFrame(id_Animation)
    var e = document.getElementsByClassName("flower-scene");
    for (var t of e)
        t.parentNode.removeChild(t);
    startedFlowersCanvas = false;
    window.pausedAnimation = false

};
var startFlowersCanvas = function () {
    let season_img=document.getElementById("season_img")
    let season_txt=document.getElementById("season_txt")
    console.log(season_txt.style.fontSize)
    season_img.src=spring.Image;
    printer(season_txt,spring.text)
    // season_txt.innerText=spring.text;
    season_txt.style=spring.textStyle;

    var bg = document.getElementById("__bg");;
    bg.innerHTML= "<img src=\""+spring.blackImage +"\" style=\""+spring.style+"\">"
    bg.style.backgroundImage = spring.BgImage
    bgClassList()
    if (startedFlowersCanvas)
        return;
    startedFlowersCanvas = true;
    var e = document.getElementsByClassName("flower-scene");
    for (var t of e)
        t.parentNode.removeChild(t);
    var n = document.body;
    var a = document.createElement("div");
    var s = [];
    var i = {
        numFlowers: 50 + Math.random() * 20,
        wind: {
            magnitude: 1.2,
            maxSpeed: 12,
            duration: 100,
            start: 0,
            speed: 0
        }
    };
    var o = n.offsetWidth;
    var r = n.offsetHeight;
    var d = 0;
    var h = function (e) {
        e.el.style.backgroundImage = "url('/img/a-flower.png')";
        e.el.style.backgroundSize = "100%";
        e.el.style.backgroundRepeat = "no-repeat";
        var s = Math.floor(20 + Math.random() * 20)
        e.el.style.width = s + "px";
        e.el.style.height = s + "px";
        e.x = Math.random() * o * 1.75 - o;
        e.y = -10;
        e.z = Math.random() * 200;
        if (e.x < 0) {
            e.x = 10;
            e.y = Math.random() * r / 2
        }
        if (d == 0) {
            e.y = Math.random() * r
        }
        e.rotation.speed = Math.random() * 10;
        var s = Math.random();
        if (s > .5) {
            e.rotation.axis = "X"
        } else if (s > .25) {
            e.rotation.axis = "Y";
            e.rotation.x = Math.random() * 180 + 90
        } else {
            e.rotation.axis = "Z";
            e.rotation.x = Math.random() * 360 - 180;
            e.rotation.speed = Math.random() * 3
        }
        e.xSpeedVariation = Math.random() * .8 - .4;
        e.ySpeed = Math.random() + 1.5;
        return e
    };
    var u = function (e) {
        var t = i.wind.speed(d - i.wind.start, e.y);
        var n = t + e.xSpeedVariation;
        e.x += n;
        e.y += e.ySpeed;
        e.rotation.value += e.rotation.speed;
        var a = "translateX( " + e.x + "px ) translateY( " + e.y + "px ) translateZ( " + e.z + "px )  rotate" + e.rotation.axis + "( " + e.rotation.value + "deg )";
        if (e.rotation.axis !== "X") {
            a += " rotateX(" + e.rotation.x + "deg)"
        }
        e.el.style.webkitTransform = a;
        e.el.style.MozTransform = a;
        e.el.style.oTransform = a;
        e.el.style.transform = a;
        if (e.x < -10 || e.y > r + 10) {
            h(e)
        }
    };
    var c = function () {
        if (d === 0 || d > i.wind.start + i.wind.duration) {
            i.wind.magnitude = Math.random() * i.wind.maxSpeed;
            i.wind.duration = i.wind.magnitude * 50 + (Math.random() * 20 - 10);
            i.wind.start = d;
            var e = r;
            i.wind.speed = function (t, n) {
                var a = this.magnitude / 2 * (e - 2 * n / 3) / e;
                return a * Math.sin(2 * Math.PI / this.duration * t + 3 * Math.PI / 2) + a
            }
        }
    };
    var l = function () {
        // 生成花瓣子对象
        for (var e = 0; e < i.numFlowers; e++) {
            var t = {
                el: document.createElement("div"),
                x: 0,
                y: 0,
                z: 0,
                rotation: {
                    axis: "X",
                    value: 0,
                    speed: 0,
                    x: 0
                },
                xSpeedVariation: 0,
                ySpeed: 0,
                path: {
                    type: 1,
                    start: 0
                },
                image: 1
            };
            h(t);
            s.push(t);
            a.appendChild(t.el)
        }
        a.className = "flower-scene";
        n.appendChild(a);
        a.style.MozPerspective = "400px";
        a.style.oPerspective = "400px";
        a.style.perspective = "400px";
        var d = function (e) {
            o = n.offsetWidth;
            r = n.offsetHeight
        };
        window.removeEventListener("resize", d);
        window.addEventListener("resize", d)
    };
    var p = function () {
        if (window.pausedAnimation) {
            if (startedFlowersCanvas)
             id_Animation=   window.requestAnimFrame(p);
            return
        }
        c();
        for (var e = 0; e < s.length; e++) {
            u(s[e])
        }
        d++;
        if (startedFlowersCanvas)
          id_Animation=  window.requestAnimFrame(p)
    };
    l();
    p()
};
var startedRainCanvas = false;
var stopRainCanvas = function () {
    window.cancelAnimationFrame( id_Animation)
    var e = document.getElementById("raining-canvas");
    if (e)
        e.parentNode.removeChild(e);
    var t = document.getElementById("raining-footer");
    if (t)
        t.parentNode.removeChild(t);
    startedRainCanvas = false;
    window.pausedAnimation = false
    console.log("stop-rain");
};
var startRainCanvas = function () {
    let season_img=document.getElementById("season_img")
    let season_txt=document.getElementById("season_txt")
    season_img.src=summer.Image;
    season_txt.style=summer.textStyle;
    printer(season_txt,summer.text)
    // season_txt.innerText=summer.text;
    var bg = document.getElementById("__bg");;
    bg.innerHTML= "<img src=\""+summer.blackImage +"\" style=\"position:fixed; transform:translate(-50%,-50%);top:60vh;left:50vw;width: 30vh;height: 50vh;\">"
    
    bg.style.backgroundImage = summer.BgImage
    bgClassList()
    if (startedRainCanvas)
        return;
    startedRainCanvas = true;
    var e = document.getElementById("raining-canvas");
    if (e)
        e.parentNode.removeChild(e);
    e = document.createElement("canvas");
    e.id = "raining-canvas";
    e.style.zIndex = "5";
    e.style.display = "block";
    document.body.appendChild(e);
    var t = document.getElementById("raining-footer");
    if (t)
        t.parentNode.removeChild(t);
    t = document.createElement("div");
    t.id = "raining-footer";
    document.body.appendChild(t);
    e.width = window.innerWidth;
    e.height = window.innerHeight - 20;
    if (e.getContext) {
        var n = e.getContext("2d");
        var a = e.width;
        var s = e.height;
        n.strokeStyle = "rgba(174,194,224,0.6)";
        n.lineWidth = 1;
        n.lineCap = "round";
        var i = [];
        var o = 300 + Math.random() * 300;
        for (var r = 0; r < o; r++) {
            i.push({
                x: Math.random() * a,
                y: Math.random() * s,
                l: Math.random() * 2,
                xs: -6 + Math.random() * 2,
                ys: Math.random() * 5 + 15
            })
        }
        var d = [];
        for (var h = 0; h < o; h++) {
            d[h] = i[h]
        }
        function u() {
            for (var e = 0; e < d.length; e++) {
                var t = d[e];
                t.x += t.xs;
                t.y += t.ys;
                if (t.x > a || t.y > s) {
                    t.x = Math.random() * a;
                    t.y = -20
                }
            }
        }
        function c() {
            if (window.pausedAnimation) {
                if (startedRainCanvas)
                 id_Animation=   window.requestAnimFrame(c);
                return
            }
            n.clearRect(0, 0, a, s);
            for (var e = 0; e < d.length; e++) {
                var t = d[e];
                n.beginPath();
                n.moveTo(t.x, t.y);
                n.lineTo(t.x + t.l * t.xs, t.y + t.l * t.ys);
                n.stroke()
            }
            u();
            if (startedRainCanvas)
            id_Animation=   window.requestAnimFrame(c)
        }
        c()
    }
};
var startedLeavesCanvas = false;
var stopLeavesCanvas = function () {
    window.cancelAnimationFrame( id_Animation)
    var e = document.getElementsByClassName("leaf-scene");
    for (var t of e)
        t.parentNode.removeChild(t);
    startedLeavesCanvas = false;
    window.pausedAnimation = false
    console.log("stop-leaves");
};
var startLeavesCanvas = function () {
    let season_img=document.getElementById("season_img")
    let season_txt=document.getElementById("season_txt")
    season_img.src=autumn.Image;
    printer(season_txt,autumn.text)
    season_txt.style=autumn.textStyle;
   // season_txt.innerText=autumn.text;
    var bg = document.getElementById("__bg");
    bg.innerHTML= "<img src=\""+autumn.blackImage +"\" style=\""+autumn.style+"\">"
    bg.style.backgroundImage = autumn.BgImage;
    bgClassList()
    if (startedLeavesCanvas)
        return;
    startedLeavesCanvas = true;
    var e = document.getElementsByClassName("leaf-scene");
    for (var t of e)
        t.parentNode.removeChild(t);
    var n = document.body;
    var a = document.createElement("div");
    var s = [];
    var i = {
        numLeaves: 50 + Math.random() * 20,
        wind: {
            magnitude: 1.2,
            maxSpeed: 12,
            duration: 100,
            start: 0,
            speed: 0
        }
    };
    var o = n.offsetWidth;
    var r = n.offsetHeight;
    var d = 0;
    var h = function (e) {
        var t = ["#471c37", "#f55f20", "#fa8223", "#fd9a24", "#fbb124", "#fccf3e"];
        var n = window.leafColor;
        if (!n)
            n = t[Math.floor(Math.random() * t.length)];
        var a = window.btoa('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="100px" viewBox="1 0 100 100" enable-background="new 1 0 100 100" xml:space="preserve"><path fill="' + n + '" d="M31.5,77.2c0,0,2.6-1.9,3.4-2.8c0.8-0.9,2-2.5,2-2.5s-4.7-0.7-7.9-1.6c-3.2-0.9-9.7-3.7-9.7-3.7 s1.3-0.4,2.9-1.4c1.6-1.1,2-1.7,2-1.7s-4.7-1.3-7.5-2.4c-2.8-1-7.3-2.9-7.3-2.9s1.4-0.2,2.8-1.3c1.4-1.1,1.5-2.2,1.5-2.2 S9.4,53.3,7,51.9c-2.4-1.5-5.3-3.7-5.3-3.7s5.2-4,8.7-5.5c3.5-1.5,9.1-2.6,9.1-2.6s-0.9-1.5-2.1-2.6c-1.1-1.1-4.2-2.9-4.2-2.9 s5.6-1.9,8.3-2.5c2.7-0.6,8.2,0,8.2,0s-0.1-1.1-1.3-2.2c-1.2-1.1-2.7-2-2.7-2S33,25.4,37,24.4c4-1,10.8-0.6,10.8-0.6 S46.1,22.1,45,21c-1.1-1.1-2.7-2.3-2.7-2.3s5.4-0.4,9.1-0.4c3.7,0.1,9.5,1.1,9.5,1.1s-0.7-1-1.4-2.3c-0.8-1.3-1.5-2.6-1.5-2.6 s7.1,1.7,9.5,2.8c2.4,1,7.6,3.9,7.6,3.9s-0.1-1.8-1-3.5c-0.9-1.7-1.8-3-1.8-3s27.7,17.2,28.1,33.5c0.1,1.8-0.1,3.7-0.3,5.5 c-1.5-0.7-3.1-1.3-4.7-1.8c-2.3-6.3-4.3-9.9-6.4-12.6c-2.4-2.9-6.9-8-9.6-9.1c2.3,1.9,6.8,6.2,9.7,11.8c2.3,4.6,3,5.6,3.8,9.2 c-3.6-1.1-7.3-1.9-11-2.5c-0.7-0.1-1.4-0.2-2.1-0.3c-2-4.3-4.4-8.8-7.6-11.5c-3.7-3.2-8.3-6.7-11.1-7.5c2.6,1.5,8.7,6.8,11.8,10.9 c2.2,3,2.9,5.1,4,7.7c-5-0.6-9.9-0.9-14.9-1.1c-2-3.7-4.5-7.5-7.6-9.6c-3.4-2.4-7.6-5-10-5.5c2.3,1.1,7.9,5.1,10.8,8.3 c2.3,2.6,3,4.4,4.2,6.9c-11.1,0.4-22,1.7-32.8,3.6c9.4-0.8,18.9-1,28.3-0.6c-1.1,1.7-1.8,3-3.8,4.7c-2.6,2.2-7.5,4.5-9.5,4.9 c2,0.1,5.6-1.3,8.6-2.6c2.7-1.3,5.1-4.1,7.1-6.9c1.8,0.1,3.5,0.2,5.3,0.3c2.9,0.1,5.8,0.3,8.7,0.5c-1.4,3-2,5-4.6,8.1 c-3.1,3.6-9.1,8-11.6,9.2c2.7-0.4,7.2-3.3,10.8-5.9c3.3-2.4,6-6.8,8.1-11c2.7,0.3,5.4,0.6,8.1,1.1c2,0.3,3.9,0.7,5.9,1.2 c-1.9,4.1-2,4.6-5,8c-3.4,3.9-9.1,8.9-11.6,10.4c2.9-0.7,8.5-4.7,11.1-6.7c2.4-1.8,5.8-5.5,8.2-11.1c3,0.8,5.9,1.9,8.7,3.2 c-3.1,12.9-11.9,24.1-11.9,24.1s0.2-1.7-0.5-3.9c-0.8-2.2-1-2-1-2s-1.1,2.9-5,6.8c-3.9,3.9-8.9,5-8.9,5s0.7-1.1,0.8-2.4 c0.1-1.3-0.3-2-0.3-2s-2.6,1.9-5.3,3c-2.7,1.2-8.6,2.5-8.6,2.5s1.6-1.9,1.9-3c0.3-1-0.3-1.9-0.3-1.9s-3.9,1.5-7.5,1.5 c-3.6,0-7.7-1.5-7.7-1.5s1-0.5,1.7-1.8c0.8-1.3,0.2-1.9,0.2-1.9s-4.4,0.5-7.5,0.1C36.6,79.3,31.5,77.2,31.5,77.2z"/></svg>');
        e.el.style.backgroundImage = "url(data:image/svg+xml;base64," + a + ")";
        e.el.style.backgroundSize = "100%";
        e.el.style.backgroundRepeat = "no-repeat";
        e.x = o * 2 - Math.random() * o * 1.75;
        e.y = -10;
        e.z = Math.random() * 200;
        if (e.x > o) {
            e.x = o + 10;
            e.y = Math.random() * r / 2
        }
        if (d == 0) {
            e.y = Math.random() * r
        }
        e.rotation.speed = Math.random() * 10;
        var s = Math.random();
        if (s > .5) {
            e.rotation.axis = "X"
        } else if (s > .25) {
            e.rotation.axis = "Y";
            e.rotation.x = Math.random() * 180 + 90
        } else {
            e.rotation.axis = "Z";
            e.rotation.x = Math.random() * 360 - 180;
            e.rotation.speed = Math.random() * 3
        }
        e.xSpeedVariation = Math.random() * .8 - .4;
        e.ySpeed = Math.random() + 1.5;
        return e
    };
    var u = function (e) {
        var t = i.wind.speed(d - i.wind.start, e.y);
        var n = t + e.xSpeedVariation;
        e.x -= n;
        e.y += e.ySpeed;
        e.rotation.value += e.rotation.speed;
        var a = "translateX( " + e.x + "px ) translateY( " + e.y + "px ) translateZ( " + e.z + "px )  rotate" + e.rotation.axis + "( " + e.rotation.value + "deg )";
        if (e.rotation.axis !== "X") {
            a += " rotateX(" + e.rotation.x + "deg)"
        }
        e.el.style.webkitTransform = a;
        e.el.style.MozTransform = a;
        e.el.style.oTransform = a;
        e.el.style.transform = a;
        if (e.x < -10 || e.y > r + 10) {
            h(e)
        }
    };
    var c = function () {
        if (d === 0 || d > i.wind.start + i.wind.duration) {
            i.wind.magnitude = Math.random() * i.wind.maxSpeed;
            i.wind.duration = i.wind.magnitude * 50 + (Math.random() * 20 - 10);
            i.wind.start = d;
            var e = r;
            i.wind.speed = function (t, n) {
                var a = this.magnitude / 2 * (e - 2 * n / 3) / e;
                return a * Math.sin(2 * Math.PI / this.duration * t + 3 * Math.PI / 2) + a
            }
        }
    };
    var l = function () {
        for (var e = 0; e < i.numLeaves; e++) {
            var t = {
                el: document.createElement("div"),
                x: 0,
                y: 0,
                z: 0,
                rotation: {
                    axis: "X",
                    value: 0,
                    speed: 0,
                    x: 0
                },
                xSpeedVariation: 0,
                ySpeed: 0,
                path: {
                    type: 1,
                    start: 0
                },
                image: 1
            };
            h(t);
            s.push(t);
            a.appendChild(t.el)
        }
        a.className = "leaf-scene";
        n.appendChild(a);
        a.style.MozPerspective = "400px";
        a.style.oPerspective = "400px";
        a.style.perspective = "400px";
        var d = function (e) {
            o = n.offsetWidth;
            r = n.offsetHeight
        };
        window.removeEventListener("resize", d);
        window.addEventListener("resize", d)
    };
    var p = function () {
        if (window.pausedAnimation) {
            if (startedLeavesCanvas)
            id_Animation=     window.requestAnimFrame(p);
            return
        }
        c();
        for (var e = 0; e < s.length; e++) {
            u(s[e])
        }
        d++;
        if (startedLeavesCanvas)
        id_Animation=   window.requestAnimFrame(p)
    };
    l();
    p()
};

function createBg() {
    // 文字与图片
    var season_container=document.createElement("div")
    season_container.id="season_container"
    season_container.className="season_container";

    var season_img= document.createElement("img")
    season_img.id="season_img"
    season_container.appendChild(season_img)

   var season_txt=document.createElement("div")
   season_txt.className="season_txt"
   season_txt.id="season_txt"
   season_container.appendChild(season_txt)
   document.body.appendChild(season_container)
// 背景图片
    var bg = document.getElementById("__bg")
    if (!bg) {
        bg = document.createElement("div");
        bg.className = "background";
        bg.id = "__bg"
        document.body.appendChild(bg);
    }
    // bg.style.animationDuration = time / 1000;
    bg.style.animationTimingFunction = "ease-in-out";
}
function bgClassList() {
    var bg = document.getElementById("__bg");;
    let o = animations[Math.floor(animations.length * Math.random())].value;
    bg.classList = "background animated " + o;
    var I = bg.cloneNode(true);
    I.style.opacity = 0.4;
    I.classList="fadeInOut"
    document.body.appendChild(I);
    setTimeout(function () {
        document.body.removeChild(I)
    }, 1e3)
}
// 打字机
var print_speed=250
function printer(season_txt,context) {
    let n = 0
    var clock = setInterval(() => {
        n += 1
        season_txt.innerText =context.substring(0, n)
        season_txt.scrollIntoView({behavior: "instant", block: "end", inline: "nearest"})
        if (n >= context.length) {
            window.clearInterval(clock)
        }
    }, print_speed)

}

var animations = [{
    value: "fadeIn",
    text: "Fade-In"
}, {
    value: "pulse",
    text: "Pulse"
}, {
    value: "bounceInDown",
    text: "Bounce-In-Down"
}, {
    value: "bounceInLeft",
    text: "Bounce-In-Left"
}, {
    value: "bounceInRight",
    text: "Bounce-In-Right"
}, {
    value: "bounceInUp",
    text: "Bounce-In-Up"
}, {
    value: "fadeInDown",
    text: "Fade-In-Down"
}, {
    value: "fadeInLeft",
    text: "Fade-In-Left"
}, {
    value: "fadeInRight",
    text: "Fade-In-Right"
}, {
    value: "fadeInUp",
    text: "Fade-In-Up"
}, {
    value: "lightSpeedIn",
    text: "Flip-Speed-In"
}, {
    value: "rotateInDownLeft",
    text: "Rotate-In-Down-Left"
}, {
    value: "rotateInDownRight",
    text: "Rotate-In-Down-Right"
}, {
    value: "rotateInUpLeft",
    text: "Rotate-In-Up-Left"
}, {
    value: "rotateInUpRight",
    text: "Rotate-In-Up-Right"
}, {
    value: "rollIn",
    text: "Roll-In"
}, {
    value: "zoomIn",
    text: "Zoom-In"
}, {
    value: "slideInDown",
    text: "Slide-In-Down"
}, {
    value: "slideInLeft",
    text: "Slide-In-Left"
}, {
    value: "slideInRight",
    text: "Slide-In-Right"
}, {
    value: "slideInUp",
    text: "Slide-In-Up"
}];


function stopFourQuarter() {
    var season_container=document.getElementById("season_container")
    if(season_container){
        season_container.parentNode.removeChild(season_container)
    }
    var bg = document.getElementById("__bg");
    if (bg) {
        bg.parentNode.removeChild(bg);
    }

}



export var fourQuarterList = [
    {
        "start": createBg,
        "stop": stopFourQuarter,
        "childs": [
            {
                "start":startFlowersCanvas,
                "stop":stopFlowersCanvas,
                "timeout":1e4
            },
            {
                "start":startRainCanvas,
                "stop":stopRainCanvas,
                "timeout":1e4
            },
            {
                "start":startLeavesCanvas,
                "stop":stopLeavesCanvas,
                "timeout":1e4
            },
            {
                "start": startSnowCanvas,
                "stop": stopSnowCanvas,
                "timeout": 1e4
            },
            {
                "start": startFireworksCanvas,
                "stop": stopFireworksCanvas,
                "timeout": 1e4
            }],
        "timeout": 1e4// 这个timeout 没有意义了
    }
]
// 方法只适用于两层数组嵌套
// var index = 0
// var temp = null
// var sum=0  // 记录总的方法数量
// var childListNum=0
// var hasChild=false  //标记当前子原始是否是数组
// var startStopList_copy = startStopList
// function startStop(startStopList) {
//     if (index < startStopList.length) {
//         startStopList[index].start()
//         console.log("index: " + index)
//         if (startStopList[index].childs) { // 有子任务的处理
//             childListNum++;
//             hasChild=true;
//             temp = index;  // 储存index ,
//             console.log(index + "子元素有childs  长度为："+startStopList[index].childs.length)
//             index=0 // 刷新index 遍历子数组用
//             startStop(startStopList[temp].childs) // 遍历childs
//         }
//         else {
//             sum++
//             setTimeout(function () {
//                 startStopList[index].stop()
//                 index++
//                 startStop(startStopList)// 递归
//             }
//                 , startStopList[index].timeout)
//         }

//     }
//     // index超出数组长度，
//     //可能是执行完毕，
//     //也可能只是一个又child的子数组执行完毕
//     else {

//         // 子元素的child遍历完成后来到这里
//         // 回到父级元素
//         if ( hasChild=true) {
//             index = temp;
//             hasChild=false;
//             console.log("第" + index + "个元素迭代完毕")
//             startStopList_copy[index].stop()
//             index++
//             if(index<startStopList_copy.length){
//                 startStop(startStopList_copy)// 递归
//             }
//             else{
//                 console.log("全部执行完毕, 共有"+index+" 个子元素    "+sum+" 个元素")
//             }
            
//         }
//         else {
//             console.log("全部执行完毕, 共有"+index+" 个子元素    "+sum+" 个元素")
//         }


//     }
// }



// startStop(startStopList)
// startFourQuarter()