import { PrintableTemplates } from '../pages/print/printableTemplates.js';

export function GenerateHeatSheetService(event) {
  this.event = event;
  this.template = new PrintableTemplates();
}

GenerateHeatSheetService.prototype.generateAll = function() {

  let dancersEntries = this.organizeEntriesByDancer(this.event);
  let base = document.createElement('div');

  dancersEntries.forEach((entries, dancer) => {
    base.append(this.generateForDancer(dancer, entries));
  });

  return base;
}

GenerateHeatSheetService.prototype.generateContentForDancer = function(dancer, entries) {
  let heatSheet = document.createElement('main');
  let table = document.createElement('table');
  
  heatSheet.appendChild(this.template.generateHeatTitle({name: dancer.name}));
  heatSheet.appendChild(this.template.generateHeatHeader());

  entries.forEach((entry) => { 
    let leader = this.event.dancers.find(entry?.leaderUUID);
    let follower = this.event.dancers.find(entry?.followerUUID);
    let dance = this.event.dances.find(entry?.danceUUID);

    let node = this.template.generateHeatRow({
      heatNumber: entry?.heatNumber,
      bibNumber: leader?.bibNumber,
      leaderName: leader?.name,
      followerName: follower?.name,
      dance: dance?.name,
    });

    table.appendChild(node);
  });

  let pageBreak = document.createElement('div')
  pageBreak.classList.add("pagebreak");
  heatSheet.appendChild(table);
  heatSheet.appendChild(pageBreak);

  return heatSheet;
}

GenerateHeatSheetService.prototype.organizeEntriesByDancer = function() {
  let dancersEntries = new Map();

  this.event.dancers.elements.forEach((dancer) => {
    let leadEntries = this.event.entries.filter('leaderUUID', dancer.uuid);
    let followerEntries = this.event.entries.filter('followerUUID', dancer.uuid);
    dancersEntries.set(dancer, [leadEntries, followerEntries].flat());
  });

  return dancersEntries;
}
