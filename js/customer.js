'use strict';

class Customer {
  constructor(id, name, city, country) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.country = country;
  }

  get location() {
    return `${this.city || 'unknow'}, ${this.country || 'unknow'}`;
  }

  googleQuery() {
    let fields = [this.name, this.city, this.country];
    return fields.filter(i => typeof i === 'string').join('+');
  }
}
