var enmo_params = {};

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.runtime.sendMessage({enmo_msg_type: "getActive", tab_id: tabs[0].id}, function(params) {
      enmo_params = params;
      createInfoContent();
      updateOptionsContent();
      bindMenuLinks();
      bindOptionsButtons();
    });
});

// chrome.storage.onChanged.addListener(function (changes,areaName) {
//     console.log("popup - New item in storage", changes, areaName);
// });

function updateOptionsContent() {
  chrome.storage.local.get("dialogBoxEnabled", function (params) {
    if(params && 'dialogBoxEnabled' in params){
      var switchInput = document.getElementById("myonoffswitch");
      switchInput.checked = params.dialogBoxEnabled;
    }
  });

  chrome.storage.local.get("selectedIconPrefix", function (params) {
    if(params && 'selectedIconPrefix' in params){
      highlightIconSelection(params.selectedIconPrefix);
    }
  });
}

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

function bindOptionsButtons() {
  bindSwitchInput();
  bindIconSelection();
}

function bindSwitchInput() {
  var switchInput = document.getElementById("myonoffswitch");
  switchInput.addEventListener("change", function() {
    chrome.storage.local.set({"dialogBoxEnabled": switchInput.checked});
  });
}

function bindIconSelection() {
  var icons = document.querySelectorAll("#enmo-popup .content .options .icon-select .icon img");
  for (var i = 0; i < icons.length; i++) {
    icons[i].addEventListener("click", function(event){
      var iconElement = event.target.parentNode;
      var iconPrefix = iconElement.dataset.icon;
      highlightIconSelection(iconPrefix)
      chrome.runtime.sendMessage({enmo_msg_type: "changeIcon", enmo_new_icon_prefix: iconPrefix});
    });
  }
}

function highlightIconSelection(icon) {
  var iconList = document.querySelectorAll("#enmo-popup .content .options .icon-select .icon");
  for (var i = 0; i < iconList.length; i++) {
    iconList[i].className = "icon";
    if(iconList[i].dataset.icon == icon) {
      iconList[i].className += " selected";
    }
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
