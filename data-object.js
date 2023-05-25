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
}

class EventDanceCard {
  dances = new Map();
  dancers = new Map();

  constructor() {

  }
}
