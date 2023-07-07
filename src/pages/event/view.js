import { EventTemplates } from './template.js';

export function EventView() {
  this.template = new EventTemplates();
  
  this.dancerTable = document.getElementById('dancer-table');
  this.addDancerButton = document.getElementById('add-dancer-button');

}

EventView.prototype.bind = function (event, handler) {

}

EventView.prototype.render = function (event, data) {
}
