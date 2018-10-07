'use strict';

(function() {
  let popup;

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    popup = new Popup(tabs[0].url)
    popup.isJobPage() ? popup.requestUser() : popup.showBadPageMessage();
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'customerData' && request.id === request.id) {
      popup.customer = new Customer(...Object.values(request.data));
      document.getElementById('to-google').addEventListener('click', function () {
        chrome.extension.sendMessage({
          action: 'toGoogle',
          id: popup.customer.id
        });
        window.close();
      });
      popup.showCustomer();
    }
  });
})();
