import login from "./login.js";
import logout from "./logout.js";
import dashPainel from "./dashboard.js";
import newUser from "./newUser.js";
import listarUsuarios from "./listarUsuarios.js";
import activateBtnsActions from "../activateBtnsActions.js";

const adminInit = async (feedbackEl, spinnerLoad) => {
  const formLogin = document.getElementById("loginForm");
  const bntLogout = document.getElementById("btn-logout");
  
  if (formLogin) {
    formLogin.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("Logando...");
      login(event.target, feedbackEl, spinnerLoad);
    });
  }
  
  if (bntLogout) {
    bntLogout.addEventListener("click", logout);
  }
  
  if (window.location.pathname === "/painel.html") {
    async function formatarDataComHora(data) {
      const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  
      const dia = data.getDate();
      const mes = meses[data.getMonth()];
      const ano = data.getFullYear();
      const horas = String(data.getHours()).padStart(2, "0");
      const minutos = String(data.getMinutes()).padStart(2, "0");
  
      return `${dia} de ${mes} de ${ano} - ${horas}:${minutos}`;
    }
    const dataAtualSaudacao = document.querySelector(".dia-atual-saudacao");
    dashPainel();
    dataAtualSaudacao.innerHTML = await formatarDataComHora(new Date());
  }

  if (window.location.pathname === "/usuarios.html") {
    listarUsuarios(feedbackEl);
    const newUserForm = document.querySelector("#newUserForm");
    if (newUserForm) {
      newUserForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const newUserData = event.target;
  
        newUser(newUserData, feedbackEl, spinnerLoad);
        activateBtnsActions(feedbackEl);
        listarUsuarios(feedbackEl);
      });
    }
  }
}

export default adminInit;
