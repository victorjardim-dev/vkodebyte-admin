import vkGetFetch from "../vkGetFetch.js";
import activeNotify from "../active-notify.js";

const listarCategorias = async () => {
  try {
    const responseData = await vkGetFetch("/categorias");

    const categoriaEl = document.getElementById("category_id");
    const categoriasList = document.getElementById("lista-categorias-atual");

    if (categoriaEl) {
      responseData.map(categoria => {
        categoriaEl.innerHTML += `<option value="${categoria.id}">${categoria.category_name}</option>`;
      });
    }

    if (categoriasList) {
      if (responseData !== "No Content") {
        categoriasList.innerHTML = "";
        responseData.forEach(categoria => {
          categoriasList.innerHTML += `<li><span>${categoria.category_name}</span> <span class="btn-acoes excluir-categoria" id="${categoria.id}">Excluir</span></li>`
        });
      } else {
        categoriasList.innerHTML = "<li>Não categorias cadastradas.</li>"
      }
    }

    return responseData;

  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
    }
    activeNotify(err.toString().replace("Error: ", ""), 2);
  }
}

export default listarCategorias;
