// Service

export function HeatGenerationService(event) {
  this.event = event;
}

HeatGenerationService.prototype.generate = function() {
  console.log("GENERATING");
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

    entryCount.forEach((entryInfo) => {
      let entriesForDancer = entriesForDance.filter((entry) => {
        return [entry.leaderUUID, entry.followerUUID].includes(entryInfo[0]);
      })

      let skipped = 0;
      entriesForDancer.forEach((entry, index) => {
        while (index + skipped < heats.length && entry.heatUUID === null) {
          if(heats[index + skipped].entries.length >= dance.danceMax) {
            skipped++;
            continue;
          }
          heats[index + skipped].entries.push(entry.uuid);
          entry.update('heatUUID', heats.uuid);
          break;
        }
      })
    });
  });
}
