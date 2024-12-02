import auth from "../js/admin/auth.js";
import verifyToken from "./admin/verifyToken.js";

import admin from "./admin/admin-index.js";
import categyInit from "./categorias/categorias-index.js";
import produtosInit from "./produtos/produtos-index.js";
import pedidosInit from "./pedidos/pedidos-index.js";

import getTotalProducts from "./produtos/total-produtos.js";
import loadingSpinnerInit from "./activeLoadSpinner.js";
import activateBtnsActions from "./activateBtnsActions.js";

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
admin(feedbackEl, spinnerLoad);

// Inicia Categorias
categyInit(feedbackEl, spinnerLoad);

// Inicia Produtos;
produtosInit(feedbackEl, spinnerLoad);

// Inicia Ações dos Botões
activateBtnsActions(feedbackEl, spinnerLoad);

// Lista pedidos
pedidosInit(feedbackEl, spinnerLoad);

// Ativar loadingSpinner nos links e botões
loadingSpinnerInit(spinnerLoad);

const anoAtual = document.getElementById("ano-atual");
anoAtual.innerHTML = new Date().getFullYear();
