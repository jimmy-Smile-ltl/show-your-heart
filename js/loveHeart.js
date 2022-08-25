/***
 * 这个是做爱心用的
 * 关键内容在最后
 * 前面都是方法什么的，其实你也不用管
 */
/*Download by http://www.codefans.net*/
/*Download by http://www.codefans.net*/

/** 
----------------------




------------------------
*/
function Vector(a, b) {
    this.x = a;
    this.y = b
}
Vector.prototype = {
    rotate: function (b) {
        var a = this.x;
        var c = this.y;
        this.x = Math.cos(b) * a - Math.sin(b) * c;
        this.y = Math.sin(b) * a + Math.cos(b) * c;
        return this
    },
    mult: function (a) {
        this.x *= a;
        this.y *= a;
        return this
    },
    clone: function () {
        return new Vector(this.x, this.y)
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    subtract: function (a) {
        this.x -= a.x;
        this.y -= a.y;
        return this
    },
    set: function (a, b) {
        this.x = a;
        this.y = b;
        return this
    }
};
function Petal(a, f, b, e, c, d) {
    this.stretchA = a;
    this.stretchB = f;
    this.startAngle = b;
    this.angle = e;
    this.bloom = d;
    this.growFactor = c;
    this.r = 1;
    this.isfinished = false
}
Petal.prototype = {
    draw: function () {
        var a = this.bloom.garden.ctx;
        var e, d, c, b;
        e = new Vector(0, this.r).rotate(Garden.degrad(this.startAngle));
        d = e.clone().rotate(Garden.degrad(this.angle));
        c = e.clone().mult(this.stretchA);
        b = d.clone().mult(this.stretchB);
        a.strokeStyle = this.bloom.c;
        a.beginPath();
        a.moveTo(e.x, e.y);
        a.bezierCurveTo(c.x, c.y, b.x, b.y, d.x, d.y);
        a.stroke()
    },
    render: function () {
        if (this.r <= this.bloom.r) {
            this.r += this.growFactor;
            this.draw()
        } else {
            this.isfinished = true
        }
    }
};
function Bloom(e, d, f, a, b) {
    this.p = e;
    this.r = d;
    this.c = f;
    this.pc = a;
    this.petals = [];
    this.garden = b;
    this.init();
    this.garden.addBloom(this)
}
Bloom.prototype = {
    draw: function () {
        var c, b = true;
        this.garden.ctx.save();
        this.garden.ctx.translate(this.p.x, this.p.y);
        for (var a = 0; a < this.petals.length; a++) {
            c = this.petals[a];
            c.render();
            b *= c.isfinished
        }
        this.garden.ctx.restore();
        if (b == true) {
            this.garden.removeBloom(this)
        }
    },
    init: function () {
        var c = 360 / this.pc;
        var b = Garden.randomInt(0, 90);
        for (var a = 0; a < this.pc; a++) {
            this.petals.push(new Petal(Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max), Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max), b + a * c, c, Garden.random(Garden.options.growFactor.min, Garden.options.growFactor.max), this))
        }
    }
};
function Garden(a, b) {
    this.blooms = [];
    this.element = b;
    this.ctx = a
}
Garden.prototype = {
    render: function () {
        for (var a = 0; a < this.blooms.length; a++) {
            this.blooms[a].draw()
        }
    },
    addBloom: function (a) {
        this.blooms.push(a)
    },
    removeBloom: function (a) {
        var d;
        for (var c = 0; c < this.blooms.length; c++) {
            d = this.blooms[c];
            if (d === a) {
                this.blooms.splice(c, 1);
                return this
            }
        }
    },
    createRandomBloom: function (a, b) {
        this.createBloom(a, b, Garden.randomInt(Garden.options.bloomRadius.min, Garden.options.bloomRadius.max), Garden.randomrgba(Garden.options.color.rmin, Garden.options.color.rmax, Garden.options.color.gmin, Garden.options.color.gmax, Garden.options.color.bmin, Garden.options.color.bmax, Garden.options.color.opacity), Garden.randomInt(Garden.options.petalCount.min, Garden.options.petalCount.max))
    },
    createBloom: function (a, f, d, e, b) {
        new Bloom(new Vector(a, f), d, e, b, this)
    },
    clear: function () {
        this.blooms = [];
        this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    }
};
Garden.options = {
    petalCount: {
        min: 8,
        max: 15
    },
    petalStretch: {
        min: 0.1,
        max: 3
    },
    growFactor: {
        min: 0.1,
        max: 1
    },
    bloomRadius: {
        min: 8,
        max: 10
    },
    density: 10,
    growSpeed: 1000 / 60,
    color: {
        rmin: 128,
        rmax: 255,
        gmin: 0,
        gmax: 128,
        bmin: 0,
        bmax: 128,
        opacity: 0.1
    },
    tanAngle: 60
};
Garden.random = function (b, a) {
    return Math.random() * (a - b) + b
}
    ;
Garden.randomInt = function (b, a) {
    return Math.floor(Math.random() * (a - b + 1)) + b
}
    ;
Garden.circle = 2 * Math.PI;
Garden.degrad = function (a) {
    return Garden.circle / 360 * a
}
    ;
Garden.raddeg = function (a) {
    return a / Garden.circle * 360
}
    ;
Garden.rgba = function (f, e, c, d) {
    return "rgba(" + f + "," + e + "," + c + "," + d + ")"
}
    ;
Garden.randomrgba = function (i, n, h, m, l, d, k) {
    var c = Math.round(Garden.random(i, n));
    var f = Math.round(Garden.random(h, m));
    var j = Math.round(Garden.random(l, d));
    var e = 5;
    if (Math.abs(c - f) <= e && Math.abs(f - j) <= e && Math.abs(j - c) <= e) {
        return Garden.rgba(i, n, h, m, l, d, k)
    } else {
        return Garden.rgba(c, f, j, k)
    }
}
    ;
/** 
----------------------

下面就比较重要了


------------------------
*/


/*Download by http://www.codefans.net*/
var gardenCtx, gardenCanvas, garden, offsetX, offsetY, loveHeart


// 创建心形元素与容器，并指定位置
function createLoveU() {
    var loveHeart = document.getElementById("loveHeart");
    if (loveHeart) {
        return
    }
    else {
        let temp_length = screen.availWidth > screen.availHeight ? screen.availHeight : screen.availWidth;
        console.log("爱心绘画开始")
        loveHeart = document.createElement("div")

        loveHeart.id = "loveHeart";
        gardenCanvas = document.createElement("canvas");
        gardenCanvas.id = "garden";
        loveHeart.appendChild(gardenCanvas)
        document.body.insertBefore(loveHeart, document.body.childNodes[0])
        var rosepng=document.createElement("div")
        rosepng.id="rosepng";
        rosepng.style="width:"+temp_length*0.5+"px;height:"+temp_length*0.6+"px;"
        document.body.appendChild(rosepng)
        if( screen.availWidth > screen.availHeight){
            loveHeart.style="width:"+temp_length+"px;height:"+temp_length+"px;";
        }
        else{
            loveHeart.style="width:"+temp_length+"px;height:"+temp_length*1.8+"px;";
        }
    }

}

function render() {
    var loveHeart = document.getElementById("loveHeart")
    var gardenCanvas = document.getElementById("garden")
// 电脑
        gardenCanvas.width =  loveHeart.clientWidth;   // 这两行 很重要 删除的话 图形只能显示一部分
        gardenCanvas.height = loveHeart.clientHeight; 
    

//  注意width不是 style 是属性
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
    setInterval(function () {
        garden.render()
    }, Garden.options.growSpeed)
};
function getHeartPoint(c) {
    let temp_length = screen.availWidth > screen.availHeight ? screen.availHeight : screen.availWidth;
    // 他这个是按照容器长宽650设计 a, d 部分a d绝对值在300以上 无法调整大小
    var b = c / Math.PI;
    var a = 19.5 * (16 * Math.pow(Math.sin(b), 3));
    var d = -20 * (13 * Math.cos(b) - 5 * Math.cos(2 * b) - 2 * Math.cos(3 * b) - Math.cos(4 * b));
    if (Math.abs(a) > 300 || Math.abs(d) > 300) {
        // console.log("a: " + a + "d:  " + d)
    }
    // 调整这个就是在调整爱心 不同点的位置， 调整比例可以减少四周空白
    if(screen.availWidth > screen.availHeight){
        return new Array( offsetX  + a * (temp_length /700), offsetY-40  + d * (temp_length / 700))// 缩小适配
    }
    else{
        return new Array( offsetX  + a * (temp_length /700), offsetY+ d * (temp_length /400))// 缩小适配
    }

}




function printer(heart_div, heart_txt) {
    var print_speed = 250
    var print_speedB=30
    let n = 0
    var clock = setInterval(() => {
        n += 1;
        if (heart_txt.charAt(n) === "<") {
            console.log(print_speed)
            var clockB = setInterval(() => {
                n +=1
                heart_div.innerHTML = heart_txt.substring(0, n)
                if (heart_txt.charAt(n) === ">") {
                    window.clearInterval(clockB)
                }
            }, print_speedB)
            
        }
    
        heart_div.innerHTML = heart_txt.substring(0, n)
        heart_div.scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" })
        if (n >= heart_txt.length) {
            window.clearInterval(clock)
        }
    }, print_speed)

}

var heart_txt = "<div id='text_title'> 凤求凰</div> \
<div id='text_author'>司马相如</div>\
<p id='text_ctx'>有一美人兮，见之不忘。<br>\
一日不见兮，思之如狂。<br>\
凤飞翱翔兮，四海求凰。<br>\
无奈佳人兮，不在东墙。<br>\
将琴代语兮，聊写衷肠。<br>\
何时见许兮，慰我彷徨。<br>\
愿言配德兮，携手相将。<br>\
不得於飞兮，使我沦亡。</p>"


export function startHeartAnimation() {
    createLoveU();
    render()
    var bgImages = document.createElement("div")
    bgImages.id = "bgImages"
    document.body.appendChild(bgImages)
    var temp_length = screen.availWidth > screen.availHeight ? screen.availHeight : screen.availWidth * 1.5;
    bgImages.innerHTML = "  <img src=\"/img/heart_TL.png\" style=\"width:" + temp_length * 0.35 + "px;height: " + temp_length * 0.3 + "px;position:fixed; top:0;left:0;animation:hiddenAPeriod 2s;\">\
                     <img src=\"/img/jupiter.png\" style=\"width:"+ temp_length * 0.15 + "px;height: " + temp_length * 0.15 + "px;position:fixed; top:0;right:0;animation:hiddenAPeriod 3s;\">\
                    <img src=\"/img/heart_BR.png\" style=\"width:"+ temp_length * 0.3 + "px;height: " + temp_length * 0.3 + "px;position:fixed; bottom: 0;right:0;animation:hiddenAPeriod 4s;\">\
                    <img src=\"/img/heart_BL.png\" style=\"width:"+ temp_length * 0.3 + "px;height: " + temp_length * 0.45 + "px;position:fixed; bottom: 0;left:0;animation:hiddenAPeriod 1s;\">\
                        <img src=\"/img/loveHeartBg.jpg\"  class='background'>";

    var text_div = document.createElement("div")
    text_div.id = "text_div";
    document.body.appendChild(text_div)
    text_div.style = "width:" + temp_length * 0.6 + "px;height: " + temp_length * 0.6 + "px;font-size:" + temp_length / 40 + "px;line-height:1.2em;"
    printer(text_div, heart_txt)

    var c = 50;
    var d = 10;
    var b = new Array();
    loveHeart = document.getElementById("loveHeart")
    offsetX =  loveHeart.clientWidth / 2;
    offsetY =  loveHeart.clientHeight / 2 -20;
    var a = setInterval(function () {
        var h = getHeartPoint(d);
        var e = true;
        for (var f = 0; f < b.length; f++) {
            var g = b[f];
            var j = Math.sqrt(Math.pow(g[0] - h[0], 2) + Math.pow(g[1] - h[1], 2));
            if (j < Garden.options.bloomRadius.max * 1.3) {
                e = false;
                break
            }
        }
        if (e) {
            b.push(h);
            garden.createRandomBloom(h[0], h[1])
        }
        if (d >= 30) {
            clearInterval(a);

        } else {
            d += 0.2
        }
    }, c)
}

export function stopHeartAnimation() {
    console.log("爱心绘画结束")
    // loveHeart = document.getElementById("loveHeart");
    // if (loveHeart) {
    //     loveHeart.parentNode.removeChild(loveHeart)// 移除
    //     console.log("爱心绘画结束")
    // }
    // else return

}

export var loveHeartList =
    [
        {
            "start": startHeartAnimation,
            "stop": stopHeartAnimation,
            "timeout": 1e4
        }
    ]
