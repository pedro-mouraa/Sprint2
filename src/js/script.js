const usuario = prompt("Digite seu usuário:");
const senha = prompt("Digite sua senha:");
 
if (!usuario || !senha) {
    alert("Acesso negado! Usuário e senha são obrigatórios.");
    document.body.innerHTML = "<h2 style='text-align:center; margin-top: 40px;'>Acesso negado. Recarregue a página para tentar novamente.</h2>";
} else {
    alert(`Bem-vindo, ${usuario}!`);

}

const videoElemento = document.getElementById("video");
const botaoFoto = document.querySelector(".btnTirarFoto");
const canvas = document.getElementById("canvas");

async function configurarCamera() {
    try {
        const midia = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            },
        });

        videoElemento.srcObject = midia;
        await videoElemento.play();

    } catch (erro) {
        console.error("Erro ao acessar câmera:", erro);
    }
}

configurarCamera();

botaoFoto.addEventListener("click", () => {

    const context = canvas.getContext("2d");

    canvas.width = videoElemento.videoWidth;
    canvas.height = videoElemento.videoHeight;

    context.setTransform(1, 0, 0, 1, 0, 0);

    context.filter = "contrast(1.2) grayscale(0.1)";

    context.drawImage(videoElemento, 0, 0, canvas.width, canvas.height);
});