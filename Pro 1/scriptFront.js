
/* -- Navbar -- */
document.getElementById('menu-btn').addEventListener('click', function(){
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
});

let nav = document.getElementById('nav');
            document.body.onscroll = () => { 
                if (window.pageYOffset > 100) {
 
                    nav.style.background = "#24252ae3";
 
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


/* ScrollReveal */
ScrollReveal().reveal('.container-about');
ScrollReveal().reveal('.title-article', {delay: 700})
ScrollReveal().reveal('.card-container-article', {delay: 500})
ScrollReveal().reveal('.box-faq', {delay: 500})
ScrollReveal().reveal('.form-wrapper', {delay: 500})
ScrollReveal().reveal('.card-article', { interval: 300 });
ScrollReveal().reveal('.accordion', { interval: 300 });