chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.enmo_active === true) {
      chrome.browserAction.setIcon({
          tabId: sender.tab.id,
          path: "icon-active.png"
      });
      sendResponse({status:"test"});
  }
});
