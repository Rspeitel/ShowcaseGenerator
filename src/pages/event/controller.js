import { EventView } from './view.js';

export function EventController(event) {
  this.event = event;
  this.view = new EventView();


  // This is where you bind action to your view items
  // this.view.bind('item', () => this.updateThing('item'));
}

EventController.prototype.init = function() {
  this.event.dancers.dancers.forEach(dancer => this.view.renderDancerTable('newDancer', dancer));
}
