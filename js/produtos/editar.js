const editarProduto = async (BASE_URL_API, dadosFormulario, codigoProduto, feedbackEl, spinnerLoad) => {
  try {
    const request = fetch(BASE_URL_API + "/produtos" + `/${codigoProduto}`, {
      method: "PUT",
      body: dadosFormulario
    });
    const responseDate = await (await request).json();

    feedbackEl.innerHTML = "<span class='sucesso'>" + responseDate.api_message.toString().replace("Error: ", "") + "</span>";

  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
    }
    feedbackEl.innerHTML = "<span class='erro'>" + responseDate.api_message.toString().replace("Error: ", "") + "</span>";
    console.log(err);
  }
  spinnerLoad.classList.remove("ativo");
}

export default editarProduto;
