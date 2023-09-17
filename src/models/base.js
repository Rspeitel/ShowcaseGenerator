export function Base(modelDef) {
  this.elements = [];
  this.modelDef = modelDef;
}

Base.prototype.create = function(data) {
  this.elements.push(new this.modelDef(data));
  return this.elements.at(-1);
}

Base.prototype.filter = function(key, value) {
  return this.elements.filter((element) => element[key] === value);
}

Base.prototype.findBy = function(key, value) {
  return this.elements.findBy(key, value);
}

Base.prototype.find = function(uuid) {
  return this.elements.findBy('uuid', uuid);
}

Base.prototype.remove = function(uuid) {
  this.elements.remove(uuid);
  return true;
}

Base.prototype.toJSON = function() {
  return JSON.stringify(this.elements);
}

Base.prototype.fromJSON = function(json) {
  this.elements = JSON.parse(json);

  this.elements.forEach((entry, index) => {
    this.elements[index] = Object.assign(new this.modelDef(), entry);
  });
}

