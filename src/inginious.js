function inject_inginious() {
	// Create answers object in Chrome storage if not already exists
	createStorageObject();

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

function createStorageObject() {
	chrome.storage.sync.get(origin, function(result){
		if (result.hasOwnProperty(origin)) {
			obj = result[origin];
		} else {
			obj = {};
		}

		if (!obj.hasOwnProperty(course)) {
			obj[course] = {};
		}
		if (!obj[course].hasOwnProperty(test)) {
			obj[course][test] = {};
		}
		$('form#task').find('div').find('input').each(function(){
			question	= $(this).attr('name');
			value			= $(this).val();
			if (!obj[course][test].hasOwnProperty(question)) {
				obj[course][test][question] = {};
			}
		});
		chrome.storage.sync.set({[origin]: obj}, function(){});
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

// Stores an answer.
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
	question = inputElm.attr('name');
	value		 = inputElm.val();
	checked	 = inputElm.prop('checked');

	chrome.storage.sync.get(origin, function(storage){
		storage[origin][course][test][question][value] = checked;
		chrome.storage.sync.set({[origin]: storage[origin]}, function(){});
	});
}

function saveRadioButton(inputElm) {
	// All the other radio buttons on the same question have to be stored as empty
	chrome.storage.sync.get(origin, function(storage){
		inputElm.parentsUntil('form').last().find('input').each(function(){
			question = $(this).attr('name');
			value		 = $(this).val();
			checked	 = $(this).prop('checked');

			storage[origin][course][test][question][value] = checked;
		});
		chrome.storage.sync.set({[origin]: storage[origin]}, function(){});
	});
}

// Iterates over checkboxes and radio buttons, and collects the stored answers
function loadAnswers() {
	chrome.storage.sync.get(origin, function(storage){
		console.log(storage);
		$('form#task').find('div').find('input').each(function() {
			type = $(this).attr('type');

			if (type == 'checkbox') {
				loadCheckbox($(this), storage);
			} else if (type == 'radio') {
				loadRadioButton($(this), storage);
			}
		});
	});
}

// Retrieves a checkbox answer
function loadCheckbox(inputElm, storage) {
	question 		= inputElm.attr('name');
	value				= inputElm.val();

	checked = storage[origin][course][test][question][value];
	console.log(checked);
	if (checked) {
		$('input[name=' + question + '][value=' + value + ']').prop('checked', true);
	}
}

// Retrieves a radio button answer
function loadRadioButton(inputElm, storage) {
	loadCheckbox(inputElm, storage); // Use the checkbox loading logic
}
