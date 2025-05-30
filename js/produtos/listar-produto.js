import activeNotify from "../active-notify.js";
import listarCategorias from "../categorias/listar-categorias.js";
import vkGetFetch, { BASE_URL_API } from "../vkGetFetch.js";

const formatarData = (date) => new Date(date).toLocaleString().replace(", ", " às ");

const criarProdutos = async (produtos) => {
  try {
    const categoriesProducts = await listarCategorias();

    if ( categoriesProducts.api_message_error ) {
      throw categoriesProducts;
    }

    const divPrincipal = document.createElement("div");
    divPrincipal.classList.add("container-produtos");
    
    produtos.sort((a,b) => b.id-a.id).map(product => {
      const categoryName = categoriesProducts.filter((category) => category.id === product.category_id);

      divPrincipal.innerHTML += `
        <div class="produtos" id="${product.product_code}">
          <h2>${product.name}</h2>
          <figure>
            <img src="${BASE_URL_API}/uploads/${product.url_image}" alt="${product.url_image ? product.name : ""}" />
            <figcaption>
              <span>Ref: <strong>${product.product_code}</strong></span>
              <span>Preço: <strong>${parseFloat(product.price).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</strong></span>
            </figcaption>
          </figure>
          <div class="produto-infos">
            <p>Estoque: <strong>${product.stock}</strong></p>
            <p>Valor em Estoque: <strong>${ parseFloat(product.stock * product.price).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</strong></p>
            <p>Status: <strong class="${product.product_status ? "disponivel" : "indisponivel"}">${product.product_status ? "Disponível" : "Indisponível"}</strong></p>
            <p>Categoria: <strong>${categoryName[0].category_name}</strong></p>
            <p>Criado por: <strong>${product.created_by}</strong></p>
            <p>Data de Registro: <strong>${formatarData(product.registration_date)}</strong></p>
            <p>Ultima Atualização: <strong>${product.update_date ? formatarData(product.update_date) : "-"}</strong></p>
          </div>
          <div class="produto-acoes">
            <button class="btn-principal editar">Editar</button>
            <button class="btn-secundario excluir">Excluir</button>
          </div>
        </div>
      `;
    }).join("");
  
    return divPrincipal;
  } catch (err) {
    return err;
  }
}

const listarProdutos = async (feedbackEl, spinnerLoad) => {  
  try {
    const dataProdutos = await vkGetFetch("/produtos");

    if (dataProdutos === "No Content") {
      throw new Error("Não há produtos.");
    }

    const products = dataProdutos.products;

    const produtosEl = await criarProdutos(products, feedbackEl);

    if (produtosEl.api_message_error) {
      activeNotify(produtosEl.api_message_error, 2);
    } else {
      if (window.location.pathname !== "/novo-produto.html" && window.localStorage.getItem("token")) {
        feedbackEl.appendChild(produtosEl);
      }
    }

  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
      activeNotify(err.toString().replace("Error: ", ""), 2);
    } else {
      activeNotify(err.toString().replace("Error: ", ""), 2);
    }
  }
  spinnerLoad.classList.remove("ativo");
}

export default listarProdutos;
