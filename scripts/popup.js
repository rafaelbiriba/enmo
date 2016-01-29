var enmo_params = {};

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.runtime.sendMessage({enmo_type: "getActive", tab_id: tabs[0].id}, function(params) {
      enmo_params = params;
      createEnMoPopupData();
    });
});

function enMoActive() {
  return Object.keys(enmo_params).length > 0;
}

function createEnMoPopupData() {
  var enMoData = document.querySelector(".enmo-data");
  for (var key in enmo_params) {
    var info = document.createElement("li");
    info.innerHTML += "<div class='key'>" + key.toUpperCase() + "</div>";
    info.innerHTML += "<div class='value'>" + enmo_params[key] + "</div>";
    enMoData.appendChild(info);
  };
}
