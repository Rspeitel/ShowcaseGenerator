import { Dances } from './models/dances.js';
import { DanceGroups } from './models/danceGroups.js';
import { Dancers } from './models/dancers.js';

export function Event() {
  this.dances = new Dances();
  this.danceGroups = new DanceGroups();
  this.dancers = new Dancers();
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
  });
}

Event.prototype.fromJSON = function(json) {
    this.dances.fromJSON(json.dances);
    this.danceGroups.fromJSON(json.danceGroups);
    this.dancers.fromJSON(json.dancers);
  // this.dancers = JSON.parse(json.dancers);
  // this.entries = JSON.parse(json.entries);
  // this.heats = JSON.parse(json.heats);
  //this.danceGroups = parsedJson.danceGroups;
}
