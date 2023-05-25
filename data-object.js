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
    this.id = entriesCounter;
    entriesCounter++;
  }
}

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

class Dancer {
  name = null;
  id = null;
  dances = new Map();

  constructor(name) {
    this.name = name;
    this.id = dancerCounter;
    let emptyDanceCard = new Map();
    eventDanceCard.dances.forEach((dance, danceName) => {
      emptyDanceCard.set(danceName, new Object({
          dance: danceName,
          entries: new Map(),
      }));
    });
    dancerCounter++;
    this.dances = emptyDanceCard
  }
}

class EventDanceCard {
  dances = new Map();
  dancers = new Map();

  constructor() {

  }

}
