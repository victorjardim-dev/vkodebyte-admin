function logout(spinnerLoad) {
  const msg = "Deseja realmente sair do sistema?";
  if (confirm(msg)) {
    localStorage.removeItem("token");
    window.location.href = "./";
  } else {
    setTimeout(() => {
      spinnerLoad.classList.remove("ativo");
    }, 100);
  }
}

export default logout;
