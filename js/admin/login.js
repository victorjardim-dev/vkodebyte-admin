import activeNotify from "../active-notify.js";
import vkGetFetch from "../vkGetFetch.js";

const login = async (formLogin, spinnerLoad) => {
  const objLogin = {
    username: formLogin.username.value,
    user_pass: formLogin.user_pass.value
  }

  try {
    const responseData = await vkGetFetch("/admin/login", "post", objLogin);

    if (responseData.toString().includes("fetch")) throw responseData;

    if (responseData.api_message_error) throw responseData;

    localStorage.setItem("token", responseData.token);
    activeNotify(responseData.api_message + "<br>Redirecionando para o painel...", 1);

    setTimeout(() => {
      window.location.href = "painel.html";
    }, 1000);

  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
      activeNotify(err, 2);
    } else {
      activeNotify(err.api_message_error, 2);
    }

  }
  spinnerLoad.classList.remove("ativo");
}

export default login;
