// For simple requests:
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request.getTargetData) {
      sendResponse({targetData: 'kok'});
    }
    else if (request.storeAnswers) {
      storeAnswersInContentScript();
    }
  }
);

function storeAnswersInContentScript() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: 'storeAnswers'});
  });
}
