class Entry {
  id = null;
  leader = null;
  follower = null;
  dance = null;
  heat = null;
  constructor(leader, follower, dance) {
    this.leader = leader;
    this.follower = follower;
    this.dance = dance;
    this.id = GLOBAL_EntryCounter;
    GLOBAL_EntryCounter++;
  }

  findValidHeats(heats) {
    return heats.map((heat) => {
      if (heat.canAddEntry(this)) { return heat }
      return null;
    }).filter((heat) => heat !== null);
  }
}

class Heat {
  entries = new Map();
  id = null;
  dance = null;

  constructor(dance) {
    this.id = GLOBAL_HeatCounter;
    this.dance = dance;
    GLOBAL_HeatCounter++;
  }

  canAddEntry(possibleEntry) {
    if(this.entries.size >= GLOBAL_MaxDancersOnFloor.get(this.dance)) { return false }
    if(possibleEntry.dance !== this.dance) { return false }
    let resultArray = Array.from(this.entries.values()).map((entry) => {
      if(possibleEntry.leader.id === entry.leader.id || possibleEntry.leader.id === entry.follower.id) { return false }
      if(possibleEntry.follower.id === entry.leader.id || possibleEntry.follower.id === entry.follower.id) { return false }
      return true;
    });

    return !resultArray.some((entry) => !entry);
  }
}

class Dancer {
  name = null;
  id = null;
  dancingWith = new Map();
  dances = new Map();

  constructor(name, listOfDances) {
    this.name = name;
    this.id = GLOBAL_DancerCounter;
    let emptyDanceCard = new Map();
    listOfDances.forEach((danceName) => {
      emptyDanceCard.set(danceName, new Object({
          dance: danceName,
          entries: new Map(),
      }));
    });
    GLOBAL_DancerCounter++;
    this.dances = emptyDanceCard
  }

  populateDancerProfile() {
    // Find dance partners
    var dancingWithElement = document.getElementById("dancer-profile-dancing-with");
    this.dancingWith.forEach((dancer) => {
      var newElem = document.createElement('button');
      newElem.innerHTML = dancer.name;
      dancingWithElement.appendChild(newElem);
    })

    // Collect Entries and count
    var breakdown = document.getElementById("dancer-profile-total-breakdown");
    var entries = [];
    breakdown.innerHTML = "";
    this.dances.forEach((dance) => {
      entries.push(Array.from(dance.entries.values()));
      var newElem = document.createElement('tr');
      var danceNameData = document.createElement('td');
      danceNameData.innerHTML = dance.dance;
      var total = document.createElement('td');
      total.innerHTML = dance.entries.size;
      newElem.appendChild(danceNameData);
      newElem.appendChild(total);
      breakdown.appendChild(newElem);
    })

    // Sort Entries
    entries = entries.flat();
    entries = entries.sort((a, b) => {
      if (a.heat === null) {
        return 1;
      } else if (b.heat === null) {
        return -1;
      } else {
        return a.heat.id - b.heat.id;
      }
    });

    // Display Entries as HeatList
    var heatlist = document.getElementById("dancer-profile-heatlist-body");
    heatlist.innerHTML = "";
    entries.forEach((entry) => {
      var newElem = document.createElement('tr');
      var heatNumber = document.createElement('td');
      heatNumber.innerHTML = (entry.heat !== null ? entry.heat.id : 'N/A') + ' ' + entry.dance;
      var dancers = document.createElement('td');
      dancers.innerHTML = `(${entry.leader.id}) ${entry.leader.name} & ${entry.follower.name}`
      newElem.appendChild(heatNumber);
      newElem.appendChild(dancers);
      heatlist.appendChild(newElem);
    })

  }
}

class EventDanceCard {
  dances = new Map();
  dancers = new Map();

  constructor() {

  }
}
