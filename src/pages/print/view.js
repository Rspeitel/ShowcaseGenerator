import { PrintTemplates } from './template.js';
import { addEventListener } from '../../helpers.js';

export function PrintView() {
  this.template = new PrintTemplates();
  

  this.printButton = document.getElementById('print-button');
  this.printSelect = document.getElementById('printables');
  // This is where you define all the html nodes you will be working with
  // this.body = document.getElementById('**insert id here**');
}

PrintView.prototype.bind = function (event, handler) {
  switch(event) {
    case 'print': 
      addEventListener(this.printButton, "click", () => handler());
      break;

    case 'selectedPrint':
      addEventListener(this.printSelect, "change", (e) => handler(e.target.value));
      break;
  }
}

PrintView.prototype.render = function () {

}
