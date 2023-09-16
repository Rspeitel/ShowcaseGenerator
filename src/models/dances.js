import { Base } from './base.js';
import { createUUID } from '../helpers.js';

// I completed the todo!
function Dance(_data) {
  if(name === null || name === undefined) { name = "" }

  this.uuid = createUUID();
  this.name = name;
  this.danceMax = 12;
  this.dancerMax = 12;
}

Dance.prototype.update = function(attribute, value) {
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

export function Dances() {
  Base.call(this, Dance);
}

Dances.prototype = Object.create(Base.prototype);
Dances.prototype.constructor = Base;
