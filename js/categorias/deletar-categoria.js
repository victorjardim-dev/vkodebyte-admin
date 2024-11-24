const deletarCategoria = async (BASE_URL_API, idCategoria) => {
  try {
    const request = await fetch(BASE_URL_API + "/categorias" + `/${idCategoria}`, {
      method: "DELETE"
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

export default deletarCategoria;
