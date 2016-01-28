if (document.title === "SporTV - Ao Vivo | Globosat Play") {
  chrome.runtime.sendMessage({enmo_active: true}, function(response) {
    console.log(response);
  });
}

//http://stackoverflow.com/questions/20181239/chrome-extension-making-extension-active-only-if-matches-match
// function getEnMoParams() {
//    var metas = document.getElementsByTagName('meta');
//    var params = defaultEnMoParams();
//    for (i=0; i<metas.length; i++) {
//       if (metas[i].getAttribute("name") == "enmo:project") {
//         params.project = metas[i].getAttribute("content");
//       }
//
//       if (metas[i].getAttribute("name") == "enmo:environment") {
//         params.environment = metas[i].getAttribute("content");
//       }
//
//       if (metas[i].getAttribute("name") == "enmo:version") {
//         params.version = metas[i].getAttribute("content");
//       }
//     }
//
//     return params;
// }
//
// function defaultEnMoParams() {
//   return { project: null, environment: null, version: null };
// }
//
// alert(getEnMoParams().project);
