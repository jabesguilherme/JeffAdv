
/* -- Navbar -- */
document.getElementById('menu-btn').addEventListener('click', function(){
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
});

let nav = document.getElementById('nav');
            document.body.onscroll = () => { 
                if (window.pageYOffset > 100) {
 
                    nav.style.background = "#24252a80";
 
                } else {
                    nav.style.background = "transparent";
                }
            }

/* -- Container activity area carousel -- */

$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin:10,
        nav:true,
        autoplay:true,
        autoplayTimeout: 3000,
        autoplayHoverPause:true,
        smartSpeed: 1500,
        responsive:{
            0:{
                item:1
            },
            600:{
                item:2
            },
            1000:{
                item:3
            }
        }
    })
});

/* Faq */

const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion =>{
    accordion.addEventListener('click', () => {
        const body = accordion.querySelector('.accordion-body');
        body.classList.toggle('active');
    })
})


