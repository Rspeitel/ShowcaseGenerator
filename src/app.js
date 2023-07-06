import { GlobalHelpers } from './helpers.js';
import { AppController } from './controller.js';
import { Event } from './event.js';
import data from '../data/default.json' assert { type: "json" };

(function () {
  'use strict';


  function App() {
    GlobalHelpers();
    this.event = new Event();
    this.event.fromJSON(data);
    this.appController = new AppController(this.event);
  }

  var ShowcaseGenerator = new App();
  ShowcaseGenerator.appController.init();
})();
