import { DancersTemplates } from './template.js';

export function DancersView() {
  this.template = new DancersTemplates();
  
  this.dancerTable = document.getElementById('dancer-table');
  this.addDancerButton = document.getElementById('add-dancer-button');

  this.handlerMethods = new Map();
}

DancersView.prototype.bindDancerTable = function (event, handler) {
  switch(event) {
    case 'editDancer':
      this.handlerMethods.set('edit-dancer-from-table', handler);
      break;

    case 'saveDancer':
      this.handlerMethods.set('save-dancer-from-table', handler);
      break;
  }
}

DancersView.prototype.renderDancerTable = function (event, data) {
  switch(event) {
    case 'newDancer':
      let newTemplate = this.template.generateDancerCard(
        data,
        this.handlerMethods.get('edit-dancer-from-table'),
        null
      );
      this.dancerTable.appendChild(newTemplate);
      break;

    case 'editDancer':
      let editTarget = this.dancerTable.querySelector('#dancer-' + data.uuid);
      let editTemplate = this.template.generateDancerEdit(
        data,
        this.handlerMethods.get('save-dancer-from-table')
      );
      this.dancerTable.insertBefore(editTemplate, editTarget);
      this.dancerTable.removeChild(editTarget);
      break;

    case 'saveDancer': 
      let saveTarget = this.dancerTable.querySelector('#dancer-' + data.uuid);
      debugger;
      let saveTemplate = this.template.generateDancerCard(
        data,
        this.handlerMethods.get('edit-dancer-from-table'),
        null,
      );
      this.dancerTable.insertBefore(saveTemplate, saveTarget);
      this.dancerTable.removeChild(saveTarget);
      break;
  }
}
