import { createUUID } from '../helpers.js';

export function Entries() {
  this.entries = [];
}

Entries.prototype.create = function(name) {
  this.entries.push(new Entry());
  return this.entries.at(-1);
}

Entries.prototype.find = function(uuid) {
  return this.entries.findByUUID(uuid);
}

Entries.prototype.remove = function(uuid) {
  this.entries.remove(uuid);
  return true;
}

Entries.prototype.toJSON = function() {
  return JSON.stringify(this.entries);
}

Entries.prototype.fromJSON = function(json) {
  this.entries = JSON.parse(json);

  this.entries.forEach((entry, index) => {
    this.entries[index] = Object.assign(new Entries(), entry);
  });
}


class Entry {
  constructor() {
    this.uuid = createUUID();
    this.leader = null;
    this.folower = null;
    this.dance = null;
    this.heat = null;
  }
}
