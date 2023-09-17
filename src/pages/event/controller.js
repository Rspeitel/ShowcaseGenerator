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
  debugger;
  this.generateHeats();
}

EventController.prototype.generateHeats = function () {
  // TODO: 
  //
  // 1) Gather all the entries for a given dance
  // 2) Sort those entries by people, and find the person with the most entries (potentialHeats2)
  // 3) Take total number of entries / people allowed on the floor potentialHeats1
  // 4) Compare potentialHeats 1 and 2. The greater of which is the number of heats you need. 
  // 5) Distribute people into each heat starting with people who have the most heats. 
      
  this.event.dances.elements.forEach(dance => {
    let entriesForDance = this.event.entries.allEntriesByDance(dance.uuid);
    // Sort entries by individuals. 
    let entryCount = new Map();
    let parsedEntriesForDance = entriesForDance.map((entry) => {
      entryCount.set(entry.leaderUUID, (entryCount.get(entry.leaderUUID) ?? 0) + 1)
      entryCount.set(entry.followerUUID, (entryCount.get(entry.followerUUID) ?? 0) + 1)
      return [
        {dancerUUID: entry.leaderUUID, uuid: entry.uuid},
        {dancerUUID: entry.followerUUID, uuid: entry.uuid},
      ];
    }).flat();
    
    entryCount = [...entryCount.entries()].sort((a, b) => b[1] - a[1])
 
    let potentialHeatsOne = entryCount[0][1];

    let potentialHeatsTwo = Math.ceil(entriesForDance.length / dance.danceMax);

    let numberOfHeatsToGenerate = Math.max(potentialHeatsOne, potentialHeatsTwo);
    let heats = [];

    for (let newHeat = 0; newHeat < numberOfHeatsToGenerate; newHeat++) {
      heats.push(this.event.heats.create({danceUUID: dance.uuid}));
    }

    debugger;
    entryCount.forEach((entryInfo) => {
      console.log(entryInfo);
      let entriesForDancer = entriesForDance.filter((entry) => {
        return [entry.leaderUUID, entry.followerUUID].includes(entryInfo[0]);
      })

      let skipped = 0;
      entriesForDancer.forEach((entry, index) => {
        let heatToLookAt = index + skipped;
        while (heatToLookAt < heats.length) {
          if(heats[heatToLookAt].entries.length >= dance.danceMax) {
            skipped++;
            continue;
          }
          heats[heatToLookAt].entries.push(entry.uuid);
          break;
        }
      })
    });
  });
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
