import listarProdutos from "./listar-produto.js";
import cadastrarProduto from "./criar-produto.js";
import editarProduto from "./editar-produto.js";
import pesquisar from "./pesquisar-produto.js";
import listarCategorias from "../categorias/listar-categorias.js";

const produtosInit = (feedbackEl, spinnerLoad) => {
  if (window.location.pathname === "/listar-produtos.html") {
    listarProdutos(feedbackEl, spinnerLoad);
  }

  if (window.location.pathname === "/novo-produto.html") {
    listarCategorias();
    const cadastroForm = document.querySelector("#cadastroForm");

    cadastroForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      cadastrarProduto(formData, spinnerLoad);
    });
  }

  if (window.location.pathname === "/editar-produto.html") {
    const codigo_produto = window.location.search.split("=")[1];

    if (codigo_produto) {
      const editarForm = document.querySelector("#editarForm");
      pesquisar(codigo_produto, feedbackEl);

      editarForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        editarProduto(formData, codigo_produto, feedbackEl, spinnerLoad);
      });
    } else {
      window.location.href = "./";
    }
  }
}

export default produtosInit;
