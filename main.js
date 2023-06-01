(function () {
  'use strict';


  function App() {
    this.event = new app.Event();
    this.settingsTemplate = new app.SettingsTemplate();
    this.settingsView = new app.SettingsView(this.settingsTemplate);
    this.settingController = new app.SettingsController(this.event, this.settingsView);
  }

  var ShowcaseGenerator = new App();
  ShowcaseGenerator.settingController.addDance('Waltz');
  ShowcaseGenerator.settingController.addDance('Tango');
  ShowcaseGenerator.settingController.addDance('Foxtrot');
  ShowcaseGenerator.settingController.addDance('V Waltz');

  window.app = window.app || {};
  window.app.ShowcaseGenerator = ShowcaseGenerator;
})();
