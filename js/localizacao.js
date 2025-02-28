// console.log("Arquivo navbar.js carregado!");
class NavBarLateral{
    constructor(menucelular, navlist, navlinks){
        this.menucelular = document.querySelector(menucelular);
        this.navlist = document.querySelector(navlist);
        this.navlinks = document.querySelectorAll(navlinks);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this);
    }
    linksAnimacao(){
        this.navlinks.forEach((link) =>{
            link.style.animation
             ? (link.style.animation = "")
             : (link.style.animation = `navLinkAparecer 0.5s ease forwards 0.3s`);
        });
    }

    handleClick(){
        this.navlist.classList.toggle(this.activeClass);
        this.menucelular.classList.toggle(this.activeClass);
        this.linksAnimacao();
    }

    addClickEvent(){
        // console.log("Adicionando evento de clique...");
        this.menucelular.addEventListener("click", this.handleClick);
    }

    init(){
        if (this.menucelular){
            this.addClickEvent();
        }
        return this;
    }
}

const menuCelular = new NavBarLateral(
    ".menucelular",
    ".navlist",
    ".navlist li",
);
menuCelular.init();
// console.log(menuCelular);

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