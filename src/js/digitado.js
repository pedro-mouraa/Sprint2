const btnConfirmar = document.getElementsByClassName("btnConfirmar")[0];
const btnCancelar = document.getElementsByClassName("btnCancelar")[0];



btnConfirmar.addEventListener("click", () => {

    window.location.href = "extracao.html";

});


btnCancelar.addEventListener("click", () => {

    window.location.href = "scan.html";

});
