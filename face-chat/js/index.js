/*
 * @Description: 
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-05-11 13:13:31
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2021-05-11 13:58:50
 */
const panelEle = document.querySelector(".panel");
const chooseStickerBtn = document.querySelector(".chooseSticker");
const stickersEle = document.querySelector(".stickers");
const msgInputEle = document.querySelector(".messageInput");
const sendBtn = document.querySelector(".send");

sendBtn.addEventListener("click", () => {
  const msg = msgInputEle.value;
  if (msg) {
    appendMsg(msg);
  }
});

function appendMsg(msg, type) {
  // 创建消息元素
  const msgEle = panelEle.appendChild(document.createElement("div"));
  msgEle.classList.add("message", "mine"); // 设置为“我“发送的样式
  msgEle.innerHTML = `
    <img class="avatar" src="./images/4f02e75a22.jpg" alt="" />
    <p><span>${type === "sticker" ? "" : msg}</span></p>
  `;

  // 处理表情消息，播放相关动画
  if (type === "sticker") {
    playSticker(msg, msgEle);
    if (msg === "bomb") {
      // 播放爆炸动画
      setTimeout(() => {
        playExplosion(msgEle);
      }, 800);
      // 晃动消息列表
      shakeMessages();
    }
  }

  // 滚动到最新消息
  panelEle.scrollTop = panelEle.scrollHeight;
  msgInputEle.value = "";
}

const stickers = {
  bomb: {
    path: "./lottie-files/3145-bomb.json",
  }
}

// 初始化表情面板，也可以在表情选择窗弹出时再初始化
Object.keys(stickers).forEach((key) => {
  const lottieEle = stickersEle.appendChild(document.createElement("span"));
  // 对每个表情创建 lottie 播放器
  const player = lottie.loadAnimation({
    container: lottieEle,
    renderer: "svg",
    loop: true,
    autoplay: false,
    path: stickers[key].path,
  });

  // 当选择表情时，发送消息，并设置类型为 sticker 表情消息
  lottieEle.addEventListener("click", () => {
    appendMsg(key, "sticker");
  });

  // 当鼠标划过时，播放动画预览
  lottieEle.addEventListener("mouseover", () => {
    player.play();
  });
  // 当鼠标划过时，停止动画预览
  lottieEle.addEventListener("mouseleave", () => {
    player.stop();
  });
});

chooseStickerBtn.addEventListener("click", () => {
  stickersEle.classList.toggle("show");
});

function playSticker(key, msgEle) {
  // 表情消息，创建 lottie 动画
  const lottieEle = msgEle.querySelector("span");
  lottieEle.style.width = "40px";
  lottieEle.style.height = "40px";
  lottie.loadAnimation({
    container: lottieEle,
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: stickers[key].path,
  });
}

function playExplosion(anchor) {
  const explosionAnimeEle = anchor.appendChild(document.createElement("div"));
  explosionAnimeEle.style.position = "absolute";
  explosionAnimeEle.style.width = "200px";
  explosionAnimeEle.style.height = "100px";
  explosionAnimeEle.style.right = 0;
  explosionAnimeEle.style.bottom = 0;

  const explosionPlayer = lottie.loadAnimation({
    container: explosionAnimeEle,
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "./lottie-files/9990-explosion.json",
  });
  explosionPlayer.setSpeed(0.3);
  // 播放完成后，销毁爆炸相关的动画和元素
  explosionPlayer.addEventListener("complete", () => {
    explosionPlayer.destroy();
    explosionAnimeEle.remove();
  });
}

function shakeMessages() {
  [...panelEle.children]
    .reverse()
    .slice(0, 5)
    .forEach((messageEle) => {
      const avatarEle = messageEle.querySelector("img");
      const msgContentEle = messageEle.querySelector("p");
      avatarEle.classList.remove("shake");
      msgContentEle.classList.remove("shake");
      setTimeout(() => {
        avatarEle.classList.add("shake");
        msgContentEle.classList.add("shake");
      }, 700);
    });
}