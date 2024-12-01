import admin from "./admin/admin-index.js";
import listOrders from "./pedidos/listar-pedidos.js";
import activateBtnsActions from "./activateBtnsActions.js";

const feedbackEl = document.querySelector(".feedback");
const maximoProdutos = document.querySelector(".maximo-produtos");
const totalProdutos = document.querySelector(".total-produtos");
const spinnerLoad = document.querySelector("#spinner-container");
const BASE_URL_API = "http://localhost:3000";

import listarProdutos from "./produtos/listar.js";
import cadastrarProduto from "./produtos/criar.js";
import editarProduto from "./produtos/editar.js";
import zerarTabela from "./produtos/zerar-tabela.js";
import pesquisar from "./produtos/pesquisar.js";
import getTotalProducts from "./produtos/total.js";

import auth from "../js/admin/auth.js";
import verifyToken from "./admin/verifyToken.js";
if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
  auth(BASE_URL_API, spinnerLoad);

  // Verifica token em minutos
  verifyToken(BASE_URL_API, 60);

  getTotalProducts(maximoProdutos, totalProdutos);
}

if (window.location.pathname === "/listagem.html") {
  listarProdutos(BASE_URL_API, feedbackEl, spinnerLoad);
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

import listarCategorias from "./categorias/listar-categorias.js";
import newCategory from "./categorias/criar-categoria.js";
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

// Ativar loadingSpinner nos links
const links = document.querySelectorAll("a");
links.forEach(link => {
  link.addEventListener("click", (event) => {
    const TOKEN = localStorage.getItem("token");

    if (event.target.parentNode.pathname === "/" || event.target.parentNode.pathname === "/index.html") {
      event.preventDefault();
      if (TOKEN) {
        window.location.href = "/painel.html";
      } else {
        window.location.href = "/";
      }
    }

    if (
      window.location.pathname === "/cadastro.html" ||
      window.location.pathname === "/pedidos.html" ||
      window.location.pathname === "/usuarios.html" ||
      window.location.pathname === "/editar.html" ||
      window.location.pathname === "/categorias.html"
    ) {
      if (TOKEN) {
        window.location.href = "/listagem.html";
      } else {
        window.location.href = "/";
      }
    }

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

const anoAtual = document.getElementById("ano-atual");
anoAtual.innerHTML = new Date().getFullYear();

// Inicia Admin
admin(feedbackEl, spinnerLoad);

activateBtnsActions(feedbackEl);

// Lista pedidos
if (window.location.pathname === "/pedidos.html") {
  listOrders(feedbackEl, spinnerLoad);
}
