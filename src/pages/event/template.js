export function EventTemplates() {
  this.firstEventTemplate
     = '<div>'
     + '</div>';
}

EventTemplates.prototype.generateTest = function() {
  var node = document.createElement('div');
  node.innerHTML = this.firstEventTemplate;

  return node
}
