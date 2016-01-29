
var enmo_params = getEnMoParams();

if (enMoActive()) {
  chrome.runtime.sendMessage({enmo_active: true, enmo_params: enmo_params});
  createEnMoDialog();
}

function createEnMoDialog() {
  var dialog = document.createElement("div");
  dialog.id = "enmo-dialog";

  var imgUrl = chrome.extension.getURL("images/icon-active.png");
  dialog.innerHTML += "<img src='" + imgUrl + "'>";

  var content = document.createElement("ul");
  content.className = "content";

  for (var key in enmo_params) {
    var info = document.createElement("li");
    info.className = "info";
    info.innerHTML += "<div class='key'>" + key + "</div>";
    info.innerHTML += "<div class='value'>" + enmo_params[key] + "</div>";
    content.appendChild(info);
  };
  dialog.appendChild(content);

  document.body.appendChild(dialog);
}


function enMoActive() {
  return Object.keys(enmo_params).length > 0;
}

function getEnMoParams() {
   var metas = document.getElementsByTagName('meta');
   var params = {};
   for (i=0; i<metas.length; i++) {
      var meta_tag_key = metas[i].getAttribute("property");
      var meta_tag_value = metas[i].getAttribute("content");

      if (["enmo:project", "enmo:version"].includes(meta_tag_key)) {
        var key = meta_tag_key.match(new RegExp("enmo:(.*)"))[1];
        params[key] = meta_tag_value;
      }

      var enmo_custom = "enmo:custom:"
      if (new RegExp(enmo_custom).test(meta_tag_key)) {
        var custom_key = meta_tag_key.match(new RegExp(enmo_custom + "(.*)"))[1];
        params[custom_key] = meta_tag_value;
      }
    }

    return params;
}
