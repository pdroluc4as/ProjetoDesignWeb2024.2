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

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 15, // Espaço entre os slides
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    breakpoints: {
        320: { slidesPerView: 1 }, // 1 card por vez em telas pequenas
        768: { slidesPerView: 2 }, // 2 cards em tablets
        1024: { slidesPerView: 2 }, // 2 cards em desktops
        1250: { slidesPerView: 3 }, // 3 cards em desktops
        1700: { slidesPerView: 4 }, // 4 cards em desktops
        1920: { slidesPerView: 4 }, // 4 cards em tela cheia
    }
  });
  