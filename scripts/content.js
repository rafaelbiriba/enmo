
var enmo_params = getEnMoParams();

if (isEnMoActive()) {
  chrome.runtime.sendMessage({enmo_params: enmo_params, enmo_type: "setActive"});
  createEnMoDialog();
  startDraggabilly();
}

function closeEnMoDialog() {
  var dialog = document.getElementById("enmo-dialog");
  dialog.parentNode.removeChild(dialog);
  return false;
}

function startDraggabilly() {
  var dialog = document.getElementById("enmo-dialog");
  var draggie = new Draggabilly( dialog, {
    position: {x: 0, y: 0},
    handle: ".logo"
  });
  draggie.on( 'eventName', function() {
    console.log( 'eventName happened', this.position.x, this.position.y );
  });
}

function createEnMoDialog() {
  var container = document.createElement("div");
  container.id = "enmo-container";

  var dialog = document.createElement("div");
  dialog.id = "enmo-dialog";

  // LOGO SVG
  dialog.innerHTML += '<div class="logo"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 19 18.963" enable-background="new 0 0 19 18.963" xml:space="preserve"><g><path d="M4.971,8.915H0V0h4.971v1.025H2.003v2.904h1.973v1.025H2.003v2.935h2.968V8.915z"/><path d="M11.013,8.915H9.009V3.991H8.047v4.923H6.044V2.966h3.975v1.025h0.994V8.915z"/><g><path d="M13.066,18.963h-2.005v-3.944H10.1v1.972H9.088v-1.972H8.127v3.944H6.122v-8.915h2.005v1.972h0.961v1.973 H10.1v-1.973h0.961v-1.972h2.005V18.963z"/><path d="M19,17.985h-0.981v0.978h-2.996v-0.978h-0.995v-3.992h0.995v-0.979h2.996v0.979H19V17.985z M16.993,17.938 V14.04h-0.96v3.897H16.993z"/></g></g></svg></div>';

  dialog.innerHTML += "<a href='#' class='close-icon' onclick='" + closeEnMoDialog + "; closeEnMoDialog();'>&#215;</a>"

  var content = document.createElement("ul");
  content.className = "content";

  for (var key in enmo_params) {
    var info = document.createElement("li");
    info.className = "info";
    info.innerHTML += "<div class='key'>" + key.toUpperCase() + "</div>";
    info.innerHTML += "<div class='value'>" + enmo_params[key] + "</div>";
    content.appendChild(info);
  };
  dialog.appendChild(content);
  container.appendChild(dialog);

  document.body.appendChild(container);
}

function isEnMoActive() {
  return Object.keys(enmo_params).length > 0;
}

function getEnMoParams() {
   var metas = document.getElementsByTagName('meta');
   var params = {};
   // TODO: document.querySelectorAll('meta[property^="enmo:"]');
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
