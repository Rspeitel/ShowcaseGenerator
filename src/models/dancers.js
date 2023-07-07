import { createUUID } from '../helpers.js';

export function Dancers() {
  this.dancers = [];
}

Dancers.prototype.create = function(name) {
  if (this.dancers.findBy('name', name) === undefined) {
    this.dancers.push(new Dancer(name));
    return this.dancers.at(-1);
  }

  return this.dancers.findBy('name', name);
}

Dancers.prototype.find = function(uuid) {
  return this.dancers.findByUUID(uuid);
}

Dancers.prototype.update = function(uuid, attribute, value) {
  return this.find(uuid).update(attribute, value);
}

Dancers.prototype.updateAll = function(dancer) {
  return this.find(dancer.uuid).updateAll(dancer);
}

Dancers.prototype.remove = function(uuid) {
  this.dancers.remove(uuid);
  return true;
}

Dancers.prototype.toJSON = function() {
  return JSON.stringify(this.dancers);
}

Dancers.prototype.fromJSON = function(json) {
  this.dancers = JSON.parse(json);

  this.dancers.forEach((dancer, index) => {
    this.dancers[index] = Object.assign(new Dancer(), dancer);
  });
}

class Dancer {
  constructor(name) {
    this.uuid = createUUID();
    this.name = name;
    this.bibNumber = '000';
  }

  updateAll(dancer) {
    this.name = dancer.name;
    this.bibNumber = dancer.bibNumber;
    
    return this;
  }
}
