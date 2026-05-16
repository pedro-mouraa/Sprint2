const videoElemento = document.getElementById("video");
const botaoFoto = document.querySelector(".btnTirarFoto");
const canvas = document.getElementById("canvas");

async function configurarCamera(){
    try{
        const midia = await navigator.mediaDevices.getUserMedia({
            video:{
                facingMode:"environment"
            },
        });
        videoElemento.srcObject = midia;
        await videoElemento.play();
    }catch(erro){
        console.error("Erro ao acessar câmera:", erro);
    }
}

configurarCamera();

botaoFoto.addEventListener("click", async () => {
    const context = canvas.getContext("2d");
    canvas.width = videoElemento.videoWidth;
    canvas.height = videoElemento.videoHeight;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.filter = "contrast(1.4) grayscale(1)";
    context.drawImage(videoElemento, 0, 0, canvas.width, canvas.height);

    botaoFoto.disabled = true;

    try{
        const { data:{ text } } = await Tesseract.recognize(canvas, "por");

        const textoFinal = text.trim();

        alert(textoFinal.length > 0 ? textoFinal : "Nenhum texto encontrado.");

        window.location.href = "./extracao.html";

    }catch(erro){
        console.error(erro);
        alert("Erro ao processar texto.");
    }finally{
        botaoFoto.disabled = false;
    }
});