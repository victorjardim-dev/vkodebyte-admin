const deletarProduto = async (BASE_URL_API, codigoProduto, index) => {
  try {
    const imagem = document.querySelectorAll(".produtos img");

    const request = await fetch(BASE_URL_API + "/produtos" + `/${codigoProduto}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        deleteImg: imagem[index].src.split("uploads/")[1]
      })
    });


    const responseDate = await request.json();

    console.log(responseDate);
  } catch (err) {
    if (err.toString().includes("fetch")) {
      err = "Não foi possível se conectar ao servidor.";
    }
    console.log(err);
  }
}

export default deletarProduto;
