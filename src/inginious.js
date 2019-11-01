function inject_inginious() {
	// Save answers every time the user changes an input
	$('form#task').find('div').find('input').change(function() {
		saveAnswer($(this));
	});

	// Load stored answers when the user visits the test
	$(document).ready(function(){
		if (isTestUnanswered()) {
			loadAnswers();
		}
	});
}

// Checks if test is unanswered (i.e. all the answers are empty)
function isTestUnanswered() {
	empty = true;
	$('form#task').find('div').find('input').each(function() {
		if ($(this).prop('checked')) {
			empty = false;
		}
	});
	return empty;
}

// Stores an answer. Format: [test/name/value] => checked
function saveAnswer(inputElm) {
	type = inputElm.attr('type')

	if (type == 'radio') {
		saveRadioButton(inputElm);
	}
	else if (type == 'checkbox') {
		saveCheckbox(inputElm);
	}
}

function saveCheckbox(inputElm) {
	name		= inputElm.attr('name');
	value		= inputElm.val();
	checked	= inputElm.prop('checked');
	storageKey		= test + '/' + name + '/' + value;
	storageValue	= checked;

	chrome.storage.sync.set({[storageKey]: storageValue}, function(){});
}

function saveRadioButton(inputElm) {
	// All the other radio buttons on the same question has to be stored as empty
	inputElm.parentsUntil('form').last().find('input').each(function(){
		name		= $(this).attr('name');
		value		= $(this).val();
		checked	= $(this).prop('checked');
		storageKey		= test + '/' + name + '/' + value;
		storageValue	= checked;

		chrome.storage.sync.set({[storageKey]: storageValue}, function(){});
	});
}

// Iterates over checkboxes and radio buttons, and collects the stored answers
function loadAnswers() {
	$('form#task').find('div').find('input').each(function() {
		type = $(this).attr('type')

		if (type == 'checkbox') {
			loadCheckbox($(this));
		} else if (type == 'radio') {
			loadRadioButton($(this));
		}
	});
}

// Retrieves a checkbox answer
function loadCheckbox(inputElm) {
	name				= inputElm.attr('name');
	value				= inputElm.val();
	storageKey	= test + '/' + name + '/' + value;

	chrome.storage.sync.get(storageKey, function(result){
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

// Retrieves a radio button answer
function loadRadioButton(inputElm) {
	loadCheckbox(inputElm); // Use the checkbox loading logic
}
