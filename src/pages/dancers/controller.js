import { DancersView } from './view.js';

export function DancersController(event) {
  this.event = event;
  this.view = new DancersView();

  this.view.bindDancerTable('editDancer', (uuid) => this.updateDancerTable('editDancer', uuid));
  this.view.bindDancerTable('saveDancer', (data) => this.updateDancerTable('saveDancer', data));
}


DancersController.prototype.updateDancerTable = function(event, data) {
  switch(event) {
    case 'editDancer': 
      let editDancer = this.event.dancers.find(data);
      this.view.renderDancerTable('editDancer', editDancer);
      break;

    case 'saveDancer':
      let saveDancer = this.event.dancers.updateAll(data);
      this.view.renderDancerTable('saveDancer', saveDancer);
      break;
  }
}

DancersController.prototype.init = function() {
  this.event.dancers.dancers.forEach(dancer => this.view.renderDancerTable('newDancer', dancer));
}
