test("GET to api /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const bodyResponse = await response.json();

  const updatedAtbodyValue = new Date(bodyResponse["updated_at"]).toISOString();
  expect(bodyResponse["updated_at"]).toEqual(updatedAtbodyValue);
  expect(bodyResponse["updated_at"]).toEqual(updatedAtbodyValue);

  expect(bodyResponse.dependencies.database.version).toEqual("16.0");
  expect(bodyResponse.dependencies.database.max_connections).toEqual(100);
  expect(bodyResponse.dependencies.database.open_connections).toEqual(1);
});
