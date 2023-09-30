import { EventView } from './view.js';
import { HeatGenerationService } from '../../services/heatGenerationService.js';

export function EventController(event) {
  this.event = event;
  this.view = new EventView();


  // This is where you bind action to your view items
  // this.view.bind('item', () => this.updateThing('item'));
  //
}

EventController.prototype.init = function() {
  if (this.event.heats.elements.length === 0) {
    new HeatGenerationService(this.event).generate();
  }

  let readableEntries = [];
  this.event.entries.elements.forEach(entry => {
    readableEntries.push(this.event.getReadableEntry(entry));
  });

  readableEntries.sort((a, b) => a.heatNumber - b.heatNumber);

  readableEntries.forEach((entry) => this.view.renderEntriesTable('newEntry', entry));
}

EventController.prototype.generateHeats = function () {
}

/* Private Functions */
function insertIntoHeat(heatUUID, entry) {
  let heat = this.heats.find(heatUUID);
    
  let entriesPartners = heat.entries.map((uuid) => {
    let tmpEntry = this.entries.find(uuid);
    return [tmpEntry.leaderUUID, tmpEntry.followerUUID];
  }).flat();

  if (entriesPartners.some(r=> [entry.leaderUUID, entry.partnerUUID].includes(r))) {
    return false;
  }

  heat.entries.push(entry.uuid);
}
