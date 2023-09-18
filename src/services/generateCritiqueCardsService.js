export function GenerateCritiqueCardsService(event, format = "") {
  this.event = event;
  this.format 
    = '<div> Critque information </div>'
    + ''
    + ''
    + ''
    + ''
    + '';
}

GenerateCritiqueCardsService.prototype.generateAll = function () {
  let entries = sortEntriesByHeatOrder(this.event);

  let critiqueList = document.createElement('body');
  let pagebreak = document.createElement('div');
  pagebreak.classList.add('pagebreak');

  entries.forEach((entry, index) => {
    critiqueList.appendChild(generateForEntry(entry, this.event, this.format));
    if (index % 3 === 0 && index != 0) { critiqueList.appendChild(pagebreak)}
  });

  return critiqueList;
  
}

/* PRIVATE */
function sortEntriesByHeatOrder (event) {
  //TODO: Sort entries by the heat order

  return event.entries.elements
}

function generateForEntry(entry, event, format) {
  let leader = event.dancers.find(entry.leaderUUID);
  let follower = event.dancers.find(entry.followerUUID);
  let dance = event.dancers.find(entry.danceUUID);

  let content = document.createElement('div');
  content.classList.add('critiqueSheet');
  let view = format;

  view = view.replace('{{bibNumber}}', entry.bibNumber);
  view = view.replace('{{leaderName}}', entry.leaderName);
  view = view.replace('{{followerName}}', entry.followerName);
  view = view.replace('{{dance}}', entry.dance);
  view = view.replace('{{heatNumber}}', entry.heatNumber);

  content.innerHTML = view;
  return content
  
}


