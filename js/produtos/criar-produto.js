import vkGetFetch from "../vkGetFetch.js";

const cadastrarProduto = async (dadosFormulario, feedbackEl, spinnerLoad) => {
  try {
    const responseData = await vkGetFetch("/produtos", "post", dadosFormulario);

    if (responseData.api_message_error) {
      throw responseData;
    }

    feedbackEl.innerHTML = "<span class='sucesso'>" + responseData.api_message + "</span>";

  } catch (err) {
    if (Array.isArray(err.api_message_error.errors)) {
      const errArr = err.api_message_error.errors;
      feedbackEl.innerHTML = "<span class='erro'>" + errArr[0] + " <br> " + errArr[1] || "" + "</span>";
    } else {
      if (err.toString().includes("fetch")) {
        err = "Não foi possível se conectar ao servidor.";
        feedbackEl.innerHTML = "<span class='erro'>" + err.toString().replace("Error: ", "") + "</span>";
      } else {
        feedbackEl.innerHTML = "<span class='erro'>" + err.api_message_error + "</span>";
      }
    }
  }
  spinnerLoad.classList.remove("ativo");
}

export default cadastrarProduto;
