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
    +  '    <div class="dance-card card-header">'
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
    +  ' <button id="export-json"> Export JSON </button>'
    +  '</div>'
    +  '</main>';

  this.eventTemplate
    = '<main class="main-content" id="main-content">'
    +  '<h3>Event</h3>'
    +  '<hr>'
    +  '<h3>Entries</h3>'
    +  '  <div class="entries-table">'
    +  '    <div class="entry-card card-header">'
    +  '      <div>Heat #</div>'
    +  '      <div>Bib</div>'
    +  '      <div class="entries-name">Leader</div>'
    +  '      <div class="entries-name">Follower</div>'
    +  '      <div class="entries-name">Dance</div>'
    +  '    </div>'
    +  '    <div id="entries-table" class="entries-table">'
    +  '    </div>'
    +  '  </div>'
    + '</main>';

  this.dancersTemplate
    = '<main class="main-content" id="main-content">'
    +  '<h3>Dancers</h3>'
    +  '<button id="add-dancer-button" class="add-dancer"><span class="material-symbols-outlined">add</span>Add Dancer</button>'
    +  '<hr>'
    +  '  <div class="dancer-table">'
    +  '    <div class="dancer-card card-header">'
    +  '      <div>Bib</div>'
    +  '      <div class="dancer-name">Name</div>'
    +  '      <div></div>'
    +  '      <div></div>'
    +  '      <div></div>'
    +  '    </div>'
    +  '    <div id="dancer-table" class="dancer-card-table-content">'
    +  '    </div>'
    +  '  </div>'
    + '</main>'
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

AppTemplates.prototype.generateDancers = function() {
  var node = document.createElement('div');
  node.innerHTML= this.dancersTemplate;

  return node;
}
