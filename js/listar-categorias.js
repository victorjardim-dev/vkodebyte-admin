const listarCategorias = async (BASE_URL_API, feedbackEl) => {
  try {
    const request = await fetch(BASE_URL_API + "/categorias");
    const responseDate = await request.json();
    
    const categoriaEl = document.getElementById("category_id");
    if (categoriaEl) {
      responseDate.map(categoria => {
        categoriaEl.innerHTML += `<option value="${categoria.id}">${categoria.category_name}</option>`;
      });
    }
  
    return responseDate;
  } catch(err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
    }
    feedbackEl.innerHTML = "<span class='erro'>" + err.toString().replace("Error: ", "") + "</span>";
  }
}

export default listarCategorias;
