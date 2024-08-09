import database from "infra/database";
import waitForAllServices from "../../../../orchestrator.js";

beforeAll(async () => {
  await waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

test("GET to api /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "GET",
  });
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
