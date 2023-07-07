export function AppTemplates() {
  this.settingsTemplate
    =  '<main class="main-content" id="main-content">'
    +  '<h3>General Event Info</h3>'
    +  '<hr>'
    +  '<label>Event Name: </label><input type="text"/>'
    +  '<h3>Dances</h3>'
    +  '<hr>'
    +  '<div class="settings-dances">'
    +  '  <div class="dance-table">'
    +  '    <div class="dance-card dance-card-header">'
    +  '      <div></div>'
    +  '      <div></div>'
    +  '      <div>Dance</div>'
    +  '      <div>Max On Floor</div>'
    +  '      <div>Max Per Dancer</div>'
    +  '    </div>'
    +  '    <div id="dance-table" class="dance-card-table-content">'
    +  '      <button id="add-dance-button" class="add-dance"><span class="material-symbols-outlined">add</span>Add Dance</button>'
    +  '    </div>'
    +  '  </div>'
    +  '  <div id="dance-groups" class="dance-groups">'
    +  '    <button id="add-dance-group" class="add-dance-group"><span class="material-symbols-outlined">add</span>Add Group</button>'
    +  '  </div>'
    +  '</div>'
    +  '<h3>Couples</h3>'
    +  '<hr>'
    +  '<div class="settings-couples">'
    +  '  <form id="complete-setup-form">'
    +  '  <div>Competitor List</div>'
    +  '    <input type="file" id="competitor-list" name="compeitor-list" accept=".csv">'
    +  '    <input type="submit" id="complete-setup" />'
    +  '  </form>'
    +  '</div>'
    +  '</main>';

  this.eventTemplate
    = '<main class="main-content" id="main-content">'
    +  '<h3>Event Page</h3>'
    +  '<hr>'
    + '</main>';
}

AppTemplates.prototype.generateSettings = function() {
  var node = document.createElement('div');
  node.innerHTML= this.settingsTemplate;

  return node;
}

AppTemplates.prototype.generateEvent = function() {
  var node = document.createElement('div');
  node.innerHTML= this.eventTemplate;

  return node;
}
