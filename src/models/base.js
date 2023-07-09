
export function Base(object, newObjectFn) {
  this.object = object;
  this.newObjectFn = newObjectFn;
}

Entries.prototype.create = function(data) {
  this.object.push(newObjectFn(data))
}

Entries.prototype.find = function(uuid) {
  return this.object.findByUUID(uuid);
}

Entries.prototype.remove = function(uuid) {
  this.object.remove(uuid);
  return true;
}

Entries.prototype.toJSON = function() {
  return JSON.stringify(this.object);
}

Entries.prototype.fromJSON = function(json) {
  this.object = JSON.parse(json);

  this.object.forEach((entry, index) => {
    this.object[index] = Object.assign(new , entry);
  });
}

