document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".card").forEach(card => {
        const flipContainer = card.querySelector(".flip-container");
        const flipper = flipContainer.querySelector(".flipper");
        const flipButton = card.querySelector(".flip-button");

        let isFlipped = false;
        flipButton.classList.add("hidden"); // Inicialmente invisível

        // Efeito 3D baseado no movimento do mouse
        flipContainer.addEventListener("mousemove", (event) => {
            if (isFlipped) return;

            const { width, height, left, top } = flipContainer.getBoundingClientRect();
            const x = event.clientX - left - width / 2;
            const y = event.clientY - top - height / 2;

            const rotateX = (y / height) * 20;
            const rotateY = (x / width) * -20;

            flipper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        flipContainer.addEventListener("mouseleave", () => {
            if (!isFlipped) {
                flipper.style.transform = "rotateX(0deg) rotateY(0deg)";
            }
        });

        // Clicar no card para virar
        flipContainer.addEventListener("click", () => {
            isFlipped = !isFlipped;
            flipper.style.transform = isFlipped ? "rotateY(180deg)" : "rotateY(0deg)";

            if (isFlipped) {
                setTimeout(() => {
                    flipButton.style.visibility = "visible";
                    flipButton.style.opacity = "1";
                }, 300); // Suaviza a aparição
            } else {
                flipButton.style.opacity = "0";
                setTimeout(() => flipButton.style.visibility = "hidden", 500); // Espera a transição antes de esconder
            }
        });

        // Botão para voltar o card
        flipButton.addEventListener("click", () => {
            isFlipped = false;
            flipper.style.transform = "rotateY(0deg)";
            flipButton.style.opacity = "0";
            setTimeout(() => flipButton.style.visibility = "hidden", 100);
        });
    });
});