function Pendu(mot, tours)
{
  var self = this;
  this.mode = "";
  this.level = "";
  this.vies = [tours, 0];
  this.word = mot;
  this.lettres = [];
  this.lettresUtilisees = [];
  this.finPartie = false;
  
  this.afficheMasqueRegles = function()
  {
    $("#regles_button").click(function()
	  {
    	if ($("#regles_vue").attr("class") == "pas_vue")
    		$("#regles_vue").attr("class", "vue");
    	else
        $("#regles_vue").attr("class", "pas_vue");
    });
  };

  this.eventMode = function()
  {
    $("#menu button").click(function(){
      self.mode = this.getAttribute("mode");
      $("#niveaux").attr("class", "vue");
      self.eventNiveaux();
    });
  };

  this.eventNiveaux = function()
  {
    $(".niveau img").click(function(){
      self.niveau = this.parentNode.getAttribute("valeur");
      $("#fenetre_jeu").html("Vous avez choisit de jouer au niveau " + self.niveau);
    });
  };
  
  this.genereHTMLMot = function(){
    var allLettres = "";
    for (var i = 0, c = this.word.length; i < c; i++){
      allLettres += "<span class=lettre_non_decouverte >?</span>";
    }
    $("#fenetre_jeu").html(allLettres);
    this.lettres = $(".lettre_non_decouverte");
  };

  this.estRemplit = function(){
    var valid = true;
    var i = 0, c = this.word.length;
    while (i < c && valid){
      if (this.lettres[i].firstChild.nodeValue == "?")
        valid = false;
      else
        i++;
    }
    return valid;
  };

  this.gereVictoireDefaite = function()//Juste une méthode de test ^^
  {
    if (self.vies[0] == self.vies[1])
      alert("vous avez perdu");
    else
      alert("vous avez gagne");
  };

  this.gereStatutPartie = function(){
    if (self.estRemplit() || self.vies[0] == self.vies[1])
    {
      self.finPartie = true;
      self.gereVictoireDefaite();
    }
  };

  this.remplitMot = function()
  {
    $(window).keydown(function(e){
      if (!self.finPartie){
        var lettreTapee = String.toLowerCase(String.fromCharCode(e.keyCode));
        if ($.inArray(lettreTapee, self.lettresUtilisees) == -1){
          for (var i = 0, c = self.lettres.length; i < c; i++){
            if (self.lettres[i].firstChild.nodeValue == "?" && self.word.charAt(i) == lettreTapee){
              self.lettres[i].firstChild.nodeValue = lettreTapee;
              self.lettres[i].setAttribute("class", "lettre_decouverte");
            }
          }
          self.lettresUtilisees.push(lettreTapee);
        }
        self.vies[1]++;
        self.gereStatutPartie();
      }
      else
        alert("La partie est déjà finie !");
    });
  };
}

$(document).ready(function(){
	var pendu = new Pendu("cheval", 6);
  //pendu.eventMode();
  pendu.genereHTMLMot();
  pendu.remplitMot();
});