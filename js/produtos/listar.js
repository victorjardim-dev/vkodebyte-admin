import listarCategorias from "../categorias/listar-categorias.js";

const formatarData = (date) => new Date(date).toLocaleString().replace(", ", " às ");

const criarProdutos = async (BASE_URL_API, produtos) => {
  try {
    const categoriesProducts = await listarCategorias(BASE_URL_API);

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
            <p>Valor Total: <strong>${ parseFloat(product.stock * product.price).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</strong></p>
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

const listarProdutos = async (BASE_URL_API, feedbackEl, spinnerLoad) => {
  const TOKEN = localStorage.getItem("token");
  
  try {
    const request = await fetch(BASE_URL_API + "/produtos", {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    if (request.status === 204) {
      throw new Error("Não há produtos cadastrados.");
    }

    const dataProdutos = await request.json();

    const products = dataProdutos.products;

    const produtosEl = await criarProdutos(BASE_URL_API, products, feedbackEl);

    if (produtosEl.api_message_error) {
      feedbackEl.innerHTML = "<span class='erro'>" + produtosEl.api_message_error + "</span>";
    } else {
      if (window.location.pathname !== "/cadastro.html" && window.localStorage.getItem("token")) {
        feedbackEl.appendChild(produtosEl);
      }
    }

  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
      feedbackEl.innerHTML = "<span class='erro'>" + err.toString().replace("Error: ", "") + "</span>";
    } else {
      feedbackEl.innerHTML = "<span>" + err.toString().replace("Error: ", "") + "</span>";
    }
  }
  spinnerLoad.classList.remove("ativo");
}

export default listarProdutos;
