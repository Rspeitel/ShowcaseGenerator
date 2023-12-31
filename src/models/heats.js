import { Base } from './base.js';
import { createUUID } from '../helpers.js';

function Heat(data) {
  this.uuid = createUUID();
  this.danceUUID = data?.danceUUID; 
  this.entries = data?.entries || [];
  this.heatNumber = 1;
}

export function Heats() {
  Base.call(this, Heat)
}

Heats.prototype = Object.create(Base.prototype);
Heats.prototype.constructor = Base;

Heats.prototype.allHeatsByDance = function(danceUUID) {
  return this.elements.filter((heats) => heats.danceUUID = danceUUID);
}

Heat.prototype.update = function(attribute, value) {
  switch(attribute) {
    case 'heatNumber':
      this.heatNumber = value;
      break;
  return this;
  }
}


