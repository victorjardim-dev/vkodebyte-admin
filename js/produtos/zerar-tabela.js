const zerarTabela = async (BASE_URL_API) => {
  try {
    const request = await fetch(BASE_URL_API + "/zerar-tabela-produtos", {
      method: "DELETE"
    });
    const responseDate = await request.json();

    if (responseDate.api_message_error) {
      const objErro = new Object();
      objErro.error = responseDate.api_message_error;
      return objErro;
    }

    return responseDate;
    
  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
    }
    return err;
  }
}

export default zerarTabela;
