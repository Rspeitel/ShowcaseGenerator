// SETTINGS
var maxEntriesForCouple = 4;
var maxDancesForIndiviudal = 12;
var danceGroupsSetting = [['waltz', 'tango', 'foxtrot', 'vwaltz'], ['chacha', 'rumba', 'swing', 'bolero', 'mambo']];
var GLOBAL_MaxDancersOnFloor = new Map([['waltz', 12], ['tango', 12], ['foxtrot', 12], ['vwaltz', 12], ['chacha', 12], ['rumba', 12], ['swing', 12], ['bolero', 12], ['mambo', 12]]);
//const defaultDancesStruct = {waltz: 0, tango: 0, foxtrot: 0, vwaltz: 0, cha-cha: 0, rumba: 0, swing: 0, bolero: 0, mambo: 0};
var startingDanceNumber =100


// Data Structures
var GLOBAL_EventDanceCard = new EventDanceCard();
var GLOBAL_EntryCounter = 0;
var GLOBAL_HeatCounter = 1;
var GLOBAL_DancerCounter = startingDanceNumber;


// An array of arrays. First element is dance name, second is total count of entries to be danced
var GLOBAL_EventDanceCardTranslator = [];

function onCreateHeatClick() {
  const input = document.getElementById("competitor-list").files[0];

  const reader = new FileReader();
  reader.onload = function (e) {
    text = reader.result;

    const csvData = text.split('\r\n').map((row) => row.split(','));

    mainGenerator(csvData);
  }
  reader.readAsText(input);
}


// Major Functions

function mainGenerator(csvData) {
  //First two are always leader/follower
  csvData.pop(-1);
  populateDancesFromHeader(csvData[0].slice(2));

  csvData.slice(1).forEach((row) => {
    // First two are always leader and follower
    const leader = findOrInitalizeDancer(row[0]);
    const follower = findOrInitalizeDancer(row[1]);
    row.slice(2).forEach((numberOfEntries, index) => {
      generateEntriesForDance(leader, follower, GLOBAL_EventDanceCardTranslator[index], numberOfEntries, GLOBAL_EventDanceCard.dances)
    });
  });

  var minNumberOfHeats = findMinNumberOfHeatsPerDance(GLOBAL_EventDanceCard.dances, GLOBAL_EventDanceCard.dancers);
  generateHeats(danceGroupsSetting, minNumberOfHeats, GLOBAL_EventDanceCard.dances);
  placeEntriesInHeat(GLOBAL_EventDanceCard);

  // Populate UI
  populateDancersDropdown(GLOBAL_EventDanceCard.dancers);
}

// Populate UI methods
function populateDancersDropdown(dancers) {
  var list = document.getElementById("dancer-list");
  dancers.forEach((dancer) => {
    list.innerHTML += `<a onclick='selectDancer("${dancer.id}")'>${dancer.id}: ${dancer.name}</a>`
  })
}

function populateDancesFromHeader(header) {
  header.forEach((dance) => {
    GLOBAL_EventDanceCard.dances.set(dance.toLowerCase(), {
      dance: dance.toLowerCase(),
      entries: new Map(),
      heats: new Map(),
    });
    GLOBAL_EventDanceCardTranslator.push(dance.toLowerCase());
  });
}

function generateEntriesForDance(leader, follower, dance, numberOfEntries, eventDanceList) {
  for(i = 0; i < numberOfEntries; i++) {
    const tmpEntry = new Entry(leader, follower, dance);
    eventDanceList.get(dance).entries.set(tmpEntry.id, tmpEntry)
    leader.dances.get(dance).entries.set(tmpEntry.id, tmpEntry);
    leader.dancingWith.set(follower.id, follower);
    follower.dances.get(dance).entries.set(tmpEntry.id, tmpEntry);
    follower.dancingWith.set(leader.id, leader);
  }
}

function findMinNumberOfHeatsPerDance(dances, dancers) {
  var minNumberOfHeats = new Map();
  dances.forEach((dance, danceName) => {
    minNumberOfHeats.set(danceName, Math.ceil(dance.entries.size / parseFloat(GLOBAL_MaxDancersOnFloor.get(danceName))));
    dancers.forEach((dancer) => {
      if (dancer.dances.get(danceName).entries.size > minNumberOfHeats.get(danceName)) {
        minNumberOfHeats.set(dance.name, dancer.dances.get(danceName).entries.size);
      }
    });
  });

  return minNumberOfHeats;
}

function generateHeats(danceGroups, minNumberOfHeats, dances) {
  danceGroups.forEach(group => {
    var heatCounter = [];
    group.forEach(dance => {
      heatCounter.push(minNumberOfHeats.get(dance));
    })

    lastIndex = 0;
    while(heatCounter.some((num) => num > 0)) {
      if(lastIndex < group.length && heatCounter[lastIndex] > 0) {
        heatCounter[lastIndex]--;
        var newHeat = new Heat(group[lastIndex]);
        dances.get(group[lastIndex]).heats.set(newHeat.id, newHeat);
      } else if (lastIndex > group.length) {
        lastIndex = -1;
      }
      lastIndex++
    }
  })
}

function placeEntriesInHeat(eventDanceCard) {
  eventDanceCard.dancers.forEach((dancer) => {
    dancer.dances.forEach((dance) => {
      Array.from(dance.entries.values()).filter((entry) => entry.heat === null).forEach((entry) => {
        let validHeats = entry.findValidHeats(Array.from(eventDanceCard.dances.get(entry.dance).heats.values()));
        if(typeof validHeats[0] === 'object') { placeEntryInHeat(validHeats[0], entry) }
      })
    });
  });
}

// Helper functions

function placeEntryInHeat(heat, entry) {
  entry.heat = heat;
  heat.entries.set(entry.id, entry);
}
function findOrInitalizeDancer(name) {
  const dancerId = findDancer(name);
  if (dancerId === -1) {
    const dancer = new Dancer(name, GLOBAL_EventDanceCardTranslator);
    GLOBAL_EventDanceCard.dancers.set(dancer.id, dancer);
    return dancer;
  }

  return GLOBAL_EventDanceCard.dancers.get(dancerId);
}


function findDancer(name) {
  for (let [id, dancer] of GLOBAL_EventDanceCard.dancers.entries()) {
    if (dancer.name === name) {
      return id;
    }
  }

  return -1;
}

