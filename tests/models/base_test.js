import { Base } from "../../src/models/base.js";
import { createUUID } from "../../src/helpers.js";


function ModelExample(data) {
  this.uuid = createUUID();
  this.foo = data.foo;
  this.bar = data.bar;
}

export function ModelExamples() {
  Base.call(this, ModelExample)
}

ModelExamples.prototype = Object.create(Base.prototype);
ModelExamples.prototype.constructor = Base;

export function BaseTestSuite(testSuite) {
  Tests(testSuite);
}

function Tests(testSuite) {
  let modelExamples = new ModelExamples();
  let createdExample = modelExamples.create({foo: "Something", bar: "Something else"});

  // CREATE
  testSuite.expect(modelExamples.elements.length === 1, "Create builds a new object");

  testSuite.expect((createdExample.foo === "Something" && createdExample.bar === "Something else"), "Make sure the contents of the object is passed to create");

  // REMOVE
  modelExamples.remove(createdExample.uuid);

  testSuite.expect(modelExamples.elements.length === 0, "Remove deletes an object from array");
}
