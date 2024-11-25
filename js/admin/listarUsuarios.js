const listarUsuarios = async (BASE_URL_API, feedbackEl) => {
  const TOKEN = localStorage.getItem("token");

  try {
    const request = await fetch(BASE_URL_API + "/admin/usuarios", {
      headers: {
        "auth-api-token": `Bearer ${TOKEN}`
      }
    });
    const responseData = await request.json();

    const usersList = document.getElementById("lista-categorias-atual");

    if (usersList) {
      usersList.innerHTML = "";
      responseData.users.forEach(users => {
        usersList.innerHTML += `
          <li>
            <div>
              <span><strong>Login:</strong> ${users.username}</span><br>
              <span><strong>Nome:</strong> ${users.name}</span><br>
              <span><strong>E-mail:</strong> ${users.email}</span><br>
              <span><strong>Criado por:</strong> ${users.created_by}</span>
            </div>
            <div>
              <span class="btn-acoes" id="${users.id}">Editar</span>
              <span class="btn-acoes" id="${users.id}">Excluir</span>
            </div>
          </li>
        `
      });
    }

    return responseData;

  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
    }
    feedbackEl.innerHTML = "<span class='erro'>" + err.toString().replace("Error: ", "") + "</span>";
  }
}

export default listarUsuarios;
