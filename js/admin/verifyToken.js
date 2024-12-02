import auth from "./auth.js";

let t;
const verifyToken = (time) => {
  t = setInterval(async () => {
    const TOKEN = localStorage.getItem("token");
    console.log("Verificando token...");
    if (!TOKEN) {
      console.log("Token não existe.");
      clearInterval(t);
    } else {
      await auth();
      console.log("Token válido");
    }
  }, (time * 1000) * 60);
}

export default verifyToken;
