import vkGetFetch from "../vkGetFetch.js";
import activeNotify from "../active-notify.js";

const cadastrarProduto = async (dadosFormulario, spinnerLoad) => {
  try {
    const responseData = await vkGetFetch("/produtos", "post", dadosFormulario);

    if (responseData.api_message_error) {
      throw responseData;
    }

    activeNotify(responseData.api_message, 1);

  } catch (err) {
    if (Array.isArray(err.api_message_error.errors)) {
      const errArr = err.api_message_error.errors;
      activeNotify(errArr[0] + " <br> " + errArr[1], 2);
    } else {
      if (err.toString().includes("fetch")) {
        err = "Não foi possível se conectar ao servidor.";
        activeNotify(err.toString().replace("Error: ", ""), 2);
      } else {
        activeNotify(err.api_message_error, 2);
      }
    }
  }
  spinnerLoad.classList.remove("ativo");
}

export default cadastrarProduto;
