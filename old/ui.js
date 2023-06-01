openTab(null, "settings");

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function dancerSelectActive() {
  document.getElementById("dancer-list").style.display = 'block';
}

function dancerSelectInactive() {
  document.getElementById("dancer-list").style.display = 'none';
}

function selectDancer(dancerId) {
  dancerSelectInactive();
  var dancer = GLOBAL_EventDanceCard.dancers.get(parseInt(dancerId));
  document.getElementById("dancer-search-field").value = `${dancer.id}: ${dancer.name}`;
  dancer.populateDancerProfile();
}
