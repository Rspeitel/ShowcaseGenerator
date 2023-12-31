import { DancersView } from './view.js';

export function DancersController(event) {
  this.event = event;
  this.view = new DancersView();

  this.view.bindDancerTable('editDancer', (uuid) => this.updateDancerTable('editDancer', uuid));
  this.view.bindDancerTable('saveDancer', (data) => this.updateDancerTable('saveDancer', data));
  this.view.bindDancerTable('confirmModal', (data) => this.updateDancerTable('confirmModal', data));
  this.view.bindDancerTable('confirmDelete', (uuid) => this.updateDancerTable('confirmDelete', uuid));
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

    case 'confirmModal':
      let deleteDancer = this.event.dancers.find(data);
      this.view.renderDancerTable('confirmModal', deleteDancer);
      break;

    case 'confirmDelete':
      this.event.deleteDancer(data);
      this.view.renderDancerTable('deleteDancer', data);
      break;
  }
}

DancersController.prototype.init = function() {
  this.event.dancers.elements.forEach(dancer => this.view.renderDancerTable('newDancer', dancer));
}
