import { Dances } from './models/dances.js';
import { DanceGroups } from './models/danceGroups.js';
import { Dancers } from './models/dancers.js';
import { Entries } from './models/entries.js';

export function Event() {
  this.dances = new Dances();
  this.danceGroups = new DanceGroups();
  this.dancers = new Dancers();
  this.entries = new Entries();
}

Event.prototype.getReadableEntry = function (entry) {
  let leader = this.dancers.find(entry.leaderUUID);
  let follower = this.dancers.find(entry.followerUUID);
  let dance = this.dances.find(entry.danceUUID);

  return {
    leaderName: leader?.name,
    followerName: follower?.name,
    bibNumber: leader?.bibNumber,
    dance: dance?.name,
    heatNumber: '0',
  };
}

Event.prototype.deleteDancer = function (uuid) {
  this.dancers.remove(uuid);
  //TODO Remove entries involving dancer
  //TODO Remove entries from heats involving dancer
  
  return true;
}

Event.prototype.toJSON = function () {
  return JSON.stringify({
    dances: this.dances.toJSON(),
    danceGroups: this.danceGroups.toJSON(),
    dancers: this.dancers.toJSON(),
    entries: this.entries.toJSON(),
  });
}

Event.prototype.fromJSON = function(json) {
    this.dances.fromJSON(json.dances);
    this.danceGroups.fromJSON(json.danceGroups);
    this.dancers.fromJSON(json.dancers);
    this.entries.fromJSON(json.entries);
  // this.dancers = JSON.parse(json.dancers);
  // this.heats = JSON.parse(json.heats);
  //this.danceGroups = parsedJson.danceGroups;
}
