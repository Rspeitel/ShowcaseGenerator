// Test
import { HeatGenerationService } from "../../src/services/heatGenerationService.js";
import { Event } from "../../src/event.js";
import data from '../../data/default.json' assert { type: "json" };

export function HeatGenerationServiceTestSuite(testSuite) {
  let event = new Event();
  event.fromJSON(data);

  let service = new HeatGenerationService(event)
  service.generate();

  console.log(event.heats.elements.length);
  console.log(event.heats.elements.map((heat) => [heat.entries.length, heat.danceUUID]));

}
