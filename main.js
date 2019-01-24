window.oncontextmenu = function (){return false;};
window.onload = function() {

	var kratka = document.getElementsByClassName("kratka");
//RYSOWANIE X
	var iks = function(p) {
		p.style.backgroundColor = "gainsboro";
		p.innerHTML = "X";
	};
//ZAMALOWANIE KRATKI
	var black = function(p) {
		p.style.backgroundColor = "dimgray";
		p.innerHTML = "";
	};
//WYCZYSZCZENIE KRATKI
	var empty = function(p) {
		p.style.backgroundColor = "gainsboro";
		p.innerHTML = "";
	};
//FUKCJA RYSUJACA black() GDY LEWY PRZYCISK I iks() GDY PRAWY PRZYCISK, LUB empty()
	var co = 0;
	var rysuj = function(o, which) {
		if(which == 1) {
			if(o.style.backgroundColor == "dimgray") {
				empty(o);
				co = 1;
			} else {
				black(o);
				co = 2;
			}
		};
		if(which == 3) {
			if(o.innerHTML == "X") {
				empty(o);
				co = 1;
			} else {
				iks(o);
				co = 3;
			}
		};
	}
//FUNCKCJA SPRAWDZAJACA ILOSC ZAZNACZONYCH KRATEK
	
	ileZamalowanePi = 0;
	ileZamalowanePo = 0;
	ileWymaganePi = 0;
	ileWymaganePo = 0;
	ileSkonczonychPi = 0;
	ileSkonczonychPo = 0;
	ileSkonczonychPiRaw = 0;
	ileSkonczonychPoRaw = 0;
	wysGora = document.getElementById("gora").getElementsByTagName("tr").length;
	szerGora = document.getElementById("gora").getElementsByTagName("td").length / wysGora;
	wysLewo = document.getElementById("lewo").getElementsByTagName("tr").length;
	szerLewo = document.getElementById("lewo").getElementsByTagName("td").length / wysLewo;
	
	var sprawdz = function() {
		//PIONOWO
		for (l = 0; l < szerGora; l++) {
				for (m = 0; m < wysGora; m++) {
					ktoraKratkaPi = m*szerGora + l;
					taKratkaGora = document.getElementById("gora").getElementsByTagName("td")[ktoraKratkaPi].innerHTML;
					if(taKratkaGora){
						ileWymaganePi += parseInt(taKratkaGora);
					}
				}
			for (j = 0; j < wysLewo; j++) {
				var taKratka = kratka[j*szerGora+l];
				if(taKratka.style.backgroundColor == "dimgray") {
					ileZamalowanePi++;
				}
			}
			for (n = 0; n < wysLewo; n++) {
				var taKratka = kratka[n*szerGora+l];
				if(ileZamalowanePi == ileWymaganePi) {
					if(taKratka.style.backgroundColor != "dimgray") {
						taKratka.innerHTML = "X";
					}
				ileSkonczonychPiRaw++;
				}
			}
			ileZamalowanePi = 0;
			ileWymaganePi = 0;
		}
		ileSkonczonychPi = ileSkonczonychPiRaw / wysLewo;
		ileSkonczonychPiRaw = 0;
		
		//POZIOMO
		for (o = 0; o < wysLewo; o++) {
				for (p = 0; p < szerLewo; p++) {
					ktoraKratkaPo = p+o*szerLewo;
					taKratkaLewo = document.getElementById("lewo").getElementsByTagName("td")[ktoraKratkaPo].innerHTML;
					if(taKratkaLewo){
						ileWymaganePo += parseInt(taKratkaLewo);
					}
				}
			for (q = 0; q < szerGora; q++) {
				var taKratka = kratka[q+o*szerGora];
				if(taKratka.style.backgroundColor == "dimgray") {
					ileZamalowanePo++;
				}
			}
			for (r = 0; r < szerGora; r++) {
				var taKratka = kratka[r+o*szerGora];
				if(ileZamalowanePo == ileWymaganePo) {
					if(taKratka.style.backgroundColor != "dimgray") {
						taKratka.innerHTML = "X";
					}
				ileSkonczonychPoRaw++;
				}
			}
			ileZamalowanePo = 0;
			ileWymaganePo = 0;
		}
		ileSkonczonychPo = ileSkonczonychPoRaw / szerGora;
		ileSkonczonychPoRaw = 0;
		if(ileSkonczonychPo == wysLewo && ileSkonczonychPi == szerGora){
			document.getElementById('zw').innerHTML = "Zwyciężyłeś!!";
		} else {
			document.getElementById('zw').innerHTML = "";
		}
	}
	
//DODANIE LISTENERA DO KAZDEJ KRATKI OSOBNO I WYWOŁANIE FUNCJI rysuj()
	for (i = 0; i < kratka.length; i++) { 
		kratka[i].addEventListener("mousedown", function(e){
			rysuj(this, e.which);
			sprawdz();
		});
		window.addEventListener("mouseup", function(e){
			co = 0;
		});
		kratka[i].addEventListener("mouseover", function(e){
			switch(co) {
			case 1:
				empty(this);
				sprawdz();
				break;
			case 2:
				black(this);
				sprawdz();
				break;
			case 3:
				iks(this);
				sprawdz();
				break;
			}
		});
	};
	
//JQUERY
//JQUERY
//JQUERY

//DRAGING
  $( function() {
    $( "#wlasciwy" ).draggable({cancel: "#pole"});
  } );
};