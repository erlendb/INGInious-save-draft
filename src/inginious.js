function inject_inginious() {

// Lagrer svar hver gang brukeren endrer på en input (aka trykker på en sjekkboks/radioknapp)
$('input').change(function() {
	storeAnswer($(this), true);
});

// Laster inn lagrede svar idet brukeren går inn på testen
$(document).ready(function(){
	if (isTestEmpty()) {
		getAnswers();
	}
});

// Lytter ett bedkjed fra bakgrunnsskriptet. Når det kommer beskjed, så skal kladden lagres
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  if (request.message == "storeAnswers") {
			storeAnswers();
		}
	}
);

// Sjekker om testen er tom (altså om alle sjekkboksene/radioknappene er tomme)
function isTestEmpty() {
	empty = true;
	$('.panel-body').find('input').each(function() {
		if ($(this).prop('checked')) {
			empty = false;
		}
	});
	return empty;
}

// Itererer over alle sjekkbokser/radioknapper og lagrer svarene
function storeAnswers() {
	$('.panel-body').find('input').each(function() {
		storeAnswer($(this), false);
	});
}

// Lagrer et svar. Format: [test/name/value] => checked
function storeAnswer(inputElm, iterateRadios) {
	test		= href.substr(href.lastIndexOf('/')).slice(1);
	name		= inputElm.attr('name');
	value		= inputElm.val();
	checked	= inputElm.prop('checked');
	type		= inputElm.attr('type')
	storageKey		= test + '/' + name + '/' + value;
	storageValue	= checked;

	chrome.storage.local.set({[storageKey]: storageValue}, function(){});

	// Hvis brukeren har trykket en radioknapp, så må de andre radioknappene på samme spørsmål lagres som tomme
	if (type == 'radio' && iterateRadios) {
		inputElm.closest('.panel-body').find('input').each(function(){
			storeAnswer($(this), false);
		});
	}
}

// Itererer over sjekkbokser/radioknapper og henter lagrede svar
function getAnswers() {
	$('.panel-body').find('input').each(function() {
		getAnswer($(this));
	});
}

// Henter et svar tilhørende en input og trykker på boksen hvis det er lagret et positivt svar
function getAnswer(inputElm) {
	test				= href.substr(href.lastIndexOf('/')).slice(1);
	name				= inputElm.attr('name');
	value				= inputElm.val();
	storageKey	= test + '/' + name + '/' + value;

	chrome.storage.local.get(storageKey, function(result){
		key			= Object.keys(result)[0];
		checked = Object.values(result)[0]
		if (checked) {
			test		= key.split('/')[0];
			name		= key.split('/')[1];
			value		= key.split('/')[2];

			$('input[name=' + name + '][value=' + value + ']').prop('checked', true);
		}

	});
}

} // inject_inginious()
