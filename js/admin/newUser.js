import vkGetFetch from "../vkGetFetch.js";
import listarUsuarios from "./listarUsuarios.js";

const newUser = async (newUserForm, feedbackEl, spinnerLoad) => {

  const newuser = {
    name: newUserForm[0].value,
    username: newUserForm[1].value,
    email: newUserForm[2].value,
    user_pass: newUserForm[3].value,
  }

  try {
    const responseData = await vkGetFetch("/admin/novo-usuario", "post", newuser);
    
    if (responseData.api_message_error) {
      throw responseData;
    }  
  
    feedbackEl.innerHTML = "<span class='sucesso'>" + responseData.api_message + "</span>";
    newUserForm.reset();
    listarUsuarios(feedbackEl);

  } catch (err) {
    if (Array.isArray(err.api_message_error)) {
      const errArr = err.api_message_error;
      feedbackEl.innerHTML = "<span class='erro'>" + errArr[0] + " <br> " + errArr[1] + "</span>";
    } else {
      feedbackEl.innerHTML = "<span class='erro'>" + err.api_message_error + "</span>";
    }
  }
  spinnerLoad.classList.remove("ativo");

}

export default newUser;
