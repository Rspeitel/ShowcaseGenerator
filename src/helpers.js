export function createUUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

export function nullCheck(item) {
  return (item !== null && item !== undefined)
}

export function getUUIDFromHtmlId(id) {
  id = id.replace('dance-', "");
  id = id.replace('dance-group-', "");
  id = id.replace('dance-group-item', "");
  return id;
}

export function GlobalHelpers() {
  Array.prototype.insert = function (index, ...items) {
    this.splice(index, 0, ...items);
  }

  Array.prototype.insertBefore = function (element, reference) {
    let index = null;
    if(nullCheck(element?.uuid)) { index = this.findIndexByUUID(element); }
    else { index = this.indexOf(element); }

    if(nullCheck(reference)) { this.insert(index, element); }
    else { this.push(element); }
  }

  Array.prototype.findIndexByUUID = function(uuid) {
    return this.indexOf(this.find(element => element.uuid === uuid));
  }

  Array.prototype.findByUUID = function (uuid) {
    return this.find(element => element.uuid === uuid);
  }

  Array.prototype.remove = function (element) {
    let index = null;

    if(nullCheck(this.at(0)?.uuid)) { index = this.findIndexByUUID(element); }
    else { index = this.indexOf(element); }

    if (index > -1) { this.splice(index, 1); }
    else { console.log('That item did not exist'); }
  }
}
