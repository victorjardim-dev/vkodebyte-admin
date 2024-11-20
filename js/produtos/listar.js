import listarCategorias from "../listar-categorias.js";

const formatarData = (date) => new Date(date).toLocaleString().replace(", ", " às ");

const criarProdutos = async (BASE_URL_API, produtos) => {
  const categoriasProducts = await listarCategorias(BASE_URL_API);
  
  const divPrincipal = document.createElement("div");
  divPrincipal.classList.add("container-produtos");

  produtos.map(product => {
    divPrincipal.innerHTML += `
      <div class="produtos" id="${product.product_code}">
        <h2>${product.name}</h2>
        <figure>
          <img src="${BASE_URL_API}/uploads/${product.url_image}" alt="${product.url_image ? product.name : ""}" />
          <figcaption>
            <span>Ref: <strong>${product.product_code}</strong></span>
            <span>Preço: ${parseInt(product.price).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</span>
          </figcaption>
        </figure>
        <div class="produto-infos">
          <p>Estoque: <strong>${product.stock}</strong></p>
          <p>Valor Total: <strong>${ parseFloat(product.stock * product.price).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</strong></p>
          <p>Status: <strong class="${product.product_status ? "disponivel" : "indisponivel"}">${product.product_status ? "Disponível" : "Indisponível"}</strong></p>
          <p>Categoria: <strong>${categoriasProducts[product.category_id - 1].category_name}</strong></p>
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
}

const listarProdutos = async (BASE_URL_API, maximoProdutos, totalProdutos, feedbackEl, spinnerLoad) => {
  try {
    const request = await fetch(BASE_URL_API + "/produtos");

    if (request.status === 204) {
      throw new Error("Não há produtos cadastrados.");
    }

    const dataProdutos = await request.json();

    const products = dataProdutos.products;

    maximoProdutos.innerHTML = dataProdutos.allowed_max_products;
    totalProdutos.innerHTML = dataProdutos.total_products;

    const produtosEl = await criarProdutos(BASE_URL_API, products);

    feedbackEl.appendChild(produtosEl);

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
