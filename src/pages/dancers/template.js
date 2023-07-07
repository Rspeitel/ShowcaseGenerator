export function DancersTemplates() {
  this.dancerCardTemplate
    =       '<div>{{bibNumber}}</div>'
    +       '<div class="dancer-name">{{name}}</div>'
    +       '<div></div>'
    +       '<button class="edit-button icon-button material-symbols-outlined">edit</button>'
    +       '<button class="delete-button icon-button material-symbols-outlined">delete</button>'

  this.editDancerCardTemplate
    =       '<input type="text" class="dancer-bib" value="{{bibNumber}}">'
    +       '<input type="text" class="dancer-name" value="{{name}}"/>'
    +       '<div></div>'
    +       '<div></div>'
    +       '<button class="save-button icon-button material-symbols-outlined">save</button>';

  this.confirmDeleteModalTemplate
    =       '<div id="confirm-delete-{{uuid}}">'
    +       '<div>Deleting {{name}} will also remove all entries they are apart of.</div>'
    +       '<div>Are you sure you want to continue?</div>'
    +       '<div class=confirm-modal-button-wrapper>'
    +         '<button class="button" id="cancel-delete">Cancel</button>'
    +         '<button class="button confirm-delete" id="confirm-delete">Confirm</button>'
    +       '</div>';
}

DancersTemplates.prototype.generateConfirmDeleteModal = function(dancer, confirmHandler) {
  let node = document.getElementById('modal');

  let view = this.confirmDeleteModalTemplate;
  view = view.replace('{{uuid}}', dancer.uuid);
  view = view.replace('{{name}}', dancer.name);



  node.innerHTML = view;
  node.querySelector('#confirm-delete').onclick = (e) => confirmHandler(dancer.uuid);
  node.querySelector('#cancel-delete').onclick = (e) => node.close();

  return node;
}

DancersTemplates.prototype.generateDancerEdit = function(dancer, saveHandler) {
  let node = document.createElement('div');
  node.classList.add('dancer-card');
  node.id = "dancer-" + dancer.uuid;

  let view = this.editDancerCardTemplate;

  view = view.replace('{{name}}', dancer.name);
  view = view.replace('{{bibNumber}}', dancer.bibNumber);

  node.innerHTML = view;
  node.querySelector('.save-button').onclick = (e) => {
    let updatedDancer = {
      uuid: dancer.uuid,
      bibNumber: node.querySelector('.dancer-bib').value,
      name: node.querySelector('.dancer-name').value,
    }
    saveHandler(updatedDancer);
  };

  return node
}

DancersTemplates.prototype.generateDancerCard = function(dancer, editHandler, deleteHandler) {
  let node = document.createElement('div');
  node.classList.add('dancer-card');
  node.id = "dancer-" + dancer.uuid;

  let view = this.dancerCardTemplate;

  view = view.replace('{{name}}', dancer.name);
  view = view.replace('{{bibNumber}}', dancer.bibNumber);

  node.innerHTML = view;
  node.querySelector('.edit-button').onclick = (e) => editHandler(dancer.uuid);
  node.querySelector('.delete-button').onclick = (e) => deleteHandler(dancer.uuid);

  return node
}
