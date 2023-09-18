import { PrintView } from './view.js';
import { GenerateHeatSheetService } from '../../services/generateHeatSheetService.js';

export function PrintController(event) {
  this.view = new PrintView();
  this.event = event;


  // This is where you bind action to your view items
  // this.view.bind('item', () => this.updateThing('item'));
  this.view.bind('print', () => this.print());
}


PrintController.prototype.print = function() {
  var printWindow = window.open('', '', 'height=400,width=800');
  printWindow.document.write('<html><head></head>');
  printWindow.document.write('<style> @media print {.pagebreak {page-break-before:always}} </style>');
  printWindow.document.write('<body >');
  printWindow.document.write(new GenerateHeatSheetService(this.event).generate());
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}

// All Controllers have an init function
PrintController.prototype.init = function() {
  
}
