import activeNotify from "../active-notify.js";
import vkGetFetch from "../vkGetFetch.js";

const usersList = document.getElementById("lista-categorias-atual");

const criarListaUsuarios = (userData) => {
  usersList.innerHTML = "";
  userData.users.forEach(users => {
    usersList.innerHTML += `
      <li>
        <div>
          <span><strong>Login:</strong> ${users.username}</span><br>
          <span><strong>Nome:</strong> ${users.name}</span><br>
          <span><strong>E-mail:</strong> ${users.email}</span><br>
          <span><strong>Criado por:</strong> ${users.created_by}</span>
        </div>
        <div>
          <span class="btn-acoes editar-usuarios" id="${users.id}">Editar</span>
          <span class="btn-acoes excluir-usuarios" id="${users.id}">Excluir</span>
        </div>
      </li>
    `
  });
}

const listarUsuarios = async () => {
  try {
    const userData = await vkGetFetch("/admin/usuarios");

    if (userData.users.length > 0) {
      criarListaUsuarios(userData);
    } else {
      usersList.innerHTML = "<li>Ainda não há usuários cadastrados.</li>";
    }

    return userData;

  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
    }
    activeNotify(err.toString().replace("Error: ", ""), 2);
  }
}

export default listarUsuarios;
