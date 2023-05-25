
// SETTINGS
var maxEntriesForCouple = 4;
var maxDancesForIndiviudal = 12;
var danceGroups = [['waltz', 'tango', 'foxtrot', 'vwaltz'], ['chacha', 'rumba', 'swing', 'bolero', 'mambo']];
var maxDancersOnFloor = new Map([['waltz', 12], ['tango', 12], ['foxtrot', 12], ['vwaltz', 12], ['chacha', 12], ['rumba', 12], ['swing', 12], ['bolero', 12], ['mambo', 12]]);
//const defaultDancesStruct = {waltz: 0, tango: 0, foxtrot: 0, vwaltz: 0, cha-cha: 0, rumba: 0, swing: 0, bolero: 0, mambo: 0};
var startingDanceNumber =100


// Data Structures
var entries = new Map();
var entriesCounter = 0;

var dancers = new Map();
var dancerCounter = startingDanceNumber;

var heats = new Map();
var heatCounter = 1;

// An array of arrays. First element is dance name, second is total count of entries to be danced
var eventDanceCard = new Map();
var eventDanceCardTranslator = [];

class Heat {
  entries = null;
  id = null;
  dance = null;

  constructor(dance) {
    this.id = heatCounter;
    this.dance = dance;
    heatCounter++;
  }
}

class Entries {
  id = null;
  leader = null;
  follower = null;
  dance = null;
  heat = null;
  constructor(leader, follower, dance) {
    this.leader = leader;
    this.follower = follower;
    this.dance = dance;
    this.id = entriesCounter;
    entriesCounter++;
  }
}

class Dancer {

  name = null;
  id = null;
  danceCard = new Map();
  entries = [];

  constructor(name) {
    this.name = name;
    this.id = dancerCounter;
    this.danceCard = createEmptyDanceCard();
    dancerCounter++;
  }
}

function onCreateHeatClick() {
  const input = document.getElementById("competitor-list").files[0];

  const reader = new FileReader();
  reader.onload = function (e) {
    text = reader.result;
    //Find out heading index for dances
    var tmpDances = text.split('\r\n')[0].split(',').slice(2);
    tmpDances.forEach((dance) => {
      eventDanceCard.set(dance.toLowerCase(), {
        dance: dance.toLowerCase(),
        numberOfEntries: 0,
        numberOfHeats: 0,
      });
      eventDanceCardTranslator.push(dance.toLowerCase());
    });

    //Iterate Through Each Row
    text.split('\r\n').slice(1).forEach((row) => {
      parsedRow = row.split(',');
      const leader = findOrInitalizeDancer(parsedRow[0]);
      const follower = findOrInitalizeDancer(parsedRow[1]);
      // Add Dances to totals
      // Add dances to couples
      parsedRow.splice(2).forEach((danceNumber, index) => {
        for(i = 0; i < danceNumber; i++) {
          const coupling = new Entries(leader, follower, eventDanceCard.get(eventDanceCardTranslator[index]).dance);
          eventDanceCard.get(eventDanceCardTranslator[index]).numberOfEntries++;
          entries.set(coupling.id, coupling);
          leader.danceCard.get(eventDanceCardTranslator[index]).numberOfHeats++;
          follower.danceCard.get(eventDanceCardTranslator[index]).numberOfHeats++;
          leader.entries.push(coupling);
          follower.entries.push(coupling);
        }
      });

      eventDanceCard.forEach((dance, danceName) => {
        dance.numberOfHeats = Math.ceil(dance.numberOfEntries / parseFloat(maxDancersOnFloor.get(danceName)) )
        dancers.forEach((dancer) => {
          dancer.danceCard.get(danceName).numberOfHeats > dance.numberOfHeats ? dance.numberOfHeats = dancer.danceCard.get(danceName).numberOfHeats : null;
        });
      });

      generateHeats();
    });


  }
  reader.readAsText(input);
}

// Major Functions
function generateHeats() {
  heats = new Map();
  danceGroups.forEach(group => {
    var heatCounter = [];
    group.forEach(dance => {
      heatCounter.push(eventDanceCard.get(dance).numberOfHeats);
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
    dancers.set(dancer.id, dancer);
    return dancer;
  }

  return dancers.get(dancerId);
}


function findDancer(name) {
  for (let [id, dancer] of dancers.entries()) {
    if (dancer.name === name) {
      return id;
    }
  }

  return -1;
}

function createEmptyDanceCard() {
  let emptyDanceCard = new Map();

  eventDanceCard.forEach((dance, danceName) => {
    emptyDanceCard.set(danceName, new Object({
        dance: danceName,
        numberOfHeats: 0,
        heats: [],
    }));
  });

  return emptyDanceCard;
}
