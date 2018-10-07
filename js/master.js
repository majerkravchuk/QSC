'use strict';

class Master {
  constructor() {
    this.customers = [];
  }

  requestUser(request, sender, callback) {
    let customer = this.customers.find(i => i.id  === request.id);

    customer ? this.sendCustomerToPopup(customer)
             : this.lootingUserInformation();
  }

  processCustomerData(request, sender, callback) {
    let name = request.data.buyer.info.company.name;
    let city = request.data.buyer.info.location.city;
    let country = request.data.buyer.info.location.country;

    let id = sender.url.match(/jobs\/~(\w+)/)[1];
    let customer = new Customer(id, name, city, country);

    this.customers.push(customer);
    this.sendCustomerToPopup(customer);
  }

  lootingUserInformation() {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.executeScript(tab.id, { file: 'js/page/parse.js' });
    });
  }

  sendCustomerToPopup(customer) {
    chrome.runtime.sendMessage({
      id: customer.id,
      type: 'customerData',
      data: customer
    });
  }

  toGoogle(request, sender, callback) {
    let customer = this.customers.find(i => i.id  === request.id);

    if (customer) {
      chrome.tabs.create({
        active: false,
        url: 'http://www.google.com/search?q=' + customer.googleQuery()
      });
    }
  }
};
