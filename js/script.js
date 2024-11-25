import listarProdutos from "./produtos/listar.js";
import cadastrarProduto from "./produtos/criar.js";
import deletarProduto from "./produtos/deletar.js";
import editarProduto from "./produtos/editar.js";
import listarCategorias from "./categorias/listar-categorias.js";
import newCategory from "./categorias/criar-categoria.js";
import deletarCategoria from "./categorias/deletar-categoria.js";
import zerarTabela from "./produtos/zerar-tabela.js";
import pesquisar from "./produtos/pesquisar.js";
import listarPedidos from "./pedidos/listar.js";
import getTotalProducts from "./produtos/total.js";

// const BASE_URL_API = "http://104.234.63.58:3000";
const BASE_URL_API = "http://localhost:3000";
const feedbackEl = document.querySelector(".feedback");
const maximoProdutos = document.querySelector(".maximo-produtos");
const totalProdutos = document.querySelector(".total-produtos");
const spinnerLoad = document.querySelector("#spinner-container");

import auth from "../js/admin/auth.js";
import verifyToken from "./admin/verifyToken.js";
if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
  auth(BASE_URL_API, spinnerLoad);

  // Verifica token em minutos
  verifyToken(BASE_URL_API, 60);

  getTotalProducts(BASE_URL_API, maximoProdutos, totalProdutos);  
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

if (window.location.pathname === "/categorias.html") {
  listarCategorias(BASE_URL_API, feedbackEl);
  const categoryForm = document.querySelector("#categoryForm");
  if (categoryForm) {
    categoryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      newCategory(BASE_URL_API, categoryForm[0], feedbackEl, spinnerLoad);
      activateFunctions();
      hideFeedBack();
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

if (window.location.pathname === "/pedidos.html") {
  console.log(window.location.pathname);
  listarPedidos(BASE_URL_API, feedbackEl, spinnerLoad);
}

function activateFunctions() {
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
        btn.addEventListener("click", async (event) => {
          const codigo_produto = event.target.offsetParent.id;
          const msg = `Deseja deletar o produto?\nCódigo do produto: ${codigo_produto}`;
          if (confirm(msg)) {
            try {
              const delPrdo = await deletarProduto(BASE_URL_API, codigo_produto, index);
              const delError = delPrdo;

              if (delError.error) {
                throw delError;
              }

              alert("Produto deletado com sucesso!");
              window.location.reload();

            } catch (err) {
              if (err.error) {
                alert(err.error[0] + "\n" + (err.error[1] || ""));
              } else {
                alert(err);
              }
            }
          }
        });
      });
    }

    const btnExcluirCategoria = document.querySelectorAll(".excluir-categoria");
    if (btnExcluirCategoria.length > 0) {
      btnExcluirCategoria.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
          const codigo_produto = event.target.id;
          const msg = `Deseja deletar a categoria #${codigo_produto} ?`;
          if (confirm(msg)) {
            try {
              const delPrdo = await deletarCategoria(BASE_URL_API, codigo_produto);
              const delError = delPrdo;

              if (delError.error) {
                throw delError;
              }
              
              feedbackEl.innerHTML = "<span class='sucesso'>" + delError.api_message + "</span>";
              listarCategorias(BASE_URL_API, feedbackEl);
              activateFunctions();

            } catch (err) {
              if (Array.isArray(err.error)) {
                const errArr = err.error;
                feedbackEl.innerHTML = "<span class='erro'>" + errArr[0] + " <br> " + errArr[1] + "</span>";
              } else {
                feedbackEl.innerHTML = "<span class='erro'>" + err.error + "</span>";
              }
            }
          }
        });
      });
    }

  }, 500);
}

activateFunctions();

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

// const btnZerar = document.querySelector(".zerar-tabela-produtos");
// if (btnZerar) {
//   btnZerar.addEventListener("click", async (event) => {
//     event.preventDefault();
//     const msg = `Deseja deletar todos os produtos?`;
//     if (confirm(msg)) {
//       try {
//         const delPrdo = await zerarTabela(BASE_URL_API);
//         const delError = delPrdo;

//         if (delError.error) {
//           throw delError;
//         }

//         alert(delPrdo.api_message);
//         // window.location.reload();

//       } catch (err) {
//         if (err.error) {
//           alert(err.error[0] + "\n" + (err.error[1] || ""));
//         } else {
//           alert(err);
//         }
//       }
//     }
//     spinnerLoad.classList.remove("ativo");
//   });
// }

function hideFeedBack() {
  // setTimeout(() => {
  //   feedbackEl.innerHTML = "";
  // }, 3000);
}

const anoAtual = document.getElementById("ano-atual");
anoAtual.innerHTML = new Date().getFullYear();

// LOGIN
import login from "./admin/login.js";
import logout from "./admin/logout.js";
import dashPainel from "./admin/dashboard.js";

const formLogin = document.getElementById("loginForm");
const bntLogout = document.getElementById("btn-logout");

if (formLogin) {
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Logando...");
    login(BASE_URL_API, feedbackEl, spinnerLoad);
  });
}

if (bntLogout) {
  bntLogout.addEventListener("click", logout);
}

if (window.location.pathname === "/painel.html") {
  async function formatarDataComHora(data) {
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    // const cidade = localAtual.city;
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");
    const segundos = String(data.getSeconds()).padStart(2, "0");

    return `${dia} de ${mes} de ${ano} - ${horas}:${minutos}`;
  }
  const dataAtualSaudacao = document.querySelector(".dia-atual-saudacao");
  dashPainel(BASE_URL_API);
  dataAtualSaudacao.innerHTML = await formatarDataComHora(new Date());
}
// LOGIN
