import { **Template**View } from './view.js';

export function **Template**Controller() {
  this.view = new **Template**View();


  // This is where you bind action to your view items
  // this.view.bind('item', () => this.updateThing('item'));
}


// All Controllers have an init function
**Template**Controller.prototype.init = function() {
  
}
