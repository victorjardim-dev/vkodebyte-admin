import listarUsuarios from "./listarUsuarios.js";

const newUser = async (BASE_URL_API, newUserForm, feedbackEl, spinnerLoad) => {
  const TOKEN = localStorage.getItem("token");

  const newuser = {
    name: newUserForm[0].value,
    username: newUserForm[1].value,
    email: newUserForm[2].value,
    user_pass: newUserForm[3].value,
  }

  try {
    const request = await fetch(BASE_URL_API + "/admin/novo-usuario", {
      method: "POST",
      headers: {
        "auth-api-token": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify( newuser )
    });
    
    const responseData = await request.json();
    
    if (!request.ok) {
      throw responseData;
    }  
  
    feedbackEl.innerHTML = "<span class='sucesso'>" + responseData.api_message + "</span>";
    newUserForm.reset();
    listarUsuarios(BASE_URL_API, feedbackEl);

  } catch (err) {
    console.log(err);
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
