$(document).ready(function(){
    // -------------------------------First Section-----------------------
    var typed = new Typed('#typedOne',{
        stringsElement: '#headerOne',
        typeSpeed: 30
    });
    // -------------------------------Second Section-----------------------
    $(".circleOne").css("backgroundColor",makeRGBA());
    $(".circleTwo").css("backgroundColor",makeRGBA());

    getAttention("downArrowDiv", 50, 10, 1.1, 8);

    $("#downArrowDiv").click(function() {
        $('html, body').animate({
            scrollTop: $("#second").offset().top
        }, 1000);
    });
});


function makeRGBA() {
    let r = parseInt(Math.random()*255),
        g = parseInt(Math.random()*255),
        b = parseInt(Math.random()*255),
        rgba = "rgba(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ", 0.4)";
   return rgba;
}

var getAttention = function(elementClass,initialDistance, times, damping, bounces) {
    for(let i = 0; i < bounces; i++){
        for(let i = 0; i < times; i++){
            let an = Math.pow(-1,i)*initialDistance/(i*damping);
            $('#'+elementClass).animate({'top':an},100);
        }
        $('#'+elementClass).animate({'top':0},100);
    }
}

  