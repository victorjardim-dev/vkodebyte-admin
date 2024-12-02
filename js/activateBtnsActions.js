import deletarProduto from "./produtos/deletar-produto.js";
import deletarCategoria from "./categorias/deletar-categoria.js";
import deletarUsuario from "./admin/deletar-usuario.js";
import listarUsuarios from "./admin/listarUsuarios.js";
import listarCategorias from "./categorias/listar-categorias.js";
import listarProdutos from "./produtos/listar-produto.js";
import activeNotify from "./active-notify.js";

const activateBtnsActions = (feedbackEl, spinnerLoad) => {
  setTimeout(() => {
    const btnRedirectProduct = document.querySelectorAll("button.editar");
    if (btnRedirectProduct.length > 0) {
      btnRedirectProduct.forEach(btn => {
        btn.addEventListener("click", (event) => {
          spinnerLoad.classList.add("ativo");
          window.location.href = "/editar-produto.html?product_code=" + event.target.offsetParent.id;
        });
      });
    }

    const btnExcluirProduto = document.querySelectorAll("button.excluir");
    if (btnExcluirProduto.length > 0) {
      btnExcluirProduto.forEach((btn, index) => {
        btn.addEventListener("click", async (event) => {
          const codigo_produto = event.target.offsetParent.id;
          const msg = `Deseja deletar o produto?\nCódigo do produto: ${codigo_produto}`;
          if (confirm(msg)) {
            try {
              const delPrdo = await deletarProduto(codigo_produto, index);

              if (delPrdo.error) {
                throw delPrdo;
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
          const codigo_category = event.target.id;
          const msg = `Deseja deletar a categoria #${codigo_category} ?`;
          if (confirm(msg)) {
            try {
              const delCategory = await deletarCategoria(codigo_category);

              if (delCategory === "No Content") {
                throw delCategory;
              }

              if (delCategory.api_message_error) {
                throw delCategory.api_message_error;
              }

              activeNotify(delCategory.api_message, 1);
              listarCategorias();
              activateBtnsActions(spinnerLoad);

            } catch (err) {
              if (Array.isArray(err)) {
                activeNotify(err[0] + " <br> " + err[1], 2);
              } else {
                activeNotify(err.error, 2);
              }
            }
          }
        });
      });
    }

    const btnExcluirUsuarios = document.querySelectorAll(".excluir-usuarios");
    if (btnExcluirUsuarios.length > 0) {
      btnExcluirUsuarios.forEach(btn => {
        btn.addEventListener("click", async (event) => {
          const user_id = event.target.id;
          const msg = `Deseja deletar este usuário?`;
          if (confirm(msg)) {
            try {
              const delUser = await deletarUsuario(user_id);
              if (delUser.api_message_error) {
                throw delUser.api_message_error;
              }
              activeNotify(delUser.api_message, 1);
              listarUsuarios();
            } catch(err) {
              console.log(err);
              if (Array.isArray(err)) {
                activeNotify(err[0] + " <br> " + err[1], 2);
              } else {
                activeNotify(err, 2);
              }
            }
          }
        });
      })
    }

  }, 500);
}

export default activateBtnsActions;
