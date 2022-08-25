'use strict';
//  js是否支持面向对象class
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConsoleSignature = function () {
  function ConsoleSignature() {
    _classCallCheck(this, ConsoleSignature);
    // 尊重原作者版权，予以保留
    this.message = 'created by yoichi kobayashi';
    this.url = 'http://www.tplh.net';
    this.show();
  }
  // 好像是检查是不是chrome浏览器
  ConsoleSignature.prototype.show = function show() {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      var args = ['\n%c ' + this.message + ' %c%c ' + this.url + ' \n\n', 'color: #fff; background: #222; padding:3px 0;', 'padding:3px 1px;', 'color: #fff; background: #47c; padding:3px 0;'];
      console.log.apply(console, args);
    } else if (window.console) {
      console.log(this.message + ' ' + this.url);
    }
  };

  return ConsoleSignature;
}();

// 去抖动，主要是画面部分希望动作上连贯
var debounce = function debounce(callback, duration) {
  var timer;
  return function (event) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback(event);
    }, duration);
  };
};
// 蝴蝶大小
var SIZE = 80;
//  数量
var BUTTERFLY_NUM = 28;
var Butterfly = function () {
  function Butterfly(i, texture) {
    _classCallCheck(this, Butterfly);

    this.uniforms = {
      index: {
        type: 'f',
        value: i
      },
      time: {
        type: 'f',
        value: 0
      },
      size: {
        type: 'f',
        value: SIZE
      },
      texture: {
        type: 't',
        value: texture
      }
    };
    this.physicsRenderer = null;
    this.obj = this.createObj();
  }

  Butterfly.prototype.createObj = function createObj() {
    var geometry = new THREE.PlaneBufferGeometry(SIZE, SIZE / 2, 24, 12);
    var mesh = new THREE.Mesh(geometry, new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: 'attribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float index;\nuniform float time;\nuniform float size;\n\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\nvoid main() {\n  float flapTime = radians(sin(time * 6.0 - length(position.xy) / size * 2.6 + index * 2.0) * 45.0 + 30.0);\n  float hovering = cos(time * 2.0 + index * 3.0) * size / 16.0;\n  vec3 updatePosition = vec3(\n    cos(flapTime) * position.x,\n    position.y + hovering,\n    sin(flapTime) * abs(position.x) + hovering\n  );\n\n  vec4 mvPosition = modelViewMatrix * vec4(updatePosition, 1.0);\n\n  vPosition = position;\n  vUv = uv;\n\n  gl_Position = projectionMatrix * mvPosition;\n}\n',
      fragmentShader: 'precision highp float;\n\nuniform float index;\nuniform float time;\nuniform float size;\nuniform sampler2D texture;\n\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise3(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\nvec3 convertHsvToRgb(vec3 c) {\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\nvoid main() {\n  vec4 texColor = texture2D(texture, vUv);\n\n  float noise = snoise3(vPosition / vec3(size * 0.25) + vec3(0.0, 0.0, time));\n  vec3 hsv = vec3(1.0 + noise * 0.2 + index * 0.7, 0.4, 1.0);\n  vec3 rgb = convertHsvToRgb(hsv);\n\n  gl_FragColor = vec4(rgb, 1.0) * texColor;\n}',
      depthWrite: false,
      side: THREE.DoubleSide,
      transparent: true
    }));
    mesh.rotation.set(-70 * Math.PI / 180, 0, 0);
    return mesh;
  };

  Butterfly.prototype.render = function render(renderer, time) {
    this.uniforms.time.value += time;
    // 注意两个刚好相反 其实就是 到达顶部后刷新一遍
    // 运动速度应该是前后两次变化之和  -2   +  -2  =-4   
    this.obj.position.z = this.obj.position.z > -screen.availHeight ? this.obj.position.z - 2 : screen.availHeight;
    this.obj.position.z = this.obj.position.z < -screen.availHeight ? screen.availHeight*0.3-screen.availHeight*0.3*Math.random():this.obj.position.z - 2;

  };

  return Butterfly;
}();
var canvas = document.createElement("canvas")
canvas.id = 'canvas-butterfly';
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "0";
var resolution = {
  x: 0,
  y: 0
};
var renderer = new THREE.WebGLRenderer({
  antialias: false,
  canvas: canvas,
  alpha: true
});
renderer.setClearAlpha(0);
var scene = new THREE.Scene();
// scene.background = new THREE.Color( 0x000000 )
var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 10000);
var clock = new THREE.Clock();
var loader = new THREE.TextureLoader();
var loaderA=new THREE.TextureLoader();

var vectorTouchStart = new THREE.Vector2();
var vectorTouchMove = new THREE.Vector2();
var vectorTouchEnd = new THREE.Vector2();

var CAMERA_SIZE_X = 640;
var CAMERA_SIZE_Y = 480;

var resizeCamera = function resizeCamera() {
  var x = Math.min(resolution.x / resolution.y / (CAMERA_SIZE_X / CAMERA_SIZE_Y), 1.0) * CAMERA_SIZE_X;
  var y = Math.min(resolution.y / resolution.x / (CAMERA_SIZE_Y / CAMERA_SIZE_X), 1.0) * CAMERA_SIZE_Y;
  camera.left = x * -0.5;
  camera.right = x * 0.5;
  camera.top = y * 0.5;
  camera.bottom = y * -0.5;
  camera.updateProjectionMatrix();
};
var resizeWindow = function resizeWindow() {
  resolution.x = window.innerWidth;
  resolution.y = window.innerHeight;
  canvas.width = resolution.x;
  canvas.height = resolution.y;
  resizeCamera();
  renderer.setSize(resolution.x, resolution.y);
};

var on = function on() {
  window.addEventListener('resize', debounce(resizeWindow), 1000);
};
var butterfly_imagees = [
  "/img/butterfly/red.png",
  "/img/butterfly/blue.png",
  "/img/butterfly/pink.png",
  "/img/butterfly/purple.png",
  "/img/butterfly/yellow.png",
  "/img/butterfly/butterfly.png",
  "/img/butterfly/aqua.png"
]
var  id=null


function printer(heart_div, heart_txt) {
  var print_speed = 300
  var print_speedB=45
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



var butterfly_txt = "<div id='b_title'>鸳鸯蝴蝶赋</div> \
<div id='b_author'>宋浩浩</div>\
<p id='b_ctx'>鸳鸯栖梦云水间<br>\
蝴蝶双飞上青天<br>\
人生愿得长相守<br>\
永为眷侣不为仙</p>"
export function startButterflies() {
  var butterflies = [];
  var temp_length = screen.availWidth > screen.availHeight ? screen.availHeight : screen.availWidth * 1.5;
  var container=document.createElement("div")
  document.body.appendChild(container)
  container.id="container"
  container.className="background"
  container.style="background:url('/img/bu.jpg');background-size:cover;"
  container.innerHTML="<img src='/img/yuanyang2.png' style='width:"+ temp_length * 0.5 + "px;height: " + temp_length * 0.5 + "px;position:fixed; bottom:-5vh;left:50vw;animation:hiddenAPeriod 3s;transform:translate(-50%,0%);'>"

  var text_div = document.createElement("div")
    text_div.id = "b_div";
    container.appendChild(text_div)
    text_div.style = "width:" + temp_length * 0.8 + "px;height: " + temp_length * 0.8 + "px;font-size:" + temp_length / 20 + "px;line-height:1.2em;"
    printer(text_div, butterfly_txt)

// 渲染
  function render() {
    var time = clock.getDelta();
    for (var i = 0; i < butterflies.length; i++) {
      butterflies[i].render(renderer, time);
    }
    renderer.render(scene, camera);
  };
  function renderLoop() {
    render();
  id= requestAnimationFrame(renderLoop);
  };
// 生成
  document.body.appendChild(canvas)
  console.log("蝴蝶绘画开始")
  resizeWindow();
  on();
  renderer.setClearColor(0x000000, 0);
  camera.position.set(110, 500, 1000);
  camera.lookAt(new THREE.Vector3());
  loader.crossOrigin = 'anonymous';

  var butterflies_texture=[]
  for(var image_index=0;image_index<butterfly_imagees.length;image_index++){
    butterflies_texture.push(loader.load(butterfly_imagees[image_index]))
  }
  for (var i = 0; i < BUTTERFLY_NUM; i++) {
    var texture= butterflies_texture[Math.floor(Math.random()*butterflies_texture.length)]
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    butterflies[i] = new Butterfly(i, texture);
    // X: screen.availWidth*(i-BUTTERFLY_NUM/2)/BUTTERFLY_NUM,  左右均衡出现  中间为零 左负右正
    // Y: 
    butterflies[i].obj.position.set(
      screen.availWidth*(i-BUTTERFLY_NUM/2)/BUTTERFLY_NUM,
    -50,
    Math.random()*screen.availHeight*2-screen.availHeight);
    scene.add(butterflies[i].obj);
    console.log(i)
  }
renderLoop()
}
export function stopButterflies() {
  console.log(id)
  window.pausedAnimation = true; 
  window.cancelAnimationFrame(id)
  var canvas = document.getElementById("canvas-butterfly")
  if (canvas) {
  document.body.style=""
    canvas.parentNode.removeChild(canvas)
    console.log("蝴蝶绘画结束")
  }
  else {
    console.log("蝴蝶canvas不存在")
    return
  }

};
export var butterfliesList =
  [
    {
      "start": startButterflies,
      "stop": stopButterflies,
      "timeout": 3e4
    }
  ]