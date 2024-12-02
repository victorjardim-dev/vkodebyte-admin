import listarCategorias from "./listar-categorias.js";
import newCategory from "./criar-categoria.js";

const categyInit = (feedbackEl) => {

  if (window.location.pathname === "/categorias.html") {
    listarCategorias(feedbackEl);
    const categoryForm = document.querySelector("#categoryForm");
    if (categoryForm) {
      categoryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        newCategory(BASE_URL_API, categoryForm[0], feedbackEl, spinnerLoad);
        activateBtnsActions(feedbackEl);
      });
    }
  }
}

export default categyInit;
