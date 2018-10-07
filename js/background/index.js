'use strict';

(function () {
  let master = new Master();

  chrome.extension.onMessage.addListener(function (request, sender, callback) {
    master[request.action](request, sender, callback);
  });
})();

