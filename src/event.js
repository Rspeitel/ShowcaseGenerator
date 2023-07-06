import { Dances } from './models/dances.js';
import { DanceGroups } from './models/danceGroups.js';

export function Event() {
  this.dances = new Dances();
  this.danceGroups = new DanceGroups();
}

Event.prototype.toJSON = function () {
  return JSON.stringify({
    dances: this.dances.toJSON(),
    danceGroups: this.danceGroups.toJSON(),
  });
}

Event.prototype.fromJSON = function(json) {
    this.dances.fromJSON(json.dances);
    this.danceGroups.fromJSON(json.danceGroups);
  // this.dances = JSON.parse(json.dances);
  // this.dancers = JSON.parse(json.dancers);
  // this.entries = JSON.parse(json.entries);
  // this.heats = JSON.parse(json.heats);
  //this.danceGroups = parsedJson.danceGroups;
}
