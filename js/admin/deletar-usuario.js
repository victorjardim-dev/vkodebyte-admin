import vkGetFetch from "../vkGetFetch.js";

const deletarUsuario = async (idUsuarios) => {
  try {
    const responseData = await vkGetFetch(`/admin/usuarios/${idUsuarios}`, "delete");

    if (responseData.api_message_error) {
      throw responseData;
    }

    return responseData;

  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
    }
    return err;
  }
}

export default deletarUsuario;
