var hitEndpoint = function (endpoint, payload, callback){
  var endpoint = endpoint || "No endpoint specified";
  var payload = payload || {"Error": "No payload specified"};
  var responseElem = responseElem || window.document;

  // build GET appropriate URL
  var urlParams = Object.keys(payload).map(function(key) {
      return key + "=" + payload[key]
  }).join("&");
  var url = endpoint + "?" + urlParams;

  var ajax = new XMLHttpRequest();
  ajax.open('GET', url, false);
  ajax.send(payload);
  callback(JSON.parse(ajax.responseText));
};