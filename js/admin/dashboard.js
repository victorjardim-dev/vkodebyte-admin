const dashPainel = async(BASE_URL_API) => {
  const lblUser = document.getElementById("user-logado");
  const TOKEN = localStorage.getItem("token");

  try {
    const request = await fetch(BASE_URL_API + "/admin/painel", {
      headers: { "auth-api-token": `Bearer ${TOKEN}` },
    });
    const responseData = await request.json();

    if (lblUser) {
      lblUser.innerHTML = responseData.api_message;
    }

  } catch (err) {
    console.log(err);
  }
}

export default dashPainel;
