var dances = ["Waltz", "Tango", "Foxtrot", "V Waltz"];

const sortableDances = document.getElementById("dance-group-one");
const items = sortableDances.querySelectorAll(".settings-dance-in-group");



for (dance in dances) {
  var currentlySelectedSpot = null;
  DanceItem("dance-group-one", dances[dance]);
}

function removeDanceItem(dance) {
  console.log(`${dance}`);
  var elementToDelete = document.getElementById(`${dance}-dance-in-group`);
  elementToDelete.remove();
}

function DanceItem(danceGroupId, danceName) {
  var danceGroup = document.getElementById(danceGroupId);

  var danceItem = document.createElement('div');
  danceItem.classList.add("settings-dance-in-group");
  danceItem.id = `${danceName}-dance-in-group`
  danceItem.draggable = true;
  danceItem.innerHTML = `
    <span class="settings-dance-in-group-title">
      <span class="material-symbols-outlined drag-indicator">drag_indicator</span>
      ${danceName}
    </span>
    <button class="material-symbols-outlined" onclick='removeDanceItem("${danceName}")'>close</button>
  `;

  danceItem.ondragover = e => {
    var currentHoveredItem = e.target.closest(".settings-dance-in-group");
    const midPoint = currentHoveredItem.getBoundingClientRect().y + (currentHoveredItem.getBoundingClientRect().height /2);
    var newlySelectedSpot = null
    if(e.y <= midPoint) {
      newlySelectedSpot = currentHoveredItem;
    } else {
      newlySelectedSpot = currentHoveredItem.nextSibling;
    }

    if(newlySelectedSpot !== currentlySelectedSpot) {
      document.getElementById('new-dance-dragged-position')?.remove();
      var newDragPlaceholder = document.createElement('div');
      newDragPlaceholder.id = 'new-dance-dragged-position';
      newDragPlaceholder.classList.add('settings-dance-in-group');

      danceGroup.insertBefore(newDragPlaceholder, newlySelectedSpot);

      currentlySelectedSpot = newlySelectedSpot;
    }
  }

  danceItem.ondragend = e => {
    danceGroup.insertBefore(e.target, currentlySelectedSpot);
    document.getElementById('new-dance-dragged-position')?.remove();
  };

  danceGroup.appendChild(danceItem);
}

