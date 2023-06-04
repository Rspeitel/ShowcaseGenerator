import { createUUID } from '../helpers.js';

export function Dances() {
  this.dances = [];
}

Dances.prototype.create = function(name) {
  this.dances.push(new Dance(name));
  return this.dances.at(-1);
}

Dances.prototype.find = function(uuid) {
  return this.dances.findByUUID(uuid);
}

Dances.prototype.update = function(uuid, attribute, value) {
  return this.find(uuid).update(attribute, value);
}

Dances.prototype.remove = function(uuid) {
  this.dances.remove(uuid);
  return true;
}

Dances.prototype.toJSON = function() {
  return JSON.stringify(this.dances);
}

Dances.prototype.fromJSON = function(json) {
  this.dances = JSON.parse(json);

  this.dances.forEach((dance, index) => {
    this.dances[index] = Object.assign(new Dance(), dance);
  });
}


class Dance {
  constructor(name) {
    if(name === null || name === undefined) { name = "" }

    this.uuid = createUUID();
    this.name = name;
    this.danceMax = 12;
    this.dancerMax = 12;
  }

  update(attribute, value) {
    switch(attribute) {
      case 'name':
        this.name = value;
        break;
      case 'dance-max':
        this.danceMax = value;
        break;
      case 'dancer-max':
        this.dancerMax = value;
        break;
      default:
        console.log('You are trying to update something that does not exist: ' + attribute);
        break;
    }

    return this;
  }
}
