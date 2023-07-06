export function SettingsTemplates() {
  this.danceCardTemplate
    =     '<div id="dance-{{uuid}}" draggable=true class="dance-card">'
    +       '<button class="close-button material-symbols-outlined">close</button>'
    +       '<span class="drag-indicator material-symbols-outlined">drag_indicator</span>'
    +       '<input id="name" type="text" placeholder="dance" value="{{danceName}}">'
    +       '<input id="dance-max" type="number" placeholder=0 value={{danceMax}}>'
    +       '<input id="dancer-max" type="number" placeholder=0 value={{dancerMax}}>'
    +     '</div>';

  this.danceGroupTemplate
    =     '<div id="dance-group-{{uuid}}" class="dance-group-card">'
    +       '<input type="text" class="dance-group-title" placeholder="Dance Group" value={{name}}>'
    +       '<button class="close-button close-button-dance-group material-symbols-outlined">close</button>'
    +     '</div>';


  this.danceGroupItem
    =     '<div id="dance-group-item-{{uuid}}" draggable=true class="dance-group-item">'
    +       '<span class="dance-group-item-title">'
    +         '<span class="drag-indicator material-symbols-outlined">drag_indicator</span>'
    +         '<span class="title">{{dance}}</span>'
    +       '</span>'
    +       '<button class="close-button close-button-group-item material-symbols-outlined">close</button>'
    +     '</div>';

  this.danceGroupItemHelper
    =     '<div id="new-dance-dragged-helper" class="dance-group-item-helper"></div>';
}

SettingsTemplates.prototype.generateDanceCardHelper = function() {
  var node = document.createElement('div');
  node.innerHTML = this.danceGroupItemHelper;

  return node;
}

SettingsTemplates.prototype.generateDanceCard = function(dance, onChange, onClose) {
  let node = document.createElement('div');
  let view = this.danceCardTemplate;

  view = view.replace('{{uuid}}', dance.uuid);
  view = view.replace('{{danceName}}', dance.name);
  view = view.replace('{{danceMax}}', dance.danceMax);
  view = view.replace('{{dancerMax}}', dance.dancerMax);

  node.innerHTML = view;
  node.oninput = e => onChange(e);
  node.querySelector('.close-button').onclick = (e) => onClose(dance.uuid);

  return node;
}

SettingsTemplates.prototype.generateDanceGroup = function(group, onChange, onClose) {
  let node = document.createElement('div');
  let view = this.danceGroupTemplate;

  view = view.replace('{{uuid}}', group.uuid);
  view = view.replace('{{name}}', group.name);

  node.innerHTML = view;
  node.querySelector('.dance-group-title').oninput = e => onChange(e.target.value);

  node.querySelector('.close-button').onclick = (e) => onClose(group.uuid);

  return node;
}

SettingsTemplates.prototype.generateDanceGroupItem = function(uuid, danceName, onClose) {
  let node = document.createElement('div');
  var view = this.danceGroupItem;

  view = view.replace('{{uuid}}', uuid);
  view = view.replace('{{dance}}', danceName);

  node.innerHTML = view;
  node.querySelector('.close-button').onclick = (e) => onClose(uuid);

  return node;
}
