import deletarProduto from "./produtos/deletar-produto.js";
import deletarCategoria from "./categorias/deletar-categoria.js";
import listarCategorias from "./categorias/listar-categorias.js";

const activateBtnsActions = (feedbackEl, spinnerLoad) => {
  setTimeout(() => {
    const btnRedirectEditar = document.querySelectorAll("button.editar");
    if (btnRedirectEditar.length > 0) {
      btnRedirectEditar.forEach(btn => {
        btn.addEventListener("click", (event) => {
          spinnerLoad.classList.add("ativo");
          window.location.href = "/editar.html?product_code=" + event.target.offsetParent.id;
        });
      });
    }

    const btnExcluir = document.querySelectorAll("button.excluir");
    if (btnExcluir.length > 0) {
      btnExcluir.forEach((btn, index) => {
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

              feedbackEl.innerHTML = "<span class='sucesso'>" + delCategory.api_message + "</span>";
              listarCategorias(feedbackEl);
              activateBtnsActions(feedbackEl);

            } catch (err) {
              if (Array.isArray(err)) {
                feedbackEl.innerHTML = "<span class='erro'>" + err[0] + " <br> " + err[1] + "</span>";
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

export default activateBtnsActions;
