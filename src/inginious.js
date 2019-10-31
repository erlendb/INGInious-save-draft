function inject_inginious() {

// Save answers every time the user changes an input
$('input').change(function() {
	storeAnswer($(this), true);
});

// Load stored answers when the user visits the test
$(document).ready(function(){
	if (isTestEmpty()) {
		getAnswers();
	}
});

// Checks if all the answers are empty
function isTestEmpty() {
	empty = true;
	$('.panel-body').find('input').each(function() {
		if ($(this).prop('checked')) {
			empty = false;
		}
	});
	return empty;
}

// Iterates over all checkboxes and radio buttons and stores the answers
function storeAnswers() {
	$('.panel-body').find('input').each(function() {
		storeAnswer($(this), false);
	});
}

// Stores an answer. Format: [test/name/value] => checked
function storeAnswer(inputElm, iterateRadios) {
	test		= href.substr(href.lastIndexOf('/')).slice(1);
	name		= inputElm.attr('name');
	value		= inputElm.val();
	checked	= inputElm.prop('checked');
	type		= inputElm.attr('type')
	storageKey		= test + '/' + name + '/' + value;
	storageValue	= checked;

	chrome.storage.local.set({[storageKey]: storageValue}, function(){});

	// If the user has clicked a radio button, then all the other radio buttons on the same question has to be stored as empty
	if (type == 'radio' && iterateRadios) {
		inputElm.closest('.panel-body').find('input').each(function(){
			// Ignores the radio button that started the iteration (and therefore has already been stored)
			if ($(this).val() != inputElm.val()) {
				storeAnswer($(this), false);
			}
		});
	}
}

// Iterates over checkboxes and radio buttons, and collects the stored answers
function getAnswers() {
	$('.panel-body').find('input').each(function() {
		getAnswer($(this));
	});
}

// Retrieves an answer belonging to an input and checks the box if the stored answers is true
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
