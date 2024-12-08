const initSearch = () => {
  /// Pesquisar produto
  const inputSearch = document.getElementById("pesquisar");
  const inputSearchType = document.getElementById("tipoPesquisa");
  if (inputSearch && inputSearchType && window.location.pathname === "/listar-produtos.html") {
    inputSearchType.value = "";
    inputSearch.setAttribute("disabled", "disabled");

    setTimeout(() => {
      const productsCards = document.querySelectorAll(".container-produtos .produtos");

      const searchProduct = (selectorSearch) => {
        if (inputSearch.value !== "" && inputSearch.value.length >= 3) {
          productsCards.forEach(card => {
            const type = card.querySelector(selectorSearch).textContent.toLowerCase();
            const searchText = inputSearch.value.toLowerCase();
            if (!type.includes(searchText)) {
              card.style.display = "none";
            } else {
              card.style.display = "initial";
              card.removeAttribute("style");
            }
          });

        } else {
          for (let card of productsCards) {
            card.style.display = "initial";
            card.removeAttribute("style");
          }
        }
      }

      inputSearchType.addEventListener("change", () => {
        if (inputSearchType.value !== "") {
          let selectorSearch = "";
          if (inputSearchType.value === "nome") {
            selectorSearch = "h2";
            inputSearch.setAttribute("placeholder", "Digite o nome do produto");
          } else if (inputSearchType.value === "ref") {
            inputSearch.setAttribute("placeholder", "Digite os últimos 3 dígitos de referência");
            selectorSearch = "figcaption span strong";
          } else if (inputSearchType.value === "categoria") {
            inputSearch.setAttribute("placeholder", "Digite a categoria do produto");
            selectorSearch = ".produto-infos p:nth-of-type(4) strong";
          } else {
            return;
          }

          inputSearch.removeAttribute("disabled");
          inputSearch.addEventListener("input", () => {
            searchProduct(selectorSearch);
          });
        } else {
          inputSearch.removeAttribute("placeholder");
          inputSearch.setAttribute("disabled", "disabled");
        }
      });
    }, 500);
  }
}

export default initSearch;
