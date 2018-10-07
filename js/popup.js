'use strict';

class Popup {
  constructor(url) {
    this.url = url;
    this.customer;
  }

  get id() {
    return this.isJobPage() ? this.url.match(/jobs\/~(\w+)/)[1] : null;
  }

  isJobPage() {
    return this.url.indexOf('www.upwork.com/jobs/') !== -1;
  }

  requestUser() {
    chrome.runtime.sendMessage({ action: 'requestUser', id: this.id });
  }

  showCustomer() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('customer-info').style.display = 'block';
    document.getElementById('customer-name').innerHTML = this.customer.name;
    document.getElementById('customer-location').innerHTML = this.customer.location;
  }

  showBadPageMessage() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('bad-page').style.display = 'block';
  }
}
