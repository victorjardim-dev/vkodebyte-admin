export const BASE_URL_API = "http://localhost:3000";
const loginRoute = "/admin/login";

const vkGetFetch = async (route = "", typeMethod = "GET", bodyData = {}) => {
  const TOKEN = localStorage.getItem("token");
  const requestOptions = {};

  const baseURL = `${BASE_URL_API}${route}`;

  requestOptions.method = typeMethod;

  if (route !== loginRoute) {
    requestOptions.headers = {
      "auth-api-token": `Bearer ${TOKEN}`
    }
  }

  if (
    typeMethod.toLowerCase() === "post" ||
    typeMethod.toLowerCase() === "put" ||
    typeMethod.toLowerCase() === "delete" 
  ) {
    if (bodyData instanceof FormData) {
      requestOptions.body = bodyData;
    } else {
      requestOptions.headers = {
        ...requestOptions.headers,
        "Content-Type": "application/json"
      }
      requestOptions.body = JSON.stringify(bodyData);
    }
  }

  return await fetch(baseURL, requestOptions)
    .then(r => {
      if (r.status === 204) throw r.statusText;

      return r.json();
    })
    .then(data => data).catch(err => err);
}

export default vkGetFetch;
