import { createUUID } from '../helpers.js';

export function Dancers() {
  this.dancers = [];
}

Dancers.prototype.create = function(name) {
  this.dancers.push(new Dancer(name));
  return this.dancers.at(-1);
}

Dancers.prototype.find = function(uuid) {
  return this.dancers.findByUUID(uuid);
}

Dancers.prototype.update = function(uuid, attribute, value) {
  return this.find(uuid).update(attribute, value);
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

  this.dancers.forEach((dance, index) => {
    this.dances[index] = Object.assign(new Dance(), dance);
  });
}

class Dancer {
  constructor(name) {
    this.uuid = createUUID();
    this.name = name;
  }
}
