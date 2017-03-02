   var charOptions = JSON.parse(localStorage.getItem("_charOptions"));
   if (!charOptions) console.log("NOPE");
   alert("couleur : "+charOptions.couleur+" et la forme : " + charOptions.forme);

