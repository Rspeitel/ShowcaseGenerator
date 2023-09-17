import { Base } from './base.js';
import { createUUID } from '../helpers.js';

function Entry(data) {
  this.uuid = createUUID();
  this.leaderUUID = data?.leaderUUID;
  this.followerUUID = data?.followerUUID;
  this.danceUUID = data?.danceUUID;
  this.heatUUID = null;
}

export function Entries() {
  Base.call(this, Entry)
}

Entries.prototype = Object.create(Base.prototype);
Entries.prototype.constructor = Base;

Entries.prototype.allEntriesByDance = function(danceUUID) {
  return this.elements.filter((element) => element.danceUUID === danceUUID);
}

Entries.prototype.update = function(attribute, value) {
  switch(attribute) {
    case 'heatUUID':
      this.heatUUID = value;
      break;
  return this;
  }
}
