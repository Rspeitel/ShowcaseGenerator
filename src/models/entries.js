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


