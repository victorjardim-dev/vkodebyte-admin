import listarCategorias from "./listar-categorias.js";
import newCategory from "./criar-categoria.js";
import activateBtnsActions from "../activateBtnsActions.js";

const categyInit = (spinnerLoad) => {

  if (window.location.pathname === "/categorias.html") {
    listarCategorias();
    const categoryForm = document.querySelector("#categoryForm");
    if (categoryForm) {
      categoryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        try {
          newCategory(event.target, spinnerLoad);
          activateBtnsActions(spinnerLoad);
        } catch (err) {
          console.log(err);
        }
      });
    }
  }
}

export default categyInit;
