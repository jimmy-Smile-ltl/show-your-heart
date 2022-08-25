/**
 * 把其他js 方法综合到这里这些，展现整个逻辑
 * author： Jimmy Smile
 * e-amil:jimmysmileltl@163.com
 * 使用import export 执行代码综合失败，好像原生js 不怎么支持模块化
 * 搞错了，我的锅，js对于模块化的支持还不错，是我的js代码有错
 * 但是没有导入时是能跑的，错误主要在于 变量没有声明就直接使用
 * 发现方法：导入方法后，浏览器调试，遇到错误暂停，就可以发现，也可以直接看，控制台报错
 * from "./fourQuarter.js"  里面的js后缀名不能省略
 */
import { bgMusic } from "./bgMusic.js"
import { stopLineHeart, startLineHeart } from './line_heart.js';
import { fourQuarterList } from "./fourQuarter.js"
import { starList } from "./star.js"
import { loveHeartList } from "./loveHeart.js"
import { butterfliesList } from "./butterfly.js"
var startStopList = starList.concat([ fourQuarterList[0], butterfliesList[0],loveHeartList[0]])
console.log(startStopList)
var index = 0
var temp = 0
var sum = 0  // 记录总的方法数量
var childListNum = 0
var hasChild = false  //标记当前子原始是否是数组

// 这是我设计的按照startStopList储存的顺序执行任务的方法
// 最初的测试完成在fourQuarter.js  感兴趣可以去看，在最下面

var startStopList_copy = startStopList
startLineHeart()
let accept = document.getElementById("startButton");
accept.addEventListener("click", function () {
    console.log("开始执行")
    bgMusic();
    stopLineHeart();
    startStop(startStopList)
})

// startLineHeart()

// butterfliesList[0].start()

// var  startStopList=butterfliesList.concat(loveHeartList[0])
// var startStopList_copy = startStopList
// startStop(startStopList)
// butterfliesList[0].start()

// var startStopList_copy = fourQuarterList
// startStop(fourQuarterList)


// fourQuarterList[0].start()
// fourQuarterList[0].childs[4].start()

// starList[0].start()
// setTimeout(() => {
//     starList[0].stop()
    
// }, 1e3);

// loveHeartList[0].start()


// loveHeartList[0].start()
// 点击接受
function startStop(startStopList) {
    if (index < startStopList.length) {
        startStopList[index].start()
        console.log(startStopList[index].start.name)
        console.log("index: " + index)
        if (startStopList[index].childs) { // 有子任务的处理
            childListNum++;
            hasChild = true;
            temp = index;  // 储存index ,
            console.log(index + "子元素有childs  长度为：" + startStopList[index].childs.length)
            index = 0 // 刷新index 遍历子数组用
            startStop(startStopList[temp].childs) // 遍历childs
        }
        else {
            sum++
            setTimeout(function () {
                startStopList[index].stop()
                index++
                startStop(startStopList)// 递归
            }
                ,startStopList[index].timeout)//
        }

    }
    // index超出数组长度，
    //可能是执行完毕，
    //也可能只是一个又child的子数组执行完毕
    else {
        // 子元素的child遍历完成后来到这里
        // 回到父级元素
        if (hasChild === true) {
            index = temp;
            hasChild = !hasChild;
            startStopList_copy[temp].stop()
            console.log("第" + temp + "个元素迭代完毕")
            index++
            if (index < startStopList_copy.length) {
                startStop(startStopList_copy)// 递归
            }
            else {
                // startStopList_copy[index].stop()
                console.log("全部执行完毕, 共有" + index + " 个子元素    " + sum + " 个元素")
            }

        }
        else {
            // startStopList_copy[index-1].stop()
            console.log("全部执行完毕, 共有" + index + " 个子元素    " + sum + " 个元素")
        }


    }
}






// var item=0
// var temp=null
// function startStopA(startStopList) {
//         // 有孩子
//         if (startStopList[item].childs){
//             startStopList[item].start()
//             setTimeout(function () {
//                 startStopList[item].stop()
//                 temp=item
//                 item++
//                 startStopA(startStopList[temp])// 递归
//             }
//                 , startStopList[item].timeout)
//         }
//         // 没有孩子
//         else{
//             startStopList[item].start()
//             setTimeout(function () {
//                 startStopList[item].stop()
//                 item++
//                 startStopA(startStopList)// 递归
//             }
//                 , startStopList[item].timeout)
//         }

// }










//===============================下面别管了
// startFourQuarter(startStarAnimation, startHeartAnimation)


// var index = 0
// function startStop(startStopList) {
//     if (index < startStopList.length) {
//         startStopList[index].start()
//         start()
//         setTimeout(function () {
//             startStopList[index].stop()
//             index++
//             startStop(startStopList)// 递归
//         }
//             , 1e4)

//     }
//     else {
//         console.log("执行完毕")
//     }
// }


// 这种start-stop 控制方式失败，setTimeout嵌套失败
// import {startFourQuarter, stopFourQuarter} from "./fourQuarter.js"
// import {startStarAnimation, stopStarAnimation} from "./star.js"
// import {startHeartAnimation, stopHeartAnimation}  from "./loveHeart.js"

// setTimeout(function(){
//     startFourQuarter()
//     stopFourQuarter()
//     startStarAnimation()
//     setTimeout(function(){
//         stopStarAnimation()
//         startHeartAnimation()
//         setTimeout(
//             stopHeartAnimation(),1000
//         )
//     },1000)
// }
//     , 1000);

// startHeartAnimation()
// startStarAnimation()
// setTimeout(function(){
//     stopStarAnimation()
// },8e3)
