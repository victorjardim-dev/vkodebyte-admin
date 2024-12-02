import listarCategorias from "./listar-categorias.js";
import newCategory from "./criar-categoria.js";
import activateBtnsActions from "../activateBtnsActions.js";

const categyInit = (feedbackEl, spinnerLoad) => {

  if (window.location.pathname === "/categorias.html") {
    listarCategorias(feedbackEl);
    const categoryForm = document.querySelector("#categoryForm");
    if (categoryForm) {
      categoryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        try {
          newCategory(event.target, feedbackEl, spinnerLoad);
          activateBtnsActions(feedbackEl);
        } catch (err) {
          console.log(err);
        }
      });
    }
  }
}

export default categyInit;
