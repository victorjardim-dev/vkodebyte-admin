const auth = async (BASE_URL_API, spinnerLoad) => {
  const TOKEN = localStorage.getItem("token");
  const maskContent = document.querySelector(".mask-content-token");
  console.log("Autorizando...");
  
  if (maskContent) {
    const aviso = maskContent.querySelector(".aviso");
    maskContent.classList.add("ativo");
    if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
      if (!TOKEN) {
        aviso.innerHTML = "Acesso Negado!";
        console.log("Acesso Negado!");
      } else {
        try {
          const request = await fetch(BASE_URL_API + "/admin/painel", {
            headers: { Authorization: `Bearer ${TOKEN}` },
          });

          const responseData = await request.json();

          if (!request.ok) {
            throw responseData
          }

          console.log("Autorizado.");
          maskContent.classList.remove("ativo");

          return responseData;

        } catch (err) {
          console.log(err);
          localStorage.removeItem("token");
          aviso.innerHTML = err.api_message_error || "Seção Expirada";
        }
      }
    }
  }

}

export default auth;
