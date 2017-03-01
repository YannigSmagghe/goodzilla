
document.getElementById("Jouer").onclick = function () {
  var charOptions = {"couleur": currDegX, "forme":currDegY};
   localStorage.setItem("_charOptions", JSON.stringify(charOptions));
   document.location="/app/templates/game.html";
};