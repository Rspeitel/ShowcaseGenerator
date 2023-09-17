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
  let modelExamples = new ModelExamples();
  let createdExample = modelExamples.create({foo: "Something", bar: "Something else"});

  // CREATE
  testSuite.expect(modelExamples.elements.length === 1, "Create builds a new object");

  testSuite.expect((createdExample.foo === "Something" && createdExample.bar === "Something else"), "Make sure the contents of the object is passed to create");

  [ 
    {foo: "random1", bar: "random"}, 
    {foo: "random2", bar: "random"},
    {foo: "random3", bar: "random"},
    {foo: "random4", bar: "random"},
    {foo: "random5", bar: "random"}
  ].forEach((data) => modelExamples.create(data));

  // FILTER
  let filteredResults = modelExamples.filter("bar", "random");
  testSuite.expect(filteredResults.length === 5, "Filter finds all the values that match");

  // FINDBY
  let findByExample = modelExamples.findBy("foo", "random4");

  testSuite.expect(findByExample.foo === "random4", "FindBy returns an object with matching key value pair");

  // FIND
  let findExample = modelExamples.find(createdExample.uuid);

  testSuite.expect(findExample.foo === "Something", "Find returns an object with matching uuid");

  // REMOVE
  modelExamples.remove(createdExample.uuid);

  testSuite.expect(modelExamples.elements.length === 5, "Remove deletes an object from array");
}
