const getTotalProducts = async (BASE_URL_API, maximoProdutos, totalProdutos,) => {
  const TOKEN = localStorage.getItem("token");

  const request = await fetch(BASE_URL_API + "/produtos", {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
  
  if (request.status !== 204) {
    const dataProdutos = await request.json();

    if (maximoProdutos && totalProdutos) {
      maximoProdutos.innerHTML = dataProdutos.allowed_max_products;
      totalProdutos.innerHTML = dataProdutos.total_products;
    }
  }
}

export default getTotalProducts;
