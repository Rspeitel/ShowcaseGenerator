import { Base } from './base.js';
import { createUUID, nullCheck } from '../helpers.js';

function Dancer(data) {
  this.uuid = createUUID();
  this.name = data;
  this.bibNumber = '000';
}

Dancer.prototype.updateAll = function(dancer) {
    this.name = dancer.name;
    this.bibNumber = dancer.bibNumber;
    
    return this;
}
export function Dancers() {
  Base.call(this, Dancer);
}

Dancers.prototype = Object.create(Base.prototype);
Dancers.prototype.constructor = Base;

Dancers.prototype.updateAll = function(dancer) {
  return this.find(dancer.uuid).updateAll(dancer);
}

Dancers.prototype.findOrCreateByName = function(name) {
  let dancer = this.elements.findBy('name', name);

  if(nullCheck(dancer)) { return dancer; }
  else { return this.create(name) }
}
