
var enmo_params = getEnMoParams();

if (enMoActive(enmo_params)) {
  chrome.runtime.sendMessage({enmo_active: true, enmo_params: enmo_params});
}

function enMoActive(enmo_params) {
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
