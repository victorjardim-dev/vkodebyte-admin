import listarCategorias from "../listar-categorias.js";

const formatarData = (date) => new Date(date).toLocaleString().replace(", ", " às ");

const criarPedidos = async (BASE_URL_API, produtos) => {  
  const divPrincipal = document.createElement("div");
  divPrincipal.classList.add("container-produtos");

  produtos.map(order => {
    divPrincipal.innerHTML += `
      <div class="pedidos" id="${order.code_order}">
        <h2>${order.code_order}</h2>
        <ul>
          <li>Quantidade: ${order.quantity}</li>
          <li>Preço Unitário: ${order.unit_price}</li>
          <li>Valor Total: ${order.total}</li>
          <li>Data do Pedido: ${order.order_date ? formatarData(order.order_date) : "-"}</li>
          <li>Última Atualização: ${order.order_update_date ? formatarData(order.order_update_date) : "-"}</li>
          <li>Status: ${order.order_status}</li>
          <li>Observações: ${order.notes ? order.notes : "Não há observações para o pedido."}</li>
        </ul>
      </div>
    `;
  }).join("");

  return divPrincipal;
}

const listarPedidos = async (BASE_URL_API, feedbackEl, spinnerLoad) => {
  try {
    const request = await fetch(BASE_URL_API + "/pedidos");

    if (request.status === 204) {
      throw new Error("Não há pedidos.");
    }

    const dataPedidos = await request.json();

    const orders = dataPedidos.orders;

    const pedidosEl = await criarPedidos(BASE_URL_API, orders);

    feedbackEl.appendChild(pedidosEl);

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

export default listarPedidos;
