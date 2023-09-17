import { EventView } from './view.js';

export function EventController(event) {
  this.event = event;
  this.view = new EventView();


  // This is where you bind action to your view items
  // this.view.bind('item', () => this.updateThing('item'));
  //
}

EventController.prototype.init = function() {
  this.event.entries.elements.forEach(entry => {
    let readableEntry = this.event.getReadableEntry(entry);
    this.view.renderEntriesTable('newEntry', readableEntry);
  });
  //this.generateHeats();
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
