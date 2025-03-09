// https://www.linkedin.com/in/atakangk/
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

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

$(".next").click(function(){
    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    let index = $("fieldset").index(next_fs);
    $("#progressbar li").eq(index).addClass("active");

    // Ajusta a largura da barra para evitar falhas visuais
    let progressWidth = ((index) / ($("fieldset").length - 1)) * 100 + "%";
    $("#progressbar::before").css("width", progressWidth);

    next_fs.show();
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            scale = 1 - (1 - now) * 0.2;
            left = (now * 50)+"%";
            opacity = 1 - now;
            current_fs.css({'transform': 'scale('+scale+')', 'position': 'absolute'});
            next_fs.css({'left': left, 'opacity': opacity});
        },
        duration: 800,
        complete: function(){
            current_fs.hide();
            animating = false;
        },
        easing: 'easeInOutBack'
    });
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});