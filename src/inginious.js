function inject_inginious() {

$('input').change(function() {
	storeAnswer($(this), true);
});

$(document).ready(function(){
	if (isTestEmpty()) {
		getAnswers();
	}
});

function isTestEmpty() {
	empty = true;
	$('.panel-body').find('input').each(function() {
		if ($(this).prop('checked')) {
			empty = false;
		}
	});
	return empty;
}

function storeAnswer(inputElm, iterateRadios) {
	test		= href.substr(href.lastIndexOf('/')).slice(1);
	name		= inputElm.attr('name');
	value		= inputElm.val();
	checked	= inputElm.prop('checked');
	type		= inputElm.attr('type')
	storageKey		= test + '/' + name + '/' + value;
	storageValue	= checked;

	chrome.storage.local.set({[storageKey]: storageValue}, function(){});

	if (type == 'radio' && iterateRadios) {
		inputElm.closest('.panel-body').find('input').each(function(){
			storeAnswer($(this), false);
		});
	}

}

function getAnswers() {
	$('.panel-body').find('input').each(function() {
		getAnswer($(this));
	});
}

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
