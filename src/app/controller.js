import { AppView } from './view.js';
import { SettingsController } from '../pages/settings/controller.js';

export function AppController(event) {
  this.event = event;
  this.view = new AppView();
  this.activeController = null;
  this.activeView = null;

  this.view.bindNav('settings', () => this.navigate('settings'));
  this.view.bindNav('event', () => this.navigate('event'));
}

AppController.prototype.navigate = function(key) {
  this.activeView = key;
  this.view.navigate(key);

  switch(key) {
    case 'settings':
      this.activeController = new SettingsController(this.event);
      break;
    case 'event':
      //this.activeController = new EventsController(this.event);
      break;
  }

  this.activeController.init();
}

AppController.prototype.init = function() {
  this.navigate('settings');
}

