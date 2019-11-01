// Set global variables
origin = window.location.origin;
path = window.location.pathname;

course = '';
test = '';

match = window.location.pathname.match(/^.*\/course\/([^\/]*)\/([^/?]*)/);
if (match != null && match.length == 3) {
	course = match[1];
	test = match[2]
}

// Inject the content script if on a test page
if (isINGInious() && isTest()) {
	inject_inginious();
}

// Returns whether current page is an INGInious page or not
function isINGInious() {
	return ($('meta[name="description"]').attr('content') == 'INGInious');
}

// Returns whether current page is a test or not
function isTest() {
	return (test.length > 0);
}
