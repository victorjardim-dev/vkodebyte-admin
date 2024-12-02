import listOrders from "./listar-pedidos.js";

const pedidosInit = (feedbackEl, spinnerLoad) => {
  if (window.location.pathname === "/pedidos.html") {
    listOrders(feedbackEl, spinnerLoad);
  }
}

export default pedidosInit;
