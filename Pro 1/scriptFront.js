
/* -- Navbar -- */
document.getElementById('menu-btn').addEventListener('click', function(){
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
})

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
                item:1
            },
            1000:{
                item:3
            }
        }
    })
});



