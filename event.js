(function (window) {
  'use strict';

  function Event() {
    this.dances = [];
    this.dancers = [];
    this.entries = [];
    this.heats = [];
    this.danceGroups = new Map();
  }

  /**
   * @param {string} name
   * @param {boolean} leader
   * @param {Array<uint>} entries
   */

  Event.prototype.findOrCreateDancer = function (name, leader, entries) {
    let dancer = this.dancers.find(dancer => dancer.name === name);

    if (dancer === undefined) {
      dancer = new Dancer(name)
      this.dancers.push(dancer);
    }
    dancer.addEntries(entries);
    dancer.leader = dancer.leader || leader;
  }

  Event.prototype.findOrCreateDance = function(name) {
    let newDance = new Dance(name);
    this.dances.push(newDance);
    return newDance;
  }

  Event.prototype.removeDance = function(uuid) {
    let index = this.dances.findIndex((dance) => dance.uuid === uuid);

    if (index > -1) { this.dances.splice(index, 1) }
  }

  Event.prototype.addGroup = function() {
    let danceGroupUUID = window.app.createUUID();
    this.danceGroups.set(danceGroupUUID, []);
    return danceGroupUUID;
  }

  Event.prototype.addDanceToGroup = function (dance, uuid) {
    this.danceGroups.get(uuid).push(dance);
  }

  Event.prototype.removeDanceFromGroup = function (uuid) {
    this.danceGroups.forEach((dances, groupUUID) => {
      let index = dances.findIndex((dance) => dance.uuid === uuid);
      if (index > -1) { dances.splice(index, 1) }
    })
  }

  Event.prototype.removeGroup = function(index) {
    this.danceGroups.delete(index);
  }

  class Dance {
    constructor(name) {
      if(name === null || name === undefined) { name = "" }

      this.uuid = window.app.createUUID();
      this.name = name;
      this.danceMax = 12;
      this.dancerMax = 12;
    }
  }

  class Dancer {
    constructor(name) {
      this.uuid = window.app.createUUID();
      this.name = name;
      this.leader = false;
    }

    addEntries(entryArray) {
      for(let i=0; i < entryArray.length; i++) {
        for (numOfEntries in entryArray[i]) {
          entries.push(new Entry(dances[i].name));
        }
      }
    }
  }

  class Entry {
    constructor(leader, follower, dance) {
      this.leader = leader;
      this.follower = follower;
      this.dance = dance;
    }
  }

  window.app = window.app || {};
  window.app.Event = Event;

})(window);
