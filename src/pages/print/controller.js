import { PrintView } from './view.js';
import { GenerateHeatSheetService } from '../../services/generateHeatSheetService.js';
import { GenerateCritiqueCardsService } from '../../services/generateCritiqueCardsService.js';

export function PrintController(event) {
  this.view = new PrintView();
  this.event = event;

  this.selectedPrint = "heat";

  // This is where you bind action to your view items
  // this.view.bind('item', () => this.updateThing('item'));
  this.view.bind('print', () => this.print());
  this.view.bind('selectedPrint', (value) => this.selectedPrint = value);
}


PrintController.prototype.print = function() {
  if(this.selectedPrint === "heat") {
    createNewPrintableDocument(new GenerateHeatSheetService(this.event).generateAll());
  } else if(this.selectedPrint === "critique") {
    createNewPrintableDocument(new GenerateCritiqueCardsService(this.event).generateAll());
  } else if(this.selectedPrint === "event") {

  } else {

  }

}

// All Controllers have an init function
PrintController.prototype.init = function() {
  
}

function createNewPrintableDocument(content) {
  let printWindow = window.open('', '', 'height=400,width=800');
  
  let finalProduct = document.createElement('html');
  let style = document.createElement('style');

  style.innerHTML 
    = ".critiqueSheet {"
    + "  height: 30%;"
    + "  page-break-inside: avoid;"
    + "} "
    + ".critiqueOptions {"
    + "  display: flex;"
    + "  justify-content: space-between;"
    + "  margin: 0 40px;"
    + "} "
    + "@media print {"
    + " .pagebreak {"
    + "   page-break-before:always;"
    + " }"
    + "}";

  finalProduct.appendChild(style);
  finalProduct.appendChild(content);

  printWindow.document.write(finalProduct.outerHTML);

  printWindow.document.close();
  printWindow.print();
}
