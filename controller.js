(function (window) {

  function SettingsController(event, view) {
    this.event = event;
    this.view = view;

    this.view.bind('addDance', () => this.addDance());
    this.view.bind('removeDance', (uuid) => this.removeDance(uuid));
    this.view.bind('addGroup', () => this.addGroup());
    this.view.bind('removeGroup', (uuid) => this.removeGroup(uuid));
    this.view.bind('removeDanceFromGroup', (uuid) => this.removeDanceFromGroup(uuid));
  }

  SettingsController.prototype.addDance = function(name) {
    let dance = this.event.findOrCreateDance(name);
    this.view.addDance(dance);
  }


  SettingsController.prototype.addGroup = function() {
    let uuid = this.event.addGroup();
    this.view.addGroup(uuid);
  }

  SettingsController.prototype.addDanceToGroup = function(dance, uuid) {
    this.event.addDanceToGroup(dance, uuid);
    this.view.addDanceToGroup(dance, uuid);
  }


  SettingsController.prototype.removeGroup = function(uuid) {
    this.event.removeGroup(uuid);
    this.view.removeGroup(uuid);
  }

  SettingsController.prototype.removeDance = function(uuid) {
    this.event.removeDance(uuid);
    this.view.removeDance(uuid)
  }

  SettingsController.prototype.removeDanceFromGroup = function(uuid) {
    this.event.removeDanceFromGroup(uuid);
    this.view.removeGroup('item-' + uuid)
  }

  window.app = window.app || {};
  window.app.SettingsController = SettingsController;
})(window);
