   var charOptions = JSON.parse(localStorage.getItem("_charOptions"));
   if (!charOptions) console.log("NOPE");
   console.log("YAY!");
   console.log("couleur : "+charOptions.couleur+" et la forme : " + charOptions.forme);

