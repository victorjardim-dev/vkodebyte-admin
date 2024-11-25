const deletarProduto = async (BASE_URL_API, codigoProduto, index) => {
  const TOKEN = localStorage.getItem("token");

  try {
    const imagem = document.querySelectorAll(".produtos img");

    const request = await fetch(BASE_URL_API + "/produtos" + `/${codigoProduto}`, {
      method: "DELETE",
      headers: {
        "auth-api-token": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        deleteImg: imagem[index].src.split("uploads/")[1]
      })
    });

    const responseData = await request.json();

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
