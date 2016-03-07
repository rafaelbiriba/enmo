var enmo_params = {};

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.runtime.sendMessage({enmo_type: "getActive", tab_id: tabs[0].id}, function(params) {
      enmo_params = params;
      createInfoContent();
      bindMenuLinks();
    });
});

function createInfoContent() {
  var enMoData = document.querySelector(".enmo-data");
  if(isEnMoActive()) {
    for (var key in enmo_params) {
      var info = document.createElement("li");
      info.innerHTML += "<div class='key'>" + key.toUpperCase() + "</div>";
      info.innerHTML += "<div class='value'>" + enmo_params[key] + "</div>";
      enMoData.appendChild(info);
    };
  } else {
    var info = document.createElement("li");
    info.innerHTML += "<div class='key'>EnMo not active!</div>";
    info.innerHTML += "<div class='value'></br>See <a href='http://rafaelbiriba.github.io/enmo' target='_blank'>documentation</a> </br>for more details!</div>";
    enMoData.appendChild(info);
  }
}

function bindMenuLinks() {
  var menuItem = document.querySelectorAll('.menu li');
  for (var i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener("click", enMoChangeActiveTab);
  }
}

function enMoChangeActiveTab(event) {
  var tab = event.target;
  var tabMenu = tab.dataset.menu;
  removeHighlightActiveTabs();
  tab.className = "active"
  hideAllContents();
  document.querySelector("#enmo-popup .content [data-content='"+ tabMenu +"']").className = "";
}

function removeHighlightActiveTabs() {
  var menuList = document.querySelectorAll("#enmo-popup .menu li");
  for (var i = 0; i < menuList.length; i++) {
    menuList[i].className = "";
  }
}

function hideAllContents() {
  var menuListContent = document.querySelectorAll("#enmo-popup .content [data-content]");
  for (var i = 0; i < menuListContent.length; i++) {
    menuListContent[i].className = "hide";
  }
}

function isEnMoActive() {
  return enmo_params && Object.keys(enmo_params).length > 0;
}
