// TESTE DE NOTIFICACAO
const vknotify = document.getElementById("vk-notify");
const vknotifyBody = document.querySelector(".notify-body");
let timed;
let typeClass;

const activeNotify = (msg, type = 0) => {
  if (timed) clearTimeout(timed);

  if (type === 1) {
    typeClass = "sucesso";
  } else if (type === 2) {
    typeClass = "erro";
  } else {
    typeClass = "";
  }
  
  vknotifyBody.innerHTML = `<span class="${typeClass}">${msg}</span>`;
  vknotify.style.animation = "showNotify .3s ease-in-out forwards";
  
  timed = setTimeout(() => {
    vknotify.style.animation = "hideNotify .3s ease-in-out";
  }, 3000);
}

export default activeNotify;
