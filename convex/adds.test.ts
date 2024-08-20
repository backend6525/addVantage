import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";

//import schema from "./schema";

test("creating an advertisement", async () => {
  const t = convexTest();

  // Call the createAdd mutation
  const add = await t.mutation(api.adds.createAdd, {
    addName: "New Ad",
    teamId: "team123",
    createdBy: "user123@example.com",
    type: "banner",
    costPerView: "0.05",
    nOfDaysRunning: "30",
    
    
  });

  // Query the database to verify the insertion
  const adds = await t.query(api.adds.list,  { email: "user123@example.com" }); // Assuming you have a list query for adds
  expect(adds).toContainEqual(
    expect.objectContaining({
        addName: "New Ad",
        teamId: "team123",
        createdBy: "user123@example.com",
        type: "banner",
        costPerView: "0.05",
        nOfDaysRunning: "30",
      })
  );
});
