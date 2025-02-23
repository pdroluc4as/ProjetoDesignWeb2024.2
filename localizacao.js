        document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll(".card").forEach(card => {
                const flipContainer = card.querySelector(".flip-container");
                const flipper = flipContainer.querySelector(".flipper");
                const flipButton = card.querySelector(".flip-button");
        
                let isFlipped = false;
        
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
        
                // Botão para virar o card
                flipButton.addEventListener("click", () => {
                    isFlipped = !isFlipped;
                    flipper.style.transform = isFlipped ? "rotateY(180deg)" : "rotateY(0deg)";
                });
            });
        });