var enmo_params = {};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  switch(msg.enmo_type) {
      case "setActive":
        chrome.browserAction.setIcon({
            tabId: sender.tab.id,
            path: "images/icon-active.png"
        });
        enmo_params[sender.tab.id] = msg.enmo_params;
        break;
      case "getActive":
        sendResponse(enmo_params[msg.tab_id]);
        break;
  }
});
