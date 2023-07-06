import { SettingsTemplates } from './template.js';
import { getUUIDFromHtmlId, addEventListener } from '../../helpers.js';

export function SettingsView() {
  this.template = new SettingsTemplates();

  this.danceTable = document.getElementById('dance-table');
  this.addDanceButton = document.getElementById('add-dance-button');
  this.danceGroups = document.getElementById('dance-groups');
  this.addDanceGroup = document.getElementById('add-dance-group');
  this.competitorList = document.getElementById('competitor-list');
  this.form = document.getElementById('complete-setup-form');

  this.handlerMethods = new Map();
}

SettingsView.prototype.bindTable = function (event, handler) {
  switch(event) {
    case 'add':
      addEventListener(this.addDanceButton, "click", () => handler());
      break;
    case 'remove':
      this.handlerMethods.set('remove-dance-from-table', handler);
      break;
    case 'update':
      this.handlerMethods.set('update-dance-from-table', handler);
      break;
    default:
      console.log("Something went wrong: Event " + event + " does not exist");
      break;
  }
}

SettingsView.prototype.bindGroup = function (event, handler) {
  switch(event) {
    case 'addGroup':
      addEventListener(this.addDanceGroup, "click", () => handler());
      break;
    case 'updateGroup':
      this.handlerMethods.set('update-group', handler);
      break;
    case 'removeGroup':
      this.handlerMethods.set('remove-group', handler);
      break;

    case 'removeDance':
      this.handlerMethods.set('remove-dance-from-group', handler);
      break;
  }
}

SettingsView.prototype.bindSubmit = function(event, handler) {
  switch(event) {
    case 'submit':
      addEventListener(this.form, "submit", (e) => handler([e, this.competitorList.files[0]]));
      break;
  }
}

SettingsView.prototype.renderTable = function (event, data) {
  switch(event) {
    case 'newDance':
      this.danceTable.insertBefore(this.template.generateDanceCard(
        data,
        (e) => { this.handlerMethods.get('update-dance-from-table')([data.uuid, e]) },
        (e) => { this.handlerMethods.get('remove-dance-from-table')(data.uuid) }
      ), this.addDanceButton);
      break;
    case 'removeDance':
      this.danceTable.querySelector("#dance-" + data)?.remove();
      break;

  }
}

SettingsView.prototype.renderGroup = function (event, data) {
  switch(event) {
    case 'addGroup':
      this.danceGroups.insertBefore(
        this.template.generateDanceGroup(
          data,
          (e) => { this.handlerMethods.get('update-group')([data, e]) },
          (e) => { this.handlerMethods.get('remove-group')(e) },
        ),
        this.addDanceGroup
      );
      break;
    case 'updateDance':
      let updateUUID = data[0];
      let name = data[1];
      let htmlToUpdate = this.danceGroups.querySelector('#dance-group-item-' + updateUUID)
                                         .querySelector('.title');
      htmlToUpdate.innerHTML = name;
      break;
    case 'removeGroup':
      this.danceGroups.querySelector("#dance-group-" + data)?.remove();
      break;
    case 'removeDance':
      this.danceGroups.querySelector("#dance-group-item-" + data)?.remove();
      break;
    case 'addDance':
      let dance = data[0];
      let groupUUID = data[1];
      let referenceUUID = data[2];
      this.danceGroups
        .querySelector("#dance-group-" + groupUUID)
        .insertBefore(
          this.template.generateDanceGroupItem(
            dance.uuid,
            dance.name,
            () => { this.handlerMethods.get('remove-dance-from-group')(dance.uuid) }
          ),
          this.danceGroups.querySelector('#dance-group-item-' + referenceUUID)?.parentElement,
         );
      break;
    case 'addDanceHelper':
      let addDanceGroupUUID = data[0];
      let addDanceReferenceUUID = data[1];
      this.danceGroups.querySelector('#new-dance-dragged-helper')?.remove();

      this.danceGroups.querySelector('#dance-group-' + addDanceGroupUUID)
        .insertBefore(
          this.template.generateDanceCardHelper(),
          this.danceGroups.querySelector('#dance-group-item-' + addDanceReferenceUUID).parentElement
         );
      break;
    case 'removeDanceCardHelper':
      this.danceGroups.querySelector('#new-dance-dragged-helper')?.remove();
      break;
  }
}

SettingsView.prototype.bindDrag = function(event, handler) {
  switch(event) {
    case 'drag':
      addEventListener(this.danceTable, "dragend", (e) => {
        let uuid = e.target.closest(".dance-card").id.replace('dance-', '');
        handler('drop', uuid);
      })
      addEventListener(this.danceGroups, "dragend", (e) => {
        let uuid = e.target.closest(".dance-group-item").id.replace("dance-group-item-", '')
        handler('drop', uuid);
      });
      this.danceGroups.addEventListener("dragover", (e) => {
        let uuid = e.target.closest(".dance-group-card")?.id.replace('dance-group-', '');
        let item = e.target.closest(".dance-group-item");
        let itemUUID = null;

        if (item !== null) {
          this.danceGroups.querySelector('#new-dance-dragged-helper')?.remove();
          const midpoint = item.getBoundingClientRect().y + (item.getBoundingClientRect().height/2);
          if(e.y <= midpoint) {
            itemUUID = item.id.replace('dance-group-item-', '');
          } else {
            let tempItem = item.parentElement?.nextSibling?.firstChild;
            if (tempItem?.id === 'new-dance-dragged-helper') {
              itemUUID = tempItem?.parentElement?.nextSibling?.firstChild?.id.replace('dance-group-item-', '');
            } else {
              itemUUID = tempItem?.id?.replace('dance-group-item-', '');
            }
          }
        }
        handler('dragGroup', uuid);
        handler('dragItem', itemUUID)
      });
    break;
  }
}

