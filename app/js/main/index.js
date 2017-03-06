var pseudoChar = "";

document.getElementById("Jouer").onclick = function () {
  var charOptions = {
      couleur: currDegYData,
      forme: currDegXData,
      pseudo: pseudoChar
  };
  localStorage.setItem("_charOptions", JSON.stringify(charOptions));
  document.location="/app/templates/game.html";
  // Change timeline
  localStorage.setItem('timeline', 'game');
};