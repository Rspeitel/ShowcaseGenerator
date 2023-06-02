import { SettingsTemplate } from './templates.js';
import { SettingsView } from './views.js';
import { SettingsController } from './controller.js';
import { Event } from './event.js';

(function () {
  'use strict';


  function App() {
    this.event = new Event();
    this.settingsTemplate = new SettingsTemplate();
    this.settingsView = new SettingsView(this.settingsTemplate);
    this.settingsController = new SettingsController(this.event, this.settingsView);
  }

  var ShowcaseGenerator = new App();
  ShowcaseGenerator.settingsController.addDance('Waltz');
  ShowcaseGenerator.settingsController.addDance('Tango');
  ShowcaseGenerator.settingsController.addDance('Foxtrot');
  ShowcaseGenerator.settingsController.addDance('V Waltz');

  window.app = window.app || {};
  window.app.ShowcaseGenerator = ShowcaseGenerator;
})();
