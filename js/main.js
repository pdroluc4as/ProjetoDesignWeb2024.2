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