import listarProdutos from "./produtos/listar.js";
import cadastrarProduto from "./produtos/criar.js";
import deletarProduto from "./produtos/deletar.js";
import editarProduto from "./produtos/editar.js";
import listarCategorias from "./listar-categorias.js";
import pesquisar from "./produtos/pesquisar.js";

// const BASE_URL_API = "http://104.234.63.58:3000";
const BASE_URL_API = "http://localhost:3000";
const feedbackEl = document.querySelector(".feedback");
const maximoProdutos = document.querySelector(".maximo-produtos");
const totalProdutos = document.querySelector(".total-produtos");
const spinnerLoad = document.querySelector("#spinner-container");

if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
  listarProdutos(BASE_URL_API, maximoProdutos, totalProdutos, feedbackEl, spinnerLoad);
}

if (window.location.pathname === "/cadastro.html") {
  listarCategorias(BASE_URL_API, feedbackEl);
  const cadastroForm = document.querySelector("#cadastroForm");

  cadastroForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    cadastrarProduto(BASE_URL_API, formData, feedbackEl, spinnerLoad);
  });
}

if (window.location.pathname === "/editar.html") {
  const codigo_produto = window.location.search.split("=")[1];

  if (codigo_produto) {
    const editarForm = document.querySelector("#editarForm");
    pesquisar(BASE_URL_API, codigo_produto, feedbackEl);

    editarForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);

      editarProduto(BASE_URL_API, formData, codigo_produto, feedbackEl, spinnerLoad);
    });
  } else {
    window.location.href = "./";
  }
}

setTimeout(() => {
  const btnRedirectEditar = document.querySelectorAll("button.editar");
  if (btnRedirectEditar) {
    btnRedirectEditar.forEach(btn => {
      btn.addEventListener("click", (event) => {
        spinnerLoad.classList.add("ativo");
        window.location.href = "/editar.html?product_code=" + event.target.offsetParent.id;
      });
    });
  }

  const btnExcluir = document.querySelectorAll("button.excluir");
  if (btnExcluir) {
    btnExcluir.forEach((btn, index) => {
      btn.addEventListener("click", (event) => {
        const codigo_produto = event.target.offsetParent.id;
        const msg = `Deseja deletar o produto?\nCódigo do produto: ${codigo_produto}`;
        if (confirm(msg)) {
          deletarProduto(BASE_URL_API, codigo_produto, index);
          alert("Produto deletado com sucesso!");
          window.location.reload();
        }
      });
    });
  }

}, 500);

// Ativar loadingSpinner nos links
const links = document.querySelectorAll("a");
links.forEach(link => {
  link.addEventListener("click", () => {
    spinnerLoad.classList.add("ativo");
  });
});

// Ativar loadingSpinner nos botões
const btns = document.querySelectorAll("button");
setTimeout(() => {
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      spinnerLoad.classList.add("ativo");
    });
  });
}, 500);
