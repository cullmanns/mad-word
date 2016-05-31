function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}
Array.prototype.clone = function() {
	return this.slice(0);
};

// ---------------------------------------------------------------------
var colorOk = "#aacc00";
var score = 0;
var motADeviner = "";
var motsParLevel = [
		[ 'cheer leader', 'Hallo', 'Haus', 'lion', 'bon anniversaire' ],
		[ 'music', 'pop', 'rock', 'Musik', 'musique', 'jazz', 'blues','trompete', 'Mozart', 'piano' ], 
		];
var mots;
var motsADeviner;
var level = 0;
var gange = false;
function clicked(mot) {
	if(gange) return;
	if (motADeviner == mot.text()) {
		mot.animate({
			backgroundColor : colorOk,
		}, 700);
		setScore(1);
		choisiProchainMotADeviner();
	} else {
		if (!motsADeviner.includes(mot.text())) {
			motsADeviner.push(mot.text())
		}
		mot.css("background-color", "orange");
		mot.animate({
			backgroundColor : "white",
		}, 700);
		setScore(-1);
		boo.play();
	}
}

function setScore(difference) {
	score = score + difference;
	$(".score").text(score);
}

function choisiProchainMotADeviner() {
	if (motsADeviner.length == 0) {
		if(motsParLevel.length -1 == level){
			gange = true;
			$(".prochainMot").text("Gagné!!! :-)");
			$("body").css("background-color", colorOk);
			bravo.play();			
		} else {			
			levelUp.play();
			setLevel(level +1);
		}
	} else {
		motADeviner = motsADeviner.pop();
		$(".prochainMot").text(motADeviner);
	}
}
var boo = document.createElement('audio');
boo.setAttribute('src', 'boo.mp3');
var bravo = document.createElement('audio');
bravo.setAttribute('src', 'bravo.mp3');
var levelUp = document.createElement('audio');
levelUp.setAttribute('src', 'levelUp.mp3');


function setLevel(lev) {
	level = lev;
	mots = motsParLevel[lev];
	motsADeviner = mots.clone();
	shuffle(mots);
	shuffle(motsADeviner);
	score = 0;
	choisiProchainMotADeviner();
	setScore(0);
	$(".level").text(lev)
	$(".container").empty();
	$.each(mots, function(index, value) {
		var mot = $("<span class='mot'>" + value + "</span>");
		mot.click(function() {
			clicked(mot);
		});
		$(".container").append(mot);
	});
}

setLevel(0);
