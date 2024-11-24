import listarCategorias from "./listar-categorias.js";

const newCategory = async (BASE_URL_API, dados, feedbackEl, spinnerLoad) => {
  const TOKEN = localStorage.getItem("token");

  try {
    const request = await fetch(BASE_URL_API + "/categorias", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {category_name: dados.value} )
    });
    
    const responseData = await request.json();
    
    if (!request.ok) {
      throw responseData;
    }
  
  
    feedbackEl.innerHTML = "<span class='sucesso'>" + responseData.api_message + "</span>";
    dados.value = "";
    listarCategorias(BASE_URL_API, feedbackEl);
    

  } catch (err) {
    feedbackEl.innerHTML = "<span class='erro'>" + err.api_message_error + "</span>";
  }
  spinnerLoad.classList.remove("ativo");
}

export default newCategory;
