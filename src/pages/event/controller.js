import { EventView } from './view.js';

export function EventController() {
  this.view = new EventView();


  // This is where you bind action to your view items
  // this.view.bind('item', () => this.updateThing('item'));
}


// All Controllers have an init function
EventController.prototype.init = function() {
  
}
