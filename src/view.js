import { AppTemplates } from './template.js';
import { addEventListener, removeAllChildren } from './helpers.js';

export function AppView() {
  this.template = new AppTemplates();
  
  this.body = document.getElementById('application-body');
  this.settingsNav = document.getElementById('nav-settings');
  this.eventNav = document.getElementById('nav-event');
  this.dancersNav = document.getElementById('nav-dancers');
}

AppView.prototype.bindNav = function (event, handler) {
  switch(event) {
    case 'settings':
      addEventListener(this.settingsNav, "click", () => {
        this.removeActive();
        this.settingsNav.classList.add('nav-active');
        handler();
      })
      break;

    case 'event':
      addEventListener(this.eventNav, "click", () => {
        this.removeActive();
        this.eventNav.classList.add('nav-active');
        handler();
      })
      break;
  }
}

AppView.prototype.removeActive = function (active) {
  this.settingsNav.classList.remove('nav-active');
  this.eventNav.classList.remove('nav-active');
  this.dancersNav.classList.remove('nav-active');
}

AppView.prototype.navigate = function (location) {
  let template = null;
  switch(location) {
    case 'settings':
      template = this.template.generateSettings();
      break;

    case 'event': 
      template = this.template.generateEvent();
      break;

    case 'dancers':

      break;
  }
  removeAllChildren(this.body);
  this.body.appendChild(template);
}
