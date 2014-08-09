function Pendu(mot)
{
  var self = this;
  this.mode = "";
  this.level = "";
  this.word = mot;
  this.lettres = [];
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
    });
  };

  this.eventMode = function()
  {
    $("#menu button").click(function(e)
    {
      self.mode = e.currentTarget.getAttribute("mode");
      $("#fenetre_jeu").html("<div class=niveau valeur=1><p>Niveau 1 : longueur de mot => Moins de 6 caracteres</p></div><div class=niveau valeur=2><p>Niveau 2 : longueur de mot => Entre 6 et 11 caracteres</p></div><div class=niveau valeur=3><p>Niveau 3 : longueur de mot => 11 caracteres et plus</p></div>");
      self.eventNiveaux();
    });
  };

  this.eventNiveaux = function()
  {
    $("#fenetre_jeu .niveau").click(function(e)
    {
      self.level = e.currentTarget.getAttribute("valeur");
      $("#fenetre_jeu").html("<p>Vous avez choisit le niveau " + self.level + "</p>");
    });
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
	var pendu = new Pendu("coucou");
  pendu.eventMode();
});