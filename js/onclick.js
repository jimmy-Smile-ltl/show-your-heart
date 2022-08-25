//  这里主要是 把那些onclick绑定的方法全部放在这里 
// 怎么可能被拒绝呢？
function refuse() {
  console.log("refuse")
  let refuse = document.getElementById("refuse");
  let accept = document.getElementById("startButton")
  refuse.innerText = "错了"
  refuse.style.color = "red"
  accept.innerText = "乖，只能点这里"
  accept.style.animationName="scale"
  window.setTimeout(
    function(){
      // 他不选接受，自动执行
      console.log("执行接受")
      accept.click()
    }
,3e3
  )

}
