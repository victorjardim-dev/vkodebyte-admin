import listarCategorias from "../categorias/listar-categorias.js";
import vkGetFetch, { BASE_URL_API } from "../vkGetFetch.js";

const pesquisar = async (id_produto, feedbackEl) => {
  const nomeProduto = document.querySelector(".nome-produto-editar");

  try {
    const dados = await vkGetFetch(`/produtos/${id_produto}`);
    
    await listarCategorias(feedbackEl);

    if (nomeProduto) {
      nomeProduto.innerHTML += dados.name + " - " + parseFloat(dados.price).toLocaleString("pt-br", { style: "currency", currency: "BRL" });
    }

    document.getElementById("img_produto").src = `${BASE_URL_API}/uploads/${dados.url_image}`;
    document.getElementById("name").value = dados.name;
    document.getElementById("description").value = dados.description;
    document.getElementById("price").value = dados.price;
    document.getElementById("stock").value = dados.stock;
    document.getElementById("category_id").value = dados.category_id;
  } catch (err) {
    console.log(err);
  }
}

export default pesquisar;
