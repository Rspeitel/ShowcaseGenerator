(function (window) {

  function SettingsController(event, view) {
    this.event = event;
    this.view = view;

    this.currentHoverGroup = null;
    this.currentHoverItem = null;

    this.view.bind('addDance', () => this.addDance());
    this.view.bind('removeDance', (uuid) => this.removeDance(uuid));
    this.view.bind('addGroup', () => this.addGroup());
    this.view.bind('removeGroup', (uuid) => this.removeGroup(uuid));
    this.view.bind('removeDanceFromGroup', (uuid) => this.removeDanceFromGroup(uuid));
    this.view.bind('dragDance', (event, uuid) => this.moveDance(event, uuid));
  }

  SettingsController.prototype.updateDance = function(uuid, event) {
    this.event.updateDance(uuid, event.srcElement.id, event.srcElement.value);
    let dance = this.event.findDance(uuid);

    if (event.srcElement.id === 'name') {
      this.view.updateDance(uuid, dance);
    }
  }

  SettingsController.prototype.moveDance = function(event, uuid) {
    if(event === 'drop') {
      if (this.currentHoverGroup !== null && this.currentHoverGroup !== undefined) {
        this.removeDanceFromGroup(uuid);
        this.addDanceToGroup(uuid, this.currentHoverGroup, this.currentHoverItem);
      }
      this.currentHoverItem = null;
      this.currentHoverGroup = null;
    } else if (event === 'dragItem') {
      this.currentHoverItem = uuid;
      if (this.currentHoverGroup !== null && this.currentHoverGroup !== undefined ) {this.view.addDanceGroupHelper(this.currentHoverGroup, this.currentHoverItem)};
    } else if (event === 'dragGroup') {
      this.currentHoverGroup = uuid;
      if (this.currentHoverGroup !== null && this.currentHoverGroup !== undefined ) {this.view.addDanceGroupHelper(this.currentHoverGroup, this.currentHoverItem)};
    }
  }

  SettingsController.prototype.addDance = function(name) {
    let dance = this.event.findOrCreateDance(name);
    this.view.addDance(dance, (update) => this.updateDance(dance.uuid, update));
  }


  SettingsController.prototype.addGroup = function() {
    let uuid = this.event.addGroup();
    this.view.addGroup(uuid);
  }

  SettingsController.prototype.addDanceToGroup = function(danceUUID, groupUUID, beforeDanceUUID) {
    let dance = this.event.findDance(danceUUID);
    this.event.addDanceToGroup(dance, groupUUID, beforeDanceUUID);
    this.view.addDanceToGroup(dance, groupUUID, beforeDanceUUID);
  }


  SettingsController.prototype.removeGroup = function(uuid) {
    this.event.removeGroup(uuid);
    this.view.removeGroup(uuid);
  }

  SettingsController.prototype.removeDance = function(uuid) {
    this.event.removeDance(uuid);
    this.removeDanceFromGroup(uuid);
    this.view.removeDance(uuid);
  }

  SettingsController.prototype.removeDanceFromGroup = function(uuid) {
    this.event.removeDanceFromGroup(uuid);
    this.view.removeGroup('item-' + uuid)
  }

  SettingsController.prototype.init = function() {
    // TODO
  }

  window.app = window.app || {};
  window.app.SettingsController = SettingsController;
})(window);
