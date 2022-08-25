// 这是画线与爱心
var id=null;
export function startLineHeart(){
var canvas = document.createElement("canvas")
canvas.id = "lineHeartanvas";
canvas.width = "1356px"
canvas.height = "880px"
canvas.style = "width:100%;height:100vh;"
document.body.appendChild(canvas)
var ctx = canvas.getContext("2d");

// 这是canvas之外的 -添加按钮 -图像等
var lineHeartComtianr = document.createElement("div")
lineHeartComtianr.id="lineHeartComtianr"
document.body.appendChild(lineHeartComtianr)

var height = void 0, width = void 0, innerpoints = [], outerpoints = [], particles = [];

var noofpoints = 200, trashold = 10;
var x = void 0, y = void 0, p = void 0, n = void 0, point = void 0, dx = void 0, dy = void 0, color = void 0;
var deltaangle = Math.PI * 2 / noofpoints,
    r = Math.min(height, width) * 0.5;
 
// 计算两点之间距离
var distance = function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
};

var mapVal = function mapVal(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

// load 之时就会自动执行， 调整尺寸， 同时自动生成爱心上的点，再画线
var resize = function resize() {
  height = ctx.canvas.clientHeight;
  width = ctx.canvas.clientWidth;

  if (ctx.canvas.clientWidth !== canvas.width ||
    ctx.canvas.clientHeight !== canvas.height) {
    console.log("resized");
    // 大小调整
    canvas.width = width;
    canvas.height = height;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI);
    innerpoints = [];
    // r 很麻烦 电脑  手机适配需要他
    r = width > height ? Math.floor(width / 80) : Math.floor(width / 40)
    console.log("r:   " + r)
    // 重新计算相关坐标点 爱心函数  
    for (var i = deltaangle; i <= Math.PI * 2; i += deltaangle) {
      x = r * 16 * Math.pow(Math.sin(i), 3);
      y = r * (13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
      innerpoints.push({
        x: x,
        y: y
      });

      // 扩大10倍  
      x = 10 * r * 16 * Math.pow(Math.sin(i), 3);
      y = 10 * r * (13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
      outerpoints.push({
        x: x,
        y: y
      });


      var step = random(0.002, 0.004, true);
      particles.push({
        step: step,
        x: x,
        y: y
      });

    }
  }

};
var random = function random(min, max, isFloat) {
  if (isFloat) {
    return Math.random() * (max - min) + min;
  }
  return ~~(Math.random() * (max - min) + min);
};
// 先调整大小


//particles = [...outerpoints];
ctx.globalAlpha = 0.4;
// 后面画的图放在上面
ctx.globalCompositeOperation = 'source-over';
var draw = function draw() {
  // 背景颜色 很奇特
  //  ctx.globalAlpha = 0.5;  最后的0.01 失效
  ctx.fillStyle = "rgba(226,200,201,0.01)";
  // 注意这个尺寸  ,屏幕的3倍  所以理论上  不能完全显示  只显示一部分
  ctx.fillRect(-width, -height, width * 2, height * 2);
  ctx.beginPath();
  var s,d;
  for (var i = 0; i < innerpoints.length; i++) {
    s = outerpoints[i];
    d = innerpoints[i];
    point = particles[i];

    if (distance(point.x, point.y, d.x, d.y) > 10) {
      dx = d.x - s.x;
      dy = d.y - s.y;

      point.x += dx * point.step;
      point.y += dy * point.step;
      color = distance(0, 0, point.x, point.y);
      ctx.beginPath();
      ctx.fillStyle = "hsl(" + color % 360 + ",100%,50%)";
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    } else {
      point.x = d.x;
      point.y = d.y;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
      particles[i].x = s.x;
      particles[i].y = s.y;
      particles[i].step = random(0.002, 0.004, true);
    }
  }

};


var render = function render() {
  resize();
  draw();
 id= requestAnimationFrame(render);
};


resize()
  // js 多行文本的创建，居然这么神奇  行的最后加一个 \
// 这个多行文本是在html文件里面测试的，然后拿过来，
// 原因是很难进行适配，，手机电脑尺寸，导致爱心位置不一
// 根据之前计算出的 r 值进行适配计算 
let wait_time=2
lineHeartComtianr.style.animation="hiddenAPeriod "+wait_time+"s"
// 使用  animation: hiddenAPeriod 6s  实现元素先后出现 

lineHeartComtianr.innerHTML = 
"<div style=\"display:flex; animation: hiddenAPeriod "+(wait_time+1)+"s ;\">\
<img src=\"/img/handInHand.png\"  style=\"width:"+ r*12+"px;height:"+ r*12+"px;margin-right: "+ r*2+"px;animation: hiddenAPeriod  "+(wait_time+1)+"s;\">\
<img src=\"/img/roses.png\" style=\"width: "+ r*12+"px;height: "+ r*12+"px;   animation: hiddenAPeriod  "+(wait_time+2)+"s,rotate 20s infinite;;\">\
</div>\
<div  style=\"animation: hiddenAPeriod "+(wait_time+3)+"s;margin-left: "+ r*8+"px; margin-top:"+ r+"px;display:flex; flex-direction: column;\">\
<button id=\"startButton\" style=\"font-size:"+ r+"px;text-align:center;animation: jackInTheBox 2s ;animation-iteration-count: 3;width: "+ r*10+"px;height: "+ r*3+"px; \">收下这束鲜花</button>\
<div style=\"font-size:"+ r*0.5+"px;text-align:center;margin-top:"+r*0.5+"px; display:flex;flex-direction: row;width: "+ r*10+"px;\">\
<input type=\"checkbox\"  id=\"checkbox\" checked=\"true\"  style=\" margin-left:"+r*3+"px;\">\
<text style=\" color: grey;white-space: nowrap;\">播放BGM</text>\
</div>\
<button  id=\"refuse\" onclick=\"refuse()\" style=\"animation: hiddenAPeriod "+(wait_time+5)+"s;margin-left: "+ r*3+"px;margin-bottom: "+ r*4+"px; font-size:"+ r+"px;text-align:center;margin-top:"+ r*2+"px;width: "+ r*4+"px;height: "+ r*2+"px; color:#ddd6d6 ;background:rgba(226,200,201,0.5);\">拒绝</button>\
</div>";
requestAnimationFrame(render);
}



export function stopLineHeart(){
let lineHeartanvas=document.getElementById("lineHeartanvas")
let lineHeartComtianr=document.getElementById("lineHeartComtianr");
window.cancelAnimationFrame(id)
if(lineHeartComtianr && lineHeartanvas){
  console.log("lineHeart 结束")
  lineHeartComtianr.parentNode.removeChild(lineHeartComtianr)
  lineHeartanvas.parentNode.removeChild(lineHeartanvas)
}
}
