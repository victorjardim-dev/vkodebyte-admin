const editarProduto = async (BASE_URL_API, dadosFormulario, codigoProduto, feedbackEl, spinnerLoad) => {
  try {
    const request = await fetch(BASE_URL_API + "/produtos" + `/${codigoProduto}`, {
      method: "PUT",
      body: dadosFormulario
    });
    const responseData = await request.json();
    
    if (!request.ok) {
      throw responseData;
    }
    
    feedbackEl.innerHTML = "<span class='sucesso'>" + responseData.api_message + "</span>";
    
  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
    }
    feedbackEl.innerHTML = "<span class='erro'>" + err.api_message_error + "</span>";
  }
  spinnerLoad.classList.remove("ativo");
}

export default editarProduto;
