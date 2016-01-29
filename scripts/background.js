chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg.enmo_active === true) {
      chrome.browserAction.setIcon({
          tabId: sender.tab.id,
          path: "images/icon-active.png"
      });
      console.log(msg.enmo_params);
  }
});
