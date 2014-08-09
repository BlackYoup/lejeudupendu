function Pendu(mot)
{
  var self = this;
  this.word = mot;
  this.lettres = null;
  this.reglesActive = false;
  this.finPartie = false;
  
  this.afficheMasqueRegles = function()
  {
    $("#regles_button").click(function()
	{
		if (!self.reglesActive){
			self.reglesActive = true;
			document.getElementById("regles_vue").setAttribute("class", "vue");
		}
		else{
			self.reglesActive = false;
			document.getElementById("regles_vue").setAttribute("class", "pas_vue");
		}
  };
  
  this.genereHTMLMot = function(){
    var allLettres = "";
    for (var i = 0, c = this.word.length; i < c; i++){
      allLettres += "<span class=lettre_non_decouverte >?</span>";
    }
    $("#fenetre_jeu").innerHTML = allLettres;
    this.lettres = $(".lettre_non_decouverte");
  };
}

$(document).ready(function(){
	
});