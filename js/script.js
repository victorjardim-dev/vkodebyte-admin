import auth from "../js/admin/auth.js";
import verifyToken from "./admin/verifyToken.js";

import admin from "./admin/admin-index.js";
import categyInit from "./categorias/categorias-index.js";
import produtosInit from "./produtos/produtos-index.js";
import pedidosInit from "./pedidos/pedidos-index.js";

import getTotalProducts from "./produtos/total-produtos.js";
import loadingSpinnerInit from "./activeLoadSpinner.js";
import activateBtnsActions from "./activateBtnsActions.js";
import initSearch from "./search.js";

const feedbackEl = document.querySelector(".feedback");
const maximoProdutos = document.querySelector(".maximo-produtos");
const totalProdutos = document.querySelector(".total-produtos");
const spinnerLoad = document.querySelector("#spinner-container");


if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
  auth();
  verifyToken(60);
  getTotalProducts(maximoProdutos, totalProdutos);
}

// Inicia Admin
admin(spinnerLoad);

// Inicia Categorias
categyInit(spinnerLoad);

// Inicia Produtos;
produtosInit(feedbackEl, spinnerLoad, maximoProdutos, totalProdutos);

// Inicia Ações dos Botões
activateBtnsActions(feedbackEl, spinnerLoad);

// Lista pedidos
pedidosInit(feedbackEl, spinnerLoad);

// Ativar loadingSpinner nos links e botões
loadingSpinnerInit(spinnerLoad);

// Ativa a procuda de produto
initSearch();

const anoAtual = document.getElementById("ano-atual");
anoAtual.innerHTML = new Date().getFullYear();
