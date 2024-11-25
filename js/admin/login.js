const login = async (BASE_URL_API, feedbackEl, spinnerLoad) => {
  const usr = document.getElementById("username").value;
  const pwd = document.getElementById("user_pass").value;

  try {
    const request = await fetch(BASE_URL_API + "/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: usr,
        user_pass: pwd
      })
    });

    const responseData = await request.json();

    if (!request.ok) throw responseData;

    localStorage.setItem("token", responseData.token);
    feedbackEl.innerHTML = "<span class='sucesso'>" + responseData.api_message + "<br>Redirecionando para o painel...</span>";

    setTimeout(() => {
      window.location.href = "painel.html";
    }, 1000);
    
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

export default login;
