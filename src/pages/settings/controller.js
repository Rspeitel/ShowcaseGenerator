import { SettingsView } from './view.js';
import { nullCheck } from '../../helpers.js';

export function SettingsController(event) {
  this.event = event;
  this.view = new SettingsView();

  this.currentHoverGroup = null;
  this.currentHoverItem = null;

  this.view.bindTable('add', () => this.updateTable('add'));
  this.view.bindTable('remove', (uuid) => this.updateTable('remove', uuid));
  this.view.bindTable('update', (data) => this.updateTable('update', data));
  this.view.bindGroup('addGroup', () => this.updateGroups('addGroup'));
  this.view.bindGroup('removeGroup', (uuid) => this.updateGroups('removeGroup', uuid));
  this.view.bindGroup('removeDance', (uuid) => this.updateGroups('removeDance', uuid));
  this.view.bindGroup('updateGroup', (data) => this.updateGroups('updateGroup', data));
  this.view.bindDrag('drag', (event, uuid) => this.updateDrag(event, uuid));
  this.view.bindSubmit('submit', (data) => this.submit(data));
}

SettingsController.prototype.initView = function () {
  this.event.dances.dances.forEach(dance => this.view.renderTable('newDance', dance));

  this.event.danceGroups.danceGroups.forEach(group => {
    this.view.renderGroup('addGroup', group);

    group.danceUUIDs.forEach(danceUUID => {
      let dance = this.event.dances.find(danceUUID);
      this.view.renderGroup('addDance', [dance, group.uuid, null]);
    })
  });
}

SettingsController.prototype.updateTable = function (event, data) {
  switch(event) {
    case 'update':
      let uuid = data[0];
      let event = data[1];
      let danceToUpdate = this.event.dances.update(uuid, event.srcElement.id, event.srcElement.value);

      if (event.srcElement.id === 'name') { this.view.renderGroup('updateDance', [uuid, danceToUpdate.name]) }
      break;
    case 'add':
      let danceToAdd = this.event.dances.create(data);
      this.view.renderTable('newDance', danceToAdd);
      break;
    case 'remove':
      this.event.dances.remove(data);
      this.removeDanceFromGroup(data);
      this.view.renderTable('removeDance', data);
      break;
  }
}

SettingsController.prototype.updateGroups = function (event, data) {
  switch(event) {
    case 'addGroup':
      let group = this.event.danceGroups.addGroup();
      this.view.renderGroup('addGroup', group);
      break;
    case 'updateGroup':
      let updateUUID = data[0];
      let value = data[1];
      this.event.danceGroups.updateGroup(updateUUID, value);
      break;
    case 'removeGroup':
      this.event.danceGroups.removeGroup(data);
      this.view.renderGroup('removeGroup', data);
      break;
    case 'removeDance':
      this.event.danceGroups.removeDance(data);
      this.view.renderGroup('removeDance', data);
      break;
    case 'addDance':
      let addUUID = data[0];
      let groupUUID = data[1];
      let referenceUUID = data[2];
      this.event.danceGroups.addDance(addUUID, groupUUID, referenceUUID);
      let dance = this.event.dances.find(addUUID);
      this.view.renderGroup('addDance', [dance, groupUUID, referenceUUID]);
      break;

  }
}

SettingsController.prototype.updateDrag = function (event, data) {
  switch(event) {
    case 'drop':
      if(nullCheck(this.currentHoverGroup)) {
        this.updateGroups('removeDance', data);
        this.updateGroups('addDance', [data, this.currentHoverGroup, this.currentHoverItem])
      }

      this.view.renderGroup('removeDanceCardHelper', null);
      this.currentHoverItem = null;
      this.currentHoverGroup = null;
      break;
    case 'dragItem':
      this.currentHoverItem = data;
      break;
    case 'dragGroup':
      this.currentHoverGroup = data;
      break;
  }
  if (nullCheck(this.currentHoverItem)) { this.view.renderGroup('addDanceHelper', [this.currentHoverGroup, this.currentHoverItem]) }
}

SettingsController.prototype.submit = function(data) {
  data[0].preventDefault();
  const reader = new FileReader();
   reader.onload = function (e) {
    const text = e.target.result;
    console.log(text);
  };

  reader.readAsText(data[1]);
  console.log(this.event.toJSON());
}
