export function EventTemplates() {
  this.dancerCardTemplate
    =     '<div id="dancer-{{uuid}}" class="dancer-card">'
    +       '<div>{{name}}</div>'
    +       '<button class="close-button material-symbols-outlined">close</button>'
    +     '</div>';
}

EventTemplates.prototype.generateDancerCard = function(dancer) {
  let node = document.createElement('div');
  let view = this.dancerCardTemplate;

  view = view.replace('{{uuid}}', dancer.uuid);
  view = view.replace('{{name}}', dancer.name);

  node.innerHTML = view;
  return node
}
