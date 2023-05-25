// SETTINGS
var maxEntriesForCouple = 4;
var maxDancesForIndiviudal = 12;
var danceGroups = [['waltz', 'tango', 'foxtrot', 'vwaltz'], ['chacha', 'rumba', 'swing', 'bolero', 'mambo']];
var maxDancersOnFloor = new Map([['waltz', 12], ['tango', 12], ['foxtrot', 12], ['vwaltz', 12], ['chacha', 12], ['rumba', 12], ['swing', 12], ['bolero', 12], ['mambo', 12]]);
//const defaultDancesStruct = {waltz: 0, tango: 0, foxtrot: 0, vwaltz: 0, cha-cha: 0, rumba: 0, swing: 0, bolero: 0, mambo: 0};
var startingDanceNumber =100


// Data Structures
var eventDanceCard = new EventDanceCard();
var entriesCounter = 0;
var heatCounter = 1;

var dancerCounter = startingDanceNumber;


// An array of arrays. First element is dance name, second is total count of entries to be danced
var eventDanceCardTranslator = [];

function onCreateHeatClick() {
  const input = document.getElementById("competitor-list").files[0];

  const reader = new FileReader();
  reader.onload = function (e) {
    text = reader.result;

    populateDancesFromHeader(text.split('\r\n')[0].split(',').slice(2));

    //Iterate Through Each Row
    text.split('\r\n').slice(1).forEach((row) => {
      parsedRow = row.split(',');
      const leader = findOrInitalizeDancer(parsedRow[0]);
      const follower = findOrInitalizeDancer(parsedRow[1]);
      // Add Dances to totals
      // Add dances to couples
      parsedRow.splice(2).forEach((numberOfEntries, index) => {
        generateEntriesForDance(leader, follower, eventDanceCardTranslator[index], numberOfEntries)
      });
    });

    eventDanceCard.dances.forEach((dance, danceName) => {
      dance.numberOfHeats = Math.ceil(dance.numberOfEntries / parseFloat(maxDancersOnFloor.get(danceName)) )
      eventDanceCard.dancers.forEach((dancer) => {
        dancer.dances.get(danceName).numberOfHeats > dance.numberOfHeats ? dance.numberOfHeats = dancer.dances.get(danceName).numberOfHeats : null;
      });
    });

    generateHeats();
  }
  reader.readAsText(input);
}

// Major Functions
function populateDancesFromHeader(headerArray) {
  headerArray.forEach((dance) => {
    eventDanceCard.dances.set(dance.toLowerCase(), {
      dance: dance.toLowerCase(),
      entries: new Map(),
      heats: new Map(),
    });
    eventDanceCardTranslator.push(dance.toLowerCase());
  });
}

function generateEntriesForDance(leader, follower, dance, numberOfEntries) {
  for(i = 0; i < numberOfEntries; i++) {
    const tmpEntry = new Entry(leader, follower, dance);
    eventDanceCard.dances.get(dance).entries.set(tmpEntry.id, tmpEntry)
    leader.dances.get(dance).entries.set(tmpEntry.id, tmpEntry);
    follower.dances.get(dance).entries.set(tmpEntry.id, tmpEntry);
  }
}

function generateHeats() {
  danceGroups.forEach(group => {
    var heatCounter = [];
    group.forEach(dance => {
      heatCounter.push(eventDanceCard.dances.get(dance).numberOfHeats);
    })

    lastIndex = 0;
    while(heatCounter.some((num) => num > 0)) {
      if(lastIndex < group.length && heatCounter[lastIndex] > 0) {
        heatCounter[lastIndex]--;
        var newHeat = new Heat(group[lastIndex]);
        heats.set(newHeat.id, new Heat(group[lastIndex]))
      } else if (lastIndex > group.length) {
        lastIndex = -1;
      }
      lastIndex++
    }
  })

}

// Helper functions
function findOrInitalizeDancer(name) {
  const dancerId = findDancer(name);
  if (dancerId === -1) {
    const dancer = new Dancer(name);
    eventDanceCard.dancers.set(dancer.id, dancer);
    return dancer;
  }

  return eventDanceCard.dancers.get(dancerId);
}


function findDancer(name) {
  for (let [id, dancer] of eventDanceCard.dancers.entries()) {
    if (dancer.name === name) {
      return id;
    }
  }

  return -1;
}

