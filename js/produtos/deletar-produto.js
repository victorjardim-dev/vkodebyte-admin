import vkGetFetch from "../vkGetFetch.js";

const deletarProduto = async (codigoProduto, index) => {
  try {
    const imagem = document.querySelectorAll(".produtos img");

    const responseData = await vkGetFetch(`/produtos/${codigoProduto}`, "delete", {
      deleteImg: imagem[index].src.split("uploads/")[1]
    });

    if (responseData.api_message_error) {
      const objErro = new Object();
      objErro.error = responseData.api_message_error;
      return objErro;
    }

    return responseData;
    
  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
    }
    return err;
  }
}

export default deletarProduto;
