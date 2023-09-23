export function GenerateCritiqueCardsService(event, format = "") {
  this.event = event;
  this.format 
    = '<h1>The best showcase ever</h1>'
    + '<h4>{{dance}} {{heatNumber}}: ({{bibNumber}}){{leaderName}} and {{followerName}}</h4>'
    + '<div class="critiqueOptions">'
    + '  <span>Timing</span>'
    + '  <span>Frame</span>'
    + '  <span>Poise</span>' 
    + '  <span>Footwork</span>'
    + '</div>'
    + '<span>Notes: </span>'
    + ''
    + '';
}

GenerateCritiqueCardsService.prototype.generateAll = function () {
  let entries = sortEntriesByHeatOrder(this.event);

  let critiqueList = document.createElement('body');

  entries.forEach((entry, index) => {
    critiqueList.appendChild(generateForEntry(entry, this.event, this.format));
    if ((index + 1) % 3 === 0) { 
      let pagebreak = document.createElement('div');
      pagebreak.classList.add('pagebreak');
      critiqueList.appendChild(pagebreak); 
    }
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
  let dance = event.dances.find(entry.danceUUID);
  let heat = event.heats.find(entry.heatUUID);

  let content = document.createElement('div');
  content.classList.add('critiqueSheet');
  let view = format;

  view = view.replace('{{bibNumber}}', leader.bibNumber);
  view = view.replace('{{leaderName}}', leader.name);
  view = view.replace('{{followerName}}', follower.name);
  view = view.replace('{{dance}}', dance.name);
  view = view.replace('{{heatNumber}}', heat?.heatNumber);

  content.innerHTML = view;
  return content
  
}


