const zerarTabela = async (BASE_URL_API) => {
  const TOKEN = localStorage.getItem("token");

  try {
    const request = await fetch(BASE_URL_API + "/zerar-tabela-produtos", {
      method: "DELETE",
      headers: {
        "auth-api-token": `Bearer ${TOKEN}`
      }
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

export default zerarTabela;
