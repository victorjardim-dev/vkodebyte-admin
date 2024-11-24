import listarCategorias from "./listar-categorias.js";

const newCategory = async (BASE_URL_API, dados, feedbackEl, spinnerLoad) => {
  try {
    const request = await fetch(BASE_URL_API + "/categorias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {category_name: dados.value} )
    });
  
    if (!request.ok) {
      // throw
    }
  
    const responseData = await request.json();
  
    feedbackEl.innerHTML = "<span class='sucesso'>" + responseData.api_message + "</span>";
    dados.value = "";
    listarCategorias(BASE_URL_API, feedbackEl);
    

  } catch (err) {
    console.log(err);
  }
  spinnerLoad.classList.remove("ativo");
}

export default newCategory;
