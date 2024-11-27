import vkGetFetch from "../vkGetFetch.js";

const login = async (formLogin, feedbackEl, spinnerLoad) => {
  const objLogin = {
    username: formLogin.username.value,
    user_pass: formLogin.user_pass.value
  }

  try {
    const responseData = await vkGetFetch("/admin/login", "post", objLogin);

    if (responseData.api_message_error) throw responseData;

    localStorage.setItem("token", responseData.token);
    feedbackEl.innerHTML = "<span class='sucesso'>" + responseData.api_message + "<br>Redirecionando para o painel...</span>";

    setTimeout(() => {
      window.location.href = "painel.html";
    }, 1000);
    
  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
      feedbackEl.innerHTML = "<span class='erro'>" + err.toString().replace("Error: ", "") + "</span>";
    } else {
      feedbackEl.innerHTML = "<span class='erro'>" + err.api_message_error + "</span>";
    }
  }
  spinnerLoad.classList.remove("ativo");
}

export default login;
