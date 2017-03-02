
document.getElementById("Jouer").onclick = function () {
  var charOptions = {
      couleur: currDegYData,
      forme: currDegXData
  };
  localStorage.setItem("_charOptions", JSON.stringify(charOptions));
  document.location="/app/templates/game.html";
};