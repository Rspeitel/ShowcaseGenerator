import { createUUID } from '../helpers.js';

export function DanceGroups() {
  this.danceGroups = [];
}

DanceGroups.prototype.addGroup = function() {
  this.danceGroups.push(new DanceGroup());
  return this.danceGroups.at(-1).uuid;
}

DanceGroups.prototype.addDance = function(groupUUID, danceUUID, beforeDanceUUID) {
  this.danceGroups.findByUUID(groupUUID)?.insertDance(danceUUID, beforeDanceUUID);
  return true;
}

DanceGroups.prototype.removeGroup = function(uuid) {
  this.danceGroups.remove(uuid);
  return true;
}

DanceGroups.prototype.removeDance = function(uuid) {
  this.danceGroups.forEach(group => group.remove(uuid));
  return true;
}

DanceGroups.prototype.updateGroup = function(uuid, name) {
  this.danceGroups.findByUUID(uuid).name = name;
}

DanceGroups.prototype.toJSON = function() {
  return JSON.stringify(this.danceGroups);
}

DanceGroups.prototype.fromJSON = function(json) {
  this.danceGroups = JSON.parse(json);
}

class DanceGroup {
  constructor() {
    this.uuid = createUUID();
    this.name = "";
    this.danceUUIDs = [];
  }

  insertDance(danceUUID, beforeDanceUUID) {
    this.danceUUIDs.insertBefore(danceUUID, beforeDanceUUID);
  }

  remove(uuid) {
    this.danceUUIDs.remove(uuid);
  }
}
