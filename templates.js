(function (window) {

  function SettingsTemplate() {
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
      +       '<input type="text" class="dance-group-title" placeholder="Dance Group">'
      +       '<button class="close-button close-button-dance-group material-symbols-outlined">close</button>'
      +     '</div>'


    this.danceGroupItem
      =     '<div id="dance-group-item-{{uuid}}" draggable=true class="dance-group-item">'
      +       '<span class="dance-group-item-title">'
      +         '<span class="drag-indicator material-symbols-outlined">drag_indicator</span>'
      +         '{{dance}}'
      +       '</span>'
      +       '<button class="close-button close-button-group-item material-symbols-outlined">close</button>'
      +     '</div>'
  }

  SettingsTemplate.prototype.generateDanceCard = function(dance) {
    var view = this.danceCardTemplate;

    view = view.replace('{{uuid}}', dance.uuid);
    view = view.replace('{{danceName}}', dance.name);
    view = view.replace('{{danceMax}}', dance.danceMax);
    view = view.replace('{{dancerMax}}', dance.dancerMax);

    return view;
  }
  SettingsTemplate.prototype.generateDanceGroup = function(uuid) {
    let view = this.danceGroupTemplate;

    view = view.replace('{{uuid}}', uuid);

    return view;
  }
  SettingsTemplate.prototype.generateDanceGroupItem = function(uuid, danceName) {
    var view = this.danceGroupItem;

    view = view.replace('{{uuid}}', uuid);
    view = view.replace('{{dance}}', danceName);

    return view;
  }

  window.app = window.app || {}
  window.app.SettingsTemplate = SettingsTemplate;

})(window);
