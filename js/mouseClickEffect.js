/**
 * 
 */

function mouseHeart(window, document) {
    var hearts = [];

    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                setTimeout(callback, 1000 / 60);
            }
    })();

    init();

    function init() {
        css(".heart{width: 15px;height: 15px;position: fixed;background: pink;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
        attachEvent();
        gameloop();
    }

    function gameloop() {
        for (var i = 0; i < hearts.length; i++) {
            if (hearts[i].alpha <= 0) {
                document.body.removeChild(hearts[i].el);
                hearts.splice(i, 1);
                continue;
            }

            hearts[i].y--;
            hearts[i].scale += 0.004;
            hearts[i].alpha -= 0.013;
            hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha + ";transform:scale(" + hearts[i].scale + "," + hearts[i].scale + ") rotate(45deg);background:" + hearts[i].color;
        }

        requestAnimationFrame(gameloop);
    }

    function attachEvent() {
        var old = typeof window.onclick === "function" && window.onclick;
        window.onclick = function (event) {
            old && old();
            // let num=Math.floor(2+Math.random()*2)
            // for(let i ;i<num;i++){
            //     createHeart(event);
            // }
            createHeart(event);
     
        }
    }

    function createHeart(event) {
        var d = document.createElement("div");
        d.className = "heart";
        hearts.push({
            el: d,
            x: event.clientX - 5,
            y: event.clientY - 5,
            scale: 1,
            alpha: 1,
            color: randomColor()
        });

        document.body.appendChild(d);
    }

    function css(css) {
        var style = document.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(document.createTextNode(css));
        }
        catch (ex) {
            style.styleSheet.cssText = css;
        }

        document.getElementsByTagName('head')[0].appendChild(style);
    }

    function randomColor() {
        let Color="rgba(" + (200+(Math.random() * 40)) + "," + (160+(Math.random() * 40)) + "," + (200+(Math.random() * 40)) +","+ (0.7+Math.random()*0.3)+")";
        //console.log(Color)
        return  Color
    }

}

mouseHeart(window, document);



//----------------------------------------------------
//  鼠标点击效果 在点击的地方会有五颜六色的很多小球出现
// 与主题不符  不采用
// function clickEffect() {
//     let balls = [];
//     let longPressed = false;
//     let longPress;
//     let multiplier = 0;
//     let width, height;
//     let origin;
//     let normal;
//     let ctx;
//     const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
//     const canvas = document.createElement("canvas");
//     document.body.appendChild(canvas);
//     canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
//     const pointer = document.createElement("span");
//     pointer.classList.add("pointer");
//     document.body.appendChild(pointer);

//     if (canvas.getContext && window.addEventListener) {
//         ctx = canvas.getContext("2d");
//         updateSize();
//         window.addEventListener('resize', updateSize, false);
//         loop();
//         window.addEventListener("mousedown", function (e) {
//             pushBalls(randBetween(10, 20), e.clientX, e.clientY);
//             document.body.classList.add("is-pressed");
//             longPress = setTimeout(function () {
//                 document.body.classList.add("is-longpress");
//                 longPressed = true;
//             }, 500);
//         }, false);
//         window.addEventListener("mouseup", function (e) {
//             clearInterval(longPress);
//             if (longPressed == true) {
//                 document.body.classList.remove("is-longpress");
//                 pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
//                 longPressed = false;
//             }
//             document.body.classList.remove("is-pressed");
//         }, false);
//         window.addEventListener("mousemove", function (e) {
//             let x = e.clientX;
//             let y = e.clientY;
//             pointer.style.top = y + "px";
//             pointer.style.left = x + "px";
//         }, false);
//     } else {
//         console.log("canvas or addEventListener is unsupported!");
//     }


//     function updateSize() {
//         canvas.width = window.innerWidth * 2;
//         canvas.height = window.innerHeight * 2;
//         canvas.style.width = window.innerWidth + 'px';
//         canvas.style.height = window.innerHeight + 'px';
//         ctx.scale(2, 2);
//         width = (canvas.width = window.innerWidth);
//         height = (canvas.height = window.innerHeight);
//         origin = {
//             x: width / 2,
//             y: height / 2
//         };
//         normal = {
//             x: width / 2,
//             y: height / 2
//         };
//     }
//     class Ball {
//         constructor(x = origin.x, y = origin.y) {
//             this.x = x;
//             this.y = y;
//             this.angle = Math.PI * 2 * Math.random();
//             if (longPressed == true) {
//                 this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
//             } else {
//                 this.multiplier = randBetween(6, 12);
//             }
//             this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
//             this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
//             this.r = randBetween(8, 12) + 3 * Math.random();
//             this.color = colours[Math.floor(Math.random() * colours.length)];
//         }
//         update() {
//             this.x += this.vx - normal.x;
//             this.y += this.vy - normal.y;
//             normal.x = -2 / window.innerWidth * Math.sin(this.angle);
//             normal.y = -2 / window.innerHeight * Math.cos(this.angle);
//             this.r -= 0.3;
//             this.vx *= 0.9;
//             this.vy *= 0.9;
//         }
//     }

//     function pushBalls(count = 1, x = origin.x, y = origin.y) {
//         for (let i = 0; i < count; i++) {
//             balls.push(new Ball(x, y));
//         }
//     }

//     function randBetween(min, max) {
//         return Math.floor(Math.random() * max) + min;
//     }

//     function loop() {
//         ctx.fillStyle = "rgba(255, 255, 255, 0)";
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         for (let i = 0; i < balls.length; i++) {
//             let b = balls[i];
//             if (b.r < 0) continue;
//             ctx.fillStyle = b.color;
//             ctx.beginPath();
//             ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
//             ctx.fill();
//             b.update();
//         }
//         if (longPressed == true) {
//             multiplier += 0.2;
//         } else if (!longPressed && multiplier >= 0) {
//             multiplier -= 0.4;
//         }
//         removeBall();
//         requestAnimationFrame(loop);
//     }

//     function removeBall() {
//         for (let i = 0; i < balls.length; i++) {
//             let b = balls[i];
//             if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
//                 balls.splice(i, 1);
//             }
//         }
//     }
// }
// clickEffect();