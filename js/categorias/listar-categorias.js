const listarCategorias = async (BASE_URL_API, feedbackEl) => {
  const TOKEN = localStorage.getItem("token");

  try {
    const request = await fetch(BASE_URL_API + "/categorias", {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    const responseData = await request.json();
    
    const categoriaEl = document.getElementById("category_id");
    const categoriasList = document.getElementById("lista-categorias-atual");

    if (categoriaEl) {
      responseData.map(categoria => {
        categoriaEl.innerHTML += `<option value="${categoria.id}">${categoria.category_name}</option>`;
      });
    }

    if (categoriasList) {
      categoriasList.innerHTML = "";
      responseData.forEach(categoria => {
        categoriasList.innerHTML += `<li><span>${categoria.category_name}</span> <span class="excluir-categoria" id="${categoria.id}">Excluir</span></li>`
      });
    }
  
    return responseData;
    
  } catch(err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
    }
    feedbackEl.innerHTML = "<span class='erro'>" + err.toString().replace("Error: ", "") + "</span>";
  }
}

export default listarCategorias;
