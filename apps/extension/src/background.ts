// TODO: write auth flow here
const IS_LOGGED_IN = true;

// enable popup when not logged in
if (IS_LOGGED_IN) chrome.browserAction.setPopup({ popup: '' });
else chrome.browserAction.setPopup({ popup: 'popup.html' });

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
chrome.browserAction.onClicked.addListener(function () {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id as number, {
      message: 'clicked_browser_action',
    });
  });
});

export {};
