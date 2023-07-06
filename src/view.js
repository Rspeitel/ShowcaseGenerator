import { AppTemplates } from './template.js';

export function AppView() {
  this.template = new AppTemplates();
  
  this.body = document.getElementById('application-body');
}

AppView.prototype.renderSettings = function () {
  this.body.appendChild(this.template.generateSettings());
};


