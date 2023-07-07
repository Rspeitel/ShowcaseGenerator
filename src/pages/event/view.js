import { EventTemplates } from './template.js';

export function EventView() {
  this.template = new EventTemplates();
  
  // This is where you define all the html nodes you will be working with
  // this.body = document.getElementById('**insert id here**');
}

EventView.prototype.bind = function (event, handler) {

}

EventView.prototype.render = function () {

}
