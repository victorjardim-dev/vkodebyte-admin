import vkGetFetch from "../vkGetFetch.js";

const getTotalProducts = async (maximoProdutos, totalProdutos,) => {

  const dataProdutos = await vkGetFetch("/produtos");

  if (maximoProdutos && totalProdutos) {
    if (dataProdutos !== "No Content") {
      maximoProdutos.innerHTML = dataProdutos.allowed_max_products;
      totalProdutos.innerHTML = dataProdutos.total_products;
    } else {
      maximoProdutos.innerHTML = "-";
      totalProdutos.innerHTML = "-";
    }
  }
}

export default getTotalProducts;
