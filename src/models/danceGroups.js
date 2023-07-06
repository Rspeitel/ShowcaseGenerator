import { createUUID } from '../helpers.js';

export function DanceGroups() {
  this.danceGroups = [];
}

DanceGroups.prototype.addGroup = function() {
  this.danceGroups.push(new DanceGroup());
  return this.danceGroups.at(-1);
}

DanceGroups.prototype.addDance = function(danceUUID, groupUUID, referenceUUID) {
  this.danceGroups.findByUUID(groupUUID)?.insertDance(danceUUID, referenceUUID);
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

  this.danceGroups.forEach((group, index) => {
    this.danceGroups[index] = Object.assign(new DanceGroup(), group)
  })
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
