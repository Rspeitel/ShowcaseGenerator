import { AppView } from './view.js';
import { SettingsController } from './pages/settings/controller.js';

export function AppController(event) {
  this.event = event;
  this.view = new AppView();
  this.activeController = null;
}

AppController.prototype.init = function() {
  this.view.renderSettings();
  this.activeController = new SettingsController(this.event);
  this.activeController.init();
}
