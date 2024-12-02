import vkGetFetch from "../vkGetFetch.js";

const editarProduto = async (dadosFormulario, codigoProduto, feedbackEl, spinnerLoad) => {
  try {
    const responseData = await vkGetFetch(`/produtos/${codigoProduto}`, "put", dadosFormulario);
    
    if (responseData.api_message_error) {
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
