export function EventTemplates() {
  this.entryCardTemplate
    =       '<div>{{heatNumber}}</div>'
    +       '<div>{{bibNumber}}</div>'
    +       '<div>{{leaderName}}</div>'
    +       '<div>{{followerName}}</div>'
    +       '<div>{{dance}}</div>'
    +       '<button class="edit-button icon-button material-symbols-outlined">edit</button>'
    +       '<button class="delete-button icon-button material-symbols-outlined">delete</button>'
}


EventTemplates.prototype.generateEntryCard = function(entry) {
  let node = document.createElement('div');
  node.classList.add('entry-card');
  node.id = "entry-" + entry.uuid;

  let view = this.entryCardTemplate;

  view = view.replace('{{bibNumber}}', entry.bibNumber);
  view = view.replace('{{leaderName}}', entry.leaderName);
  view = view.replace('{{followerName}}', entry.followerName);
  view = view.replace('{{dance}}', entry.dance);
  view = view.replace('{{heatNumber}}', entry.heatNumber);

  node.innerHTML = view;

  return node

}
