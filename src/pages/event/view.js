import { EventTemplates } from './template.js';

export function EventView() {
  this.template = new EventTemplates();
  
  this.dancerTable = document.getElementById('dancer-table');
  this.addDancerButton = document.getElementById('add-dancer-button');

}

EventView.prototype.bindDancerTable = function (event, handler) {

}

EventView.prototype.renderDancerTable = function (event, data) {
  switch(event) {
    case 'newDancer':
      this.dancerTable.insertBefore(this.template.generateDancerCard(data), this.addDancerButton);
      break;
  }
}
