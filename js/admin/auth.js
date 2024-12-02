import vkGetFetch from "../vkGetFetch.js";

const auth = async () => {
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
          const responseData = await vkGetFetch("/admin/painel");

          if (responseData.api_message_error) {
            throw responseData
          }

          console.log("Autorizado.");
          maskContent.classList.remove("ativo");

          return responseData;

        } catch (err) {
          localStorage.removeItem("token");
          aviso.innerHTML = err.api_message_error || "Seção Expirada";
        }
      }
    }
  }

}

export default auth;
