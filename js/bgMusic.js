export function bgMusic() {
    var music = ['1945-骆集益.mp3', 'kiss the rain.mp3', 'river flows in you.mp3', '卡农.mp3', '告白の夜.mp3', '梦中的婚礼（钢琴版）.mp3', '给你们.mp3', '菊次郎的夏天.mp3', '贝加尔湖畔.mp3', '风中的蒲公英.mp3']
    function getRandomBGM() {
        var playing = music[Math.floor(Math.random() * music.length)]
        console.log("随机选择背景音乐" + playing)
        return "/sourece/" + playing
    }
    function canpaly() {
        console.log("可以播放" + playing)

    }
    var playing = getRandomBGM()
    var audio = document.createElement("audio");
    audio.id = "audio";
    document.body.appendChild(audio)
    audio.setAttribute("src", playing);
    audio.setAttribute("loop", '');//  执行  loop  就不会触发ended  
    // audio.setAttribute("autoplay", 'autoplay');
    audio.setAttribute("muted", '');
    // audio.setAttribute("controls", ''); // 显示控制面板 调试用
    audio.setAttribute("preload", 'auto');
    audio.addEventListener("canplay", canpaly, false)
    audio.onended = function () {
        audio.pause()
        let playing = getRandomBGM()
        audio.setAttribute("src", playing);
        let control_txt = document.getElementById("control_txt")
        control_txt.innerText = playing.replace("/sourece/", "").replace(".mp3", "")
        audio.play()
    }
    audio.addEventListener("ended",
        function () {
            audio.pause()
            let playing = getRandomBGM()
            audio.setAttribute("src", playing);
            let control_txt = document.getElementById("control_txt")
            control_txt.innerText = playing.replace("/sourece/", "").replace(".mp3", "")
            audio.play()
        }
        , false)
    // 播放或者暂停

    // 切换歌曲 

    function addBGMControler() {
        var control_div = document.createElement("div");

        var control_txt = document.createElement("div")
        control_txt.id = "control_txt"
        control_txt.innerText = playing.replace("/sourece/", "").replace(".mp3", "")
        control_div.appendChild(control_txt)
        control_div.className = "BGMcontroler";

        var control_button = document.createElement("div")
        control_button.id = "control_button"
        var control_img = document.createElement("img")
        control_img.id = "control_play"
        control_img.src = "/img/playBGM.png"

        control_img.addEventListener("click",
        function playBGM() {
            let audio = document.getElementById("audio");
            let control_img = document.getElementById("control_play")
            if (audio.paused) {
                control_img.src = "/img/pauseBGM.png"
                console.log("开始播放")
                audio.play()
            }
            else {
                control_img.src = "/img/playBGM.png"
                console.log("暂停播放")
                audio.pause()
            }

        }
        )
        control_button.appendChild(control_img)

        var control_next = document.createElement("img")
        control_next.id = "control_next"
        control_next.src = "/img/nextBGM.png"
        control_next.addEventListener("click",
            function nextSong() {
                audio.pause()
                let playing = getRandomBGM()
                let control_txt = document.getElementById("control_txt")
                control_txt.innerText = playing.replace("/sourece/", "").replace(".mp3", "")
                audio.setAttribute("src", playing);
                audio.play()
            })

        control_button.appendChild(control_next)
        control_div.appendChild(control_button)
        document.body.appendChild(control_div)

    }
    addBGMControler()
    let checkbox = document.getElementById("checkbox")
    let control_img=document.getElementById("control_play")
    if (checkbox.checked) {
        audio.play()
        control_img.src = "/img/pauseBGM.png"
    }
    else {
        audio.pause()
        control_img.src = "/img/playBGM.png"
    }
  

}

