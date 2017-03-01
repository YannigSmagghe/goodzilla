var carouselH = $(".carousel-h");
var carouselV = $(".carousel-v");
    currDegY  = 0;
    currDegX = 0;

$(".button-carousel-h-next").click(function(){
    rotate('n',carouselH, 'Y');
});
$(".button-carousel-h-prev").click(function(){
    rotate('p',carouselH, 'Y');
});

$(".button-carousel-v-next").click(function(){
    rotate('n',carouselV, 'X');
});
$(".button-carousel-v-prev").click(function(){
    rotate('p',carouselV, 'X');
});

$(function () {
    $(document).keydown(function(e) {
        if(e.which == 39) {
            $(".button-carousel-h-next").on("click", rotate("n",carouselH, 'Y'));
        }else if (e.which == 37) {
            $(".button-carousel-h-prev").on("click", rotate("p", carouselH, 'Y'));
        }else if (e.which == 38) {
            $(".button-carousel-v-next").on("click", rotate("n", carouselV, 'X'));
        }else if (e.which == 40) {
            $(".button-carousel-v-prev").on("click", rotate("p", carouselV, 'X'));
        }
    });
});

function rotate(e, carousel, axis){
    if(axis == 'Y') {
        if(e=="n"){
          currDegY = currDegY - 40;
        }
        if(e=="p"){
          currDegY = currDegY + 40;
        }
        carousel.css({
          "-webkit-transform": "rotate"+axis+"("+currDegY+"deg)",
          "-moz-transform": "rotate"+axis+"("+currDegY+"deg)",
          "-o-transform": "rotate"+axis+"("+currDegY+"deg)",
          "transform": "rotate"+axis+"("+currDegY+"deg)",
          "transition": "1s"
        });
    }else if(axis == 'X'){
        if(e=="n"){
          currDegX = currDegX - 40;
        }
        if(e=="p"){
          currDegX = currDegX + 40;
        }
        carousel.css({
          "-webkit-transform": "rotate"+axis+"("+currDegX+"deg)",
          "-moz-transform": "rotate"+axis+"("+currDegX+"deg)",
          "-o-transform": "rotate"+axis+"("+currDegX+"deg)",
          "transform": "rotate"+axis+"("+currDegX+"deg)",
          "transition": "1s"
        });
    }
}

/*currDegX --> 0 c'est la premiere image, 40 la deuxieme etc...
  currDegY --> meme systeme*/

