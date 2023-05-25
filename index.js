// SETTINGS
var maxEntriesForCouple = 4;
var maxDancesForIndiviudal = 12;
var danceGroupsSetting = [['waltz', 'tango', 'foxtrot', 'vwaltz'], ['chacha', 'rumba', 'swing', 'bolero', 'mambo']];
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
      generateEntriesForDance(leader, follower, eventDanceCardTranslator[index], numberOfEntries)
    });
  });

  var minNumberOfHeats = findMinNumberOfHeatsPerDance(eventDanceCard.dances, eventDanceCard.dancers);
  generateHeats(danceGroupsSetting, minNumberOfHeats, eventDanceCard.dances);
}

function populateDancesFromHeader(header) {
  header.forEach((dance) => {
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

function findMinNumberOfHeatsPerDance(dances, dancers) {
  var minNumberOfHeats = new Map();
  dances.forEach((dance, danceName) => {
    minNumberOfHeats.set(danceName, Math.ceil(dance.entries.size / parseFloat(maxDancersOnFloor.get(danceName))));
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

