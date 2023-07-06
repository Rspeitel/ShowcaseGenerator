import { GlobalHelpers } from './helpers.js';
import { SettingsController } from './pages/settings/controller.js';
import { Event } from './event.js';
import data from '../data/default.json' assert { type: "json" };

(function () {
  'use strict';


  function App() {
    GlobalHelpers();
    this.event = new Event();
    this.event.fromJSON(data);
    this.settingsController = new SettingsController(this.event);
  }

  var ShowcaseGenerator = new App();
  ShowcaseGenerator.settingsController.initView();
})();
