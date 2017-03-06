var carouselH = $(".carousel-h");
var carouselV = $(".carousel-v");
var currDegY = 0;
var currDegX = 0;
var currDegYData = '../../app/assets/texture/tree2_1.png';
var currDegYDataToBecome = '../../app/assets/texture/tree2_1.png';
var currDegXData = "carte 1";
var tempRotationY = 0;
var tempRotationX = 0;

localStorage.setItem("_colorVar", JSON.stringify(currDegYData));
localStorage.setItem("_colorVarBefore", JSON.stringify(currDegYDataToBecome));


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
            tempRotationY += 1;
            tempRotationY = changeDataValue(tempRotationY);
        }
        if(e=="p"){
          currDegY = currDegY + 40;
          tempRotationY -= 1;
          tempRotationY = changeDataValue(tempRotationY);
        }
        carousel.css({
          "-webkit-transform": "rotate"+axis+"("+currDegY+"deg)",
          "-moz-transform": "rotate"+axis+"("+currDegY+"deg)",
          "-o-transform": "rotate"+axis+"("+currDegY+"deg)",
          "transform": "rotate"+axis+"("+currDegY+"deg)",
          "transition": "1s"
        });
        switch(tempRotationY){
            case 0:
                changeColor('../../app/assets/texture/tree2_1.png');
                break;
            case 1:
                changeColor('../../app/assets/texture/tree2_2.png');
                break;
            case 2:
                changeColor('../../app/assets/texture/tree2_3.png');
                break;
            case 3:
                changeColor('../../app/assets/texture/tree2_4.png');
                break;
            case 4:
                changeColor('../../app/assets/texture/tree2_5.png');
                break;
            case 5:
                changeColor('../../app/assets/texture/tree2_6.png');
                break;
            case 6:
                changeColor('../../app/assets/texture/tree2_7.png');
                break;
            case 7:
                changeColor('../../app/assets/texture/tree2_8.png');
                break;
            case 8:
                changeColor('../../app/assets/texture/tree2_9.png');
                break;
            default:
        }

    }else if(axis == 'X'){
        if(e=="n"){
            currDegX = currDegX - 40;
            tempRotationX += 1;
            tempRotationX = changeDataValue(tempRotationX);
        }
        if(e=="p"){
            currDegX = currDegX + 40;
            tempRotationX += 1;
            tempRotationX = changeDataValue(tempRotationX);
        }
        carousel.css({
          "-webkit-transform": "rotate"+axis+"("+currDegX+"deg)",
          "-moz-transform": "rotate"+axis+"("+currDegX+"deg)",
          "-o-transform": "rotate"+axis+"("+currDegX+"deg)",
          "transform": "rotate"+axis+"("+currDegX+"deg)",
          "transition": "1s"
        });
        switch(tempRotationX){
            case 0:
                currDegXData = "carte 1";
                break;
            case 1:
                currDegXData = "carte 2";
                break;
            case 2:
                currDegXData = "carte 3";
                break;
            case 3:
                currDegXData = "carte 4";
                break;
            case 4:
                currDegXData = "carte 5";
                break;
            case 5:
                currDegXData = "carte 6";
                break;
            case 6:
                currDegXData = "carte 7";
                break;
            case 7:
                currDegXData = "carte 8";
                break;
            case 8:
                currDegXData = "carte 9";
                break;
            default:
        }
    }
}
function changeDataValue(param){
    if(param < 0){
        return 8;
    }else if(param > 8){
        return 0;
    }else {
        return param;
    }
}

function changeColor(color) {
    localStorage.setItem("_colorVar", JSON.stringify(color));
}



