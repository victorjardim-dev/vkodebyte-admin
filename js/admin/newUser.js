import activeNotify from "../active-notify.js";
import vkGetFetch from "../vkGetFetch.js";
import listarUsuarios from "./listarUsuarios.js";

const newUser = async (newUserForm, spinnerLoad) => {

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
  
    activeNotify(responseData.api_message, 1);
    newUserForm.reset();
    listarUsuarios();

  } catch (err) {
    if (Array.isArray(err.api_message_error)) {
      const errArr = err.api_message_error;
      activeNotify(errArr[0] + " <br> " + errArr[1], 2);
    } else {
      activeNotify(err.api_message_error, 2);
    }
  }
  spinnerLoad.classList.remove("ativo");

}

export default newUser;
