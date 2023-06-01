(function (window) {

  function SettingsView(template) {
    this.template = template;

    this.danceTable = document.getElementById('dance-table');
    this.addDanceButton = document.getElementById('add-dance-button');
    this.danceGroups = document.getElementById('dance-groups');
    this.addDanceGroup = document.getElementById('add-dance-group');
  }

  SettingsView.prototype.init = function(event) {
    event.dances.forEach(dance => this.addDance(dance));
    event.danceGroups.forEach((group, key) => this.addGroup(key));
  }

  SettingsView.prototype.addDance = function(dance) {
    let newDance = document.createElement('div');
    newDance.innerHTML = this.template.generateDanceCard(dance);
    this.danceTable.insertBefore(newDance, this.addDanceButton);
  }

  SettingsView.prototype.addGroup = function(uuid) {
    let newDanceGroup = document.createElement('div');
    newDanceGroup.innerHTML = this.template.generateDanceGroup(uuid);
    this.danceGroups.insertBefore(newDanceGroup, this.addDanceGroup);
  }

  SettingsView.prototype.addDanceToGroup = function(dance, groupUUID) {
    let newDanceGroupItem = document.createElement('div');
    newDanceGroupItem.innerHTML = this.template.generateDanceGroupItem(dance.uuid, dance.name);
    this.danceGroups.querySelector(`#dance-group-${groupUUID}`).appendChild(newDanceGroupItem);
  }

  SettingsView.prototype.removeGroup = function(uuid) {
    this.danceGroups.querySelector("#dance-group-" + uuid).remove();
  }

  SettingsView.prototype.removeDance = function(uuid) {
    this.danceTable.querySelector("#dance-" + uuid).remove();
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
      this.danceGroups.addEventListener("ondragover", (e) => {
        debugger;
        handler(uuid);
      });
    }
  }

  window.app = window.app || {}
  window.app.SettingsView = SettingsView;

})(window);
