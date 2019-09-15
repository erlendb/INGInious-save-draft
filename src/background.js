// Lytter etter meldinger fra autokok-utvidelsen
// Autokokern sender melding til lagre-kladd-utvidelsen når brukeren har kokt teoriøvingen, for å få lagre-kladd-utvidelsen til å lagre kladden
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

// Sender melding til content-skriptet om at det er på tide å lagre kladden
function storeAnswersInContentScript() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: 'storeAnswers'});
  });
}
