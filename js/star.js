//宇宙特效
"use strict";
var hue = 200,
    stars = [],
    count = 0,
    maxStars = 900,//星星数量
    w = window.screen.width,
    h = window.screen.height;
var ctx, canvas, canvas2, ctx2
// 这是星星的canvas容器
function createStarCanvas() {
    canvas = document.getElementById('star-canvas');
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "star-canvas";
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.zIndex = "-2";
        console.log("星空绘画开始")
        document.body.appendChild(canvas)
    };
    ctx = canvas.getContext('2d');
    canvas.width = window.outerWidth;
    canvas.height = window.outerHeight;
}
// 一个一个的小星星
function starItemCanvas() {
    canvas2 = document.getElementById("canvas")
    if (!canvas2) {
        canvas2 = document.createElement('canvas');
        canvas2.id = "canvas"
        ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        var half = canvas2.width / 2,
            gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#CCC');
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
        gradient2.addColorStop(0.25, 'hsl(' + hue + ', 61%, 10%)');
        gradient2.addColorStop(1, 'transparent');
        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();
    }
}

// End cache

function random(min, max) {
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }

    if (min > max) {
        var hold = max;
        max = min;
        min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x, y) {
    var max = Math.max(x, y),
        diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
    //星星移动范围，值越大范围越小，
}

var Star = function () {

    this.orbitRadius = random(maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 8;
    //星星大小
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 600000;
    //星星移动速度
    this.alpha = random(2, 10) / 10;

    count++;
    stars[count] = this;
}

Star.prototype.draw = function () {
    var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
        twinkle = random(10);

    if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    this.timePassed += this.speed;
}
// 这是在生成星星列表，会自动执行,也可以考虑放进方法体
for (var i = 0; i < maxStars; i++) {
    new Star();
}
var idB=null;

function StarAnimation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1; //尾巴
    // 我测试了一下，背景颜色 必须是 使用上面 hue，hsla透明度必须是1
    // 不然结果星星就是会有明显的尾巴，色差，本来就有，只是一个颜色情况下被遮盖了
    ctx.fillStyle = 'hsla(' + hue + ', 84%, 5%, 0.8)';
    ctx.fillRect(0, 0, w, h)

    ctx.globalCompositeOperation = 'lighter';
    for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
    };
   idB= window.requestAnimationFrame(StarAnimation);
}
function startStarAnimation() {
    var xianci="献给XX，我的xxxxx"
    var bgContainer=document.createElement("div")
    bgContainer.id="bgContainer"
    document.body.appendChild(bgContainer)
    bgContainer.innerHTML="<div class='shine'>"+xianci+"</div>\
        <iframe id='iframe' src='/iframe/star/index.html' frameborder='0' ></iframe>\
        <img src='/img/star.png' id='huistar' class='huistarA'>\
        <img src='/img/bb.png' class='blackHole' >" 
    createStarCanvas()
    starItemCanvas()
    StarAnimation()
    var huistar=document.getElementById("huistar")
    if(screen.availWidth<screen.availHeight){
            huistar.style="transform: translate(-50%, -50%) rotate(-40deg);"
    }

    initThree()
}

function stopStarAnimation() {
    window.cancelAnimationFrame(idA)
    window.cancelAnimationFrame(idB)
    var canvas = document.getElementById('star-canvas');
    var monn_rotate=document.getElementById("monn_rotate")
    var bgContainer=document.getElementById("bgContainer")
    if (canvas) {
        canvas.parentNode.removeChild(canvas)
        monn_rotate.parentElement.removeChild(monn_rotate)
        bgContainer.parentNode.removeChild(bgContainer)
        console.log("星空绘画结束")
    }
    else {
        return
    }
}

export var starList =
    [
        {
            "start": startStarAnimation,
            "stop": stopStarAnimation,
            "timeout": 1e4
        }
    ]

/** =============================
 * 下面是基于three.js 做的行星的旋转效果
 * initThree
 * ===========================
*/

var renderer, camera, scene;//渲染器，相加，场景
var Earth, satellites = [];//地球，卫星（数组）

/**
 * 返回一个卫星和轨道的组合体
 * @param satelliteSize 卫星的大小
 * @param satelliteRadius 卫星的旋转半径
 * @param rotation 组合体的x,y,z三个方向的旋转角度
 * @param speed 卫星运动速度
 * @param scene 场景
 * @returns {{satellite: THREE.Mesh, speed: *}} 卫星组合对象;速度
 */
var initSatellite = function (satelliteSize, satelliteRadius, rotation, speed, scene) {

    var track = new THREE.Mesh(new THREE.RingGeometry(satelliteRadius, satelliteRadius + 0.05, 50, 1), new THREE.MeshBasicMaterial());
    var centerMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 1, 1), new THREE.MeshLambertMaterial()); //材质设定
    var satellite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(generateSprite('196,233,255')),
        blending: THREE.AdditiveBlending
    }));
    satellite.scale.x = satellite.scale.y = satellite.scale.z = satelliteSize;
    satellite.position.set(satelliteRadius, 0, 0);

    var pivotPoint = new THREE.Object3D();
    pivotPoint.add(satellite);
    pivotPoint.add(track);
    centerMesh.add(pivotPoint);
    centerMesh.rotation.set(rotation.x, rotation.y, rotation.z);
    scene.add(centerMesh);
    return { satellite: centerMesh, speed: speed };
};

/**
 * 实现发光星星
 * @param color 颜色的r,g和b值,比如：“123,123,123”;
 * @returns {Element} 返回canvas对象
 */
var generateSprite = function (color) {
    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext('2d');
    var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'rgba(' + color + ',1)');
    gradient.addColorStop(0.2, 'rgba(' + color + ',1)');
    gradient.addColorStop(0.4, 'rgba(' + color + ',.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    return canvas;
};

var idA=null
function render() {
    renderer.render(scene, camera);
    Earth.rotation.y -= 0.01;
    for (var i = 0; i < satellites.length; i++) {
        satellites[i].satellite.rotation.z -= satellites[i].speed;
    }
   idA= requestAnimationFrame(render);
   console.log("render")
}
function initThree() {
    console.log("星球旋转，three3d")
    var dom = document.createElement("div");
    dom.id="monn_rotate"
    dom.style="position:fixed;left:-5vw;top:-5vh;"
    document.body.appendChild(dom)
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(20, 1, 1, 1000);
    camera.position.set(0, 0, 400);//设置相机位置
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    console.log("dom.clientWidth"+dom.clientWidth)
  // 电脑取高度， 手机取宽度
    let len=screen.availWidth>screen.availHeight? screen.availHeight/1.5:screen.availWidth;
    dom.style.width=len*0.8+"px";
    dom.style.height=len*0.8+"px";
    renderer.setSize(len*0.8, len*0.8);//设置窗口尺寸
    dom.appendChild(renderer.domElement);

    var sunTexture = THREE.ImageUtils.loadTexture('/img/map_world.png', {}, function () {
        renderer.render(scene, camera);
    });

    //地球
    Earth = new THREE.Mesh(new THREE.SphereGeometry(20, 30, 30), new THREE.MeshBasicMaterial({
        map: sunTexture
    })); //材质设定

    var satellite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(generateSprite('196,233,255')),
        blending: THREE.AdditiveBlending
    }));
    satellite.scale.x = satellite.scale.y = satellite.scale.z = 60;
    scene.add(satellite);//添加发光,让地球有发光的样式
    scene.add(Earth);

    //添加卫星
    satellites.push(initSatellite(5, 28, { x: -Math.PI * 0.35, y: Math.PI * 0.25, z: 0 }, 0.021, scene));
    satellites.push(initSatellite(5, 25, { x: -Math.PI * 0.35, y: -Math.PI * 0.2, z: 0 }, 0.022, scene));
    satellites.push(initSatellite(5, 29, { x: -Math.PI * 0.35, y: Math.PI * 0.05, z: 0 }, 0.023, scene));
    render();

}
