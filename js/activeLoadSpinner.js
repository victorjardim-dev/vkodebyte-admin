const loadingSpinnerInit = (spinnerLoad) => {
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", (event) => {
      const TOKEN = localStorage.getItem("token");

      if (event.target.parentNode.pathname === "/" || event.target.parentNode.pathname === "/index.html") {
        event.preventDefault();
        if (TOKEN) {
          window.location.href = "/painel.html";
        } else {
          window.location.href = "/";
        }
      }

      if (
        window.location.pathname === "/novo-produto.html" ||
        window.location.pathname === "/pedidos.html" ||
        window.location.pathname === "/usuarios.html" ||
        window.location.pathname === "/editar-produto.html" ||
        window.location.pathname === "/categorias.html"
      ) {
        if (TOKEN) {
          window.location.href = "/listar-produtos.html";
        } else {
          window.location.href = "/";
        }
      }

      spinnerLoad.classList.add("ativo");
    });
  });

  // Ativar loadingSpinner nos botões
  const btns = document.querySelectorAll("button");
  setTimeout(() => {
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        spinnerLoad.classList.add("ativo");
      });
    });
  }, 500);
}

export default loadingSpinnerInit;
