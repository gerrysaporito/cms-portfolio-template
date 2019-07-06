$(document).ready(function(){
    $('#rocketDiv').click(function () { 
        $(this).children().addClass('rocket');
        $(this).children().removeClass('pulse');
        $(this).addClass('rocketDiv');
        setTimeout(function(){
            $('html, body').animate({scrollTop:0}, '4s');
        }, 1500);
        $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(event) {
            $(this).removeClass('rocketDiv');
            $(this).children().removeClass('rocket');
            $(this).children().addClass('pulse');
        });
      });

    $('.fade').css( 'opacity', 0 );
    fade();
    $(window).scroll(function() {fade();});

    window.addEventListener("scroll",function() { 
        if(window.scrollY > document.getElementById("showRocket").offsetTop) {
            $('#rocket').fadeIn();
        } else {
            $('#rocket').fadeOut();
        }
    },false);

    if ($(window).width() < 1025) {
        $(".remove").removeAttr("href");
        $(".outerCont img").click(function(){
            $(this).parent().parent().find(".workDesc").stop(true).slideToggle();
        });
    } else if($(window).width() >= 1025){
        $(".outerCont img").mouseenter(function(){
            $(this).parent().parent().find(".workDesc").stop(true).slideDown();
        });
        $(".outerCont img").mouseleave(function(){
            $(this).parent().parent().find(".workDesc").stop(true).slideUp();
        });
    }
});


function makeRGBA() {
    let r = parseInt(Math.random()*255),
        g = parseInt(Math.random()*255),
        b = parseInt(Math.random()*255),
        rgba = "rgba(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ", 0.4)";
   return rgba;
}

function fade() {
    var animation_height = $(window).innerHeight() * 0.25;
    var ratio = Math.round( (1 / animation_height) * 10000 ) / 10000;

    $('.fade').each(function() {

        var objectTop = $(this).offset().top;
        var windowBottom = $(window).scrollTop() + $(window).innerHeight();

        if ( objectTop < windowBottom ) {
            if ( objectTop < windowBottom - animation_height ) {
                $(this).css( {
                    transition: 'opacity 0.5s linear',
                    opacity: 1
                } );

            } else {
                $(this).css( {
                    transition: 'opacity 0.75s linear',
                    opacity: (windowBottom - objectTop) * ratio
                } );
            }
        } else {
            $(this).css( 'opacity', 0 );
        }
    });
}
  