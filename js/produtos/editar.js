const editarProduto = async (BASE_URL_API, dadosFormulario, codigoProduto, feedbackEl, spinnerLoad) => {
  try {
    const request = await fetch(BASE_URL_API + "/produtos" + `/${codigoProduto}`, {
      method: "PUT",
      body: dadosFormulario
    });
    const responseDate = await request.json();
    
    if (!request.ok) {
      throw responseDate;
    }
    
    feedbackEl.innerHTML = "<span class='sucesso'>" + responseDate.api_message + "</span>";
    
  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
    }
    feedbackEl.innerHTML = "<span class='erro'>" + err.api_message_error + "</span>";
  }
  spinnerLoad.classList.remove("ativo");
}

export default editarProduto;
