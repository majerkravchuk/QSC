'use strict';

(function() {
  const api_link = 'https://www.upwork.com/ab/proposals/api/jobs/uid';
  let match;
  let xhr;

  match = /openingUid\'\,\s\'(\d+)/ig.exec(document.body.innerHTML);

  xhr = new XMLHttpRequest();
  xhr.open('GET', `${api_link}/${match[1]}/client`, false);
  xhr.send();

  if (xhr.status === 200) {
    chrome.extension.sendMessage({
      action: 'processCustomerData',
      data: JSON.parse(xhr.responseText)
    });
  }
})();
