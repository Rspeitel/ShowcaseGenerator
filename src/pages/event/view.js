import { EventTemplates } from './template.js';

export function EventView() {
  this.template = new EventTemplates();

  this.entriesTable = document.getElementById('entries-table-content');
}

EventView.prototype.bindEntriesTable = function (event, handler) {
  switch(event) {
  }
}

EventView.prototype.renderEntriesTable = function (event, data) {
  switch(event) {
    case 'newEntry':
      let newTemplate = this.template.generateEntryCard(data);
      this.entriesTable.appendChild(newTemplate);
      break;
  }

}
