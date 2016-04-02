var enmo_params = {};
var icon_path = "iconLogo";

function loadSelectedIcon() {
  chrome.storage.local.get("selectedIconPrefix", function (params) {
    if(params && params.selectedIconPrefix) {
      icon_path = params.selectedIconPrefix;
      chrome.browserAction.setIcon({
          path: "images/" + icon_path + "-inactive.png"
      });
    }
  });
}

loadSelectedIcon();

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  switch(msg.enmo_msg_type) {
      case "setActive":
        chrome.browserAction.setIcon({
            tabId: sender.tab.id,
            path: "images/" + icon_path + "-active.png"
        });
        enmo_params[sender.tab.id] = msg.enmo_params;
        break;

      case "getActive":
        sendResponse(enmo_params[msg.tab_id]);
        break;

      case "changeIcon":
        loadSelectedIcon();
        sendResponse({});
        break;
}
});
