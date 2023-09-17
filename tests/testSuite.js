import { GlobalHelpers } from '../src/helpers.js';
import { BaseTestSuite } from './models/base_test.js';
import { HeatGenerationServiceTestSuite } from './services/heatGenerationService_test.js';

function TestSuite() {
  // TODO: Make a pretty output for this:
  console.log("Generating test suite...");
  this.totalTestNumber = 0;
  this.passedTestNumber = 0;
}

TestSuite.prototype.run = function() {
  GlobalHelpers();
  // BaseTestSuite(this);
  HeatGenerationServiceTestSuite(this);

}

TestSuite.prototype.expect = function(bool, description) {
  if(bool) {
    this.passTest(description);
  } else {
    this.failTest(description);
  }
}

TestSuite.prototype.passTest = function(description) {
    this.totalTestNumber++;
    this.passedTestNumber++;
    debugger;
    console.log(this.passedTestNumber + "/" + this.totalTestNumber + " | " + description);
}

TestSuite.prototype.failTest = function(description) {
    this.totalTestNumber++;
    console.log(this.passedTestNumber + "/" + this.totalTestNumber + " | Failed: " + description);
}

var TestSuiteInstance = new TestSuite();
TestSuiteInstance.run();
