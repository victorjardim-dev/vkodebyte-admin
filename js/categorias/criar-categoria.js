import vkGetFetch from "../vkGetFetch.js";
import listarCategorias from "./listar-categorias.js";

const newCategory = async (newCategoryForm, feedbackEl, spinnerLoad) => {
  const newCategory = {
    category_name: newCategoryForm[0].value
  }

  try {
    const responseData = await vkGetFetch("/categorias", "post", newCategory);

    if (responseData.api_message_error) {
      throw responseData.api_message_error;
    }
  
    feedbackEl.innerHTML = "<span class='sucesso'>" + responseData.api_message + "</span>";
    listarCategorias(feedbackEl);

  } catch (err) {    
    if (Array.isArray(err)) {
      const errArr = err;
      feedbackEl.innerHTML = "<span class='erro'>" + errArr[0] + " <br> " + errArr[1] + "</span>";
    } else {
      feedbackEl.innerHTML = "<span class='erro'>" + err + "</span>";
    }
  }
  newCategoryForm.reset();
  spinnerLoad.classList.remove("ativo");
}

export default newCategory;
