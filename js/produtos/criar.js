const cadastrarProduto = async (BASE_URL_API, dadosFormulario, feedbackEl, spinnerLoad) => {
  try {
    const request = await fetch(BASE_URL_API + "/produtos", {
      method: "POST",
      body: dadosFormulario
    });
    const responseDate = await request.json();

    if (!request.ok) {
      throw new Error(responseDate.api_message);
    }

    feedbackEl.innerHTML = "<span class='sucesso'>" + responseDate.api_message.toString().replace("Error: ", "") + "</span>";

  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
    }
    feedbackEl.innerHTML = "<span class='erro'>" + err.toString().replace("Error: ", "") + "</span>";
  }
  spinnerLoad.classList.remove("ativo");
}

export default cadastrarProduto;
