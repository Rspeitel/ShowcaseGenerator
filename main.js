(function () {
  'use strict';


  function App() {
    this.event = new app.Event();
    this.settingsTemplate = new app.SettingsTemplate();
    this.settingsView = new app.SettingsView(this.settingsTemplate);
    this.settingController = new app.SettingsController(this.event, this.settingsView);
  }

  var ShowcaseGenerator = new App();
  ShowcaseGenerator.event.findOrCreateDance('Waltz');
  ShowcaseGenerator.event.findOrCreateDance('Tango');
  ShowcaseGenerator.event.findOrCreateDance('Foxtrot');
  ShowcaseGenerator.event.findOrCreateDance('V-Waltz');
  ShowcaseGenerator.event.addGroup();
  ShowcaseGenerator.event.addGroup();

  ShowcaseGenerator.settingsView.init(ShowcaseGenerator.event);

  ShowcaseGenerator.settingController.addDanceToGroup(ShowcaseGenerator.event.dances[0], ShowcaseGenerator.event.danceGroups.keys().next().value)

  window.app = window.app || {};
  window.app.ShowcaseGenerator = ShowcaseGenerator;
})();
