export function PrintableTemplates() {
  this.defaultHeatFormat
    =       '<td>{{heatNumber}}</td>'
    +       '<td>{{bibNumber}}</td>'
    +       '<td>{{leaderName}}</td>'
    +       '<td>{{followerName}}</td>'
    +       '<td>{{dance}}</td>'

  this.defaultHeatHeader
    =       '<tr>Heat #</tr>'
    +       '<tr>Bib</tr>'
    +       '<tr>Leader</tr>'
    +       '<tr>Follower</tr>'
    +       '<tr>Dance</tr>'

  this.defaultPageTitle
    =       '<div>{dancerName}/div>'
}

PrintableTemplates.prototype.generateHeatTitle = function(data) {
  let node = document.createElement('div');

  let view = this.defaultPageTitle;

  view = view.replace('{{dancername}}', data?.name);

  node.innerHTML = view;
  return node;
}

PrintableTemplates.prototype.generateHeatHeader = function(data) {
  let node = document.createElement('tr');

  node.innerHTML = this.defaultHeatHeader;
  return node;
}

PrintableTemplates.prototype.generateHeatRow = function(data) {
  let node = document.createElement('tr');

  let view = this.defaultHeatFormat;

  view = view.replace('{{heatNumber}}', data?.heatNumber);
  view = view.replace('{{bibNumber}}', data?.bibNumber);
  view = view.replace('{{leaderName}}', data?.leaderName);
  view = view.replace('{{followerName}}', data?.followerName);
  view = view.replace('{{dance}}', data?.dance);

  node.innerHTML = view;
  return node;
}
