export function SettingsView(template) {
  this.template = template;

  this.danceTable = document.getElementById('dance-table');
  this.addDanceButton = document.getElementById('add-dance-button');
  this.danceGroups = document.getElementById('dance-groups');
  this.addDanceGroup = document.getElementById('add-dance-group');
  this.submit = document.getElementById('complete-setup');
}

SettingsView.prototype.addDance = function(dance, update) {
  let newDance = document.createElement('div');
  newDance.innerHTML = this.template.generateDanceCard(dance);
  newDance.oninput = e => { update(e) };
  this.danceTable.insertBefore(newDance, this.addDanceButton);
}

SettingsView.prototype.addGroup = function(uuid) {
  let newDanceGroup = document.createElement('div');
  newDanceGroup.innerHTML = this.template.generateDanceGroup(uuid);
  this.danceGroups.insertBefore(newDanceGroup, this.addDanceGroup);
}

SettingsView.prototype.addDanceToGroup = function(dance, groupUUID, beforeDanceUUID) {
  let newDanceGroupItem = document.createElement('div');
  newDanceGroupItem.innerHTML = this.template.generateDanceGroupItem(dance.uuid, dance.name);
  let beforeDance = this.danceGroups.querySelector(`#dance-group-item-${beforeDanceUUID}`)?.parentElement;
  this.danceGroups.querySelector(`#dance-group-${groupUUID}`).insertBefore(newDanceGroupItem, beforeDance);
}

SettingsView.prototype.removeGroup = function(uuid) {
  this.danceGroups.querySelector("#dance-group-" + uuid)?.remove();
}

SettingsView.prototype.removeDance = function(uuid) {
  this.danceTable.querySelector("#dance-" + uuid)?.remove();
}

SettingsView.prototype.addDanceGroupHelper = function (groupUUID, beforeDanceUUID) {
  this.danceGroups.querySelector('#new-dance-dragged-helper')?.remove();
  var newDragPlaceholder = document.createElement('div');
  newDragPlaceholder.id = 'new-dance-dragged-helper';
  newDragPlaceholder.classList.add('dance-group-item-helper');
  let beforeDance = this.danceGroups.querySelector(`#dance-group-item-${beforeDanceUUID}`)?.parentElement;
  this.danceGroups.querySelector(`#dance-group-${groupUUID}`).insertBefore(newDragPlaceholder, beforeDance);
}

SettingsView.prototype.updateDance = function (uuid, dance) {
  let toUpdateHtml = this.danceGroups.querySelector(`#dance-group-item-${uuid}`)?.parentElement;

  if (toUpdateHtml !== undefined && toUpdateHtml !== null) {
    toUpdateHtml.innerHTML = this.template.generateDanceGroupItem(dance.uuid, dance.name);
  }
}


SettingsView.prototype.bind = function(event, handler) {
  if (event === 'addDance') {
    this.addDanceButton.addEventListener("click", () => {
      handler();
    });
  } else if(event === 'addGroup') {
    this.addDanceGroup.addEventListener("click", () => {
      handler();
    });
  } else if(event === 'removeDance') {
    this.danceTable.addEventListener("click", (e) => {
      if(e.target.classList.contains('close-button')) {
        let uuid = e.target.parentElement.id.replace('dance-', '');
        handler(uuid);
      }
    });
  } else if(event === 'removeGroup') {
    this.danceGroups.addEventListener("click", (e) => {
      if(e.target.classList.contains('close-button-dance-group')) {
        let uuid = e.target.parentElement.id.replace('dance-group-', '');
        handler(uuid);
      }
    });
  } else if(event === 'removeDanceFromGroup') {
    this.danceGroups.addEventListener("click", (e) => {
      if(e.target.classList.contains('close-button-group-item')) {
        let uuid = e.target.parentElement.id.replace('dance-group-item-', '');
        handler(uuid);
      }
    });
  } else if(event === 'dragDance') {
    this.danceTable.addEventListener("dragend", (e) => {
      let uuid = e.target.closest(".dance-card").id.replace('dance-', '');
      this.danceGroups.querySelector('#new-dance-dragged-helper')?.remove();
      handler('drop', uuid);
    });
    this.danceGroups.addEventListener("dragend", (e) => {
      let uuid = e.target.closest(".dance-group-item").id.replace("dance-group-item-", '')
      this.danceGroups.querySelector('#new-dance-dragged-helper')?.remove();
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
          itemUUID = item.parentElement?.nextSibling?.firstChild?.id.replace('dance-group-item-', '');
        }
      }

      handler('dragGroup', uuid);
      handler('dragItem', itemUUID)
    });
  } else if(event === 'submit') {
    this.submit.addEventListener("click", () => {
      handler();
    })
  }
}

