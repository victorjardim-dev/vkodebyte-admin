import vkGetFetch from "../vkGetFetch.js";

const formateDate = (date) => new Date(date).toLocaleString().replace(", ", " às ");

const createOrders = async (orders) => {  
  const divPrincipal = document.createElement("div");
  divPrincipal.classList.add("container-produtos");

  orders.map(order => {
    divPrincipal.innerHTML += `
      <div class="pedidos" id="${order.code_order}">
        <h2>#${order.code_order}</h2>
        <ul>
          <li>Quantidade: ${order.quantity}</li>
          <li>Preço Unitário: ${order.unit_price}</li>
          <li>Valor Total: ${order.total}</li>
          <li>Data do Pedido: ${order.order_date ? formateDate(order.order_date) : "-"}</li>
          <li>Última Atualização: ${order.order_update_date ? formateDate(order.order_update_date) : "-"}</li>
          <li>Status: ${order.order_status}</li>
          <li>Observações: ${order.notes ? order.notes : "Não há observações para o pedido."}</li>
        </ul>
      </div>
    `;
  }).join("");

  return divPrincipal;
}

const listOrders = async (feedbackEl, spinnerLoad) => {
  try {
    const responseData = await vkGetFetch("/pedidos");
    
    if (responseData === "No Content") {
      throw new Error("Não há pedidos.");
    }
    
    const orders = responseData.orders;

    const ordersEl = await createOrders(orders);

    feedbackEl.appendChild(ordersEl);

  } catch (err) {
    if (Array.isArray(err.api_message_error)) {
      const errArr = err.api_message_error;
      const msg1 = errArr[0] ? errArr[0] : "";
      feedbackEl.innerHTML = "<span class='erro'>" + msg1 + " <br> " + errArr[1] || "" + "</span>";
    } else {
      if (err.toString().includes("fetch")) {
        err = "Não foi possível se conectar ao servidor.";
        feedbackEl.innerHTML = "<span class='erro'>" + err.toString().replace("Error: ", "") + "</span>";
      } else {
        feedbackEl.innerHTML = "<span>" + err.toString().replace("Error: ", "") + "</span>";
      }
    }
  }
  spinnerLoad.classList.remove("ativo");
}

export default listOrders;
