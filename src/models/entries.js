import { Base } from './base.js';
import { createUUID } from '../helpers.js';

function Entry(_data) {
  this.uuid = createUUID();
  this.leader = null;
  this.folower = null;
  this.dance = null;
  this.heat = null;
}

export function Entries() {
  Base.call(this, Entry)
}

Entries.prototype = Object.create(Base.prototype);
Entries.prototype.constructor = Base;


