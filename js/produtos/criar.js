const cadastrarProduto = async (BASE_URL_API, dadosFormulario, feedbackEl, spinnerLoad) => {
  const TOKEN = localStorage.getItem("token");

  try {
    const request = await fetch(BASE_URL_API + "/produtos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      body: dadosFormulario
    });
    const responseData = await request.json();

    if (!request.ok) {
      throw responseData;
    }

    feedbackEl.innerHTML = "<span class='sucesso'>" + responseData.api_message + "</span>";

  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
      feedbackEl.innerHTML = "<span class='erro'>" + err.toString().replace("Error: ", "") + "</span>";
    } else {
      feedbackEl.innerHTML = "<span class='erro'>" + err.api_message_error + "</span>";
    }
  }
  spinnerLoad.classList.remove("ativo");
}

export default cadastrarProduto;
