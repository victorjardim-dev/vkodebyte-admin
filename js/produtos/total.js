const getTotalProducts = async (BASE_URL_API, maximoProdutos, totalProdutos,) => {
  const request = await fetch(BASE_URL_API + "/produtos");
  
  if (request.status !== 204) {
    const dataProdutos = await request.json();
    
    maximoProdutos.innerHTML = dataProdutos.allowed_max_products;
    totalProdutos.innerHTML = dataProdutos.total_products;
  }
}

export default getTotalProducts;
