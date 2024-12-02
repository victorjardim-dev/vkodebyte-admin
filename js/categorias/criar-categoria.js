import vkGetFetch from "../vkGetFetch.js";
import listarCategorias from "./listar-categorias.js";
import activeNotify from "../active-notify.js";

const newCategory = async (newCategoryForm, spinnerLoad) => {
  const newCategory = {
    category_name: newCategoryForm[0].value
  }

  try {
    const responseData = await vkGetFetch("/categorias", "post", newCategory);

    if (responseData.api_message_error) {
      throw responseData.api_message_error;
    }
    
    activeNotify(responseData.api_message, 1);
    listarCategorias();

  } catch (err) {    
    if (Array.isArray(err)) {
      const errArr = err;
      activeNotify(errArr[0] + " <br> " + errArr[1], 2);
    } else {
      activeNotify(err, 2);
    }
  }
  newCategoryForm.reset();
  spinnerLoad.classList.remove("ativo");
}

export default newCategory;
