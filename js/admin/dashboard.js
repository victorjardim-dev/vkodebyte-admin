import vkGetFetch from "../vkGetFetch.js";

const dashPainel = async () => {
  const lblUser = document.getElementById("user-logado");

  try {
    const responseData = await vkGetFetch("/admin/painel");

    if (lblUser) {
      lblUser.innerHTML = responseData.api_message;
    }

  } catch (err) {
    console.log(err);
  }
}

export default dashPainel;
