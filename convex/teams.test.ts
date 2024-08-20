
import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";

// interface Team {
//     teamName: string,
//     createdBy: string
// }

test("check retrieval of a single team", async () => {
  const t = convexTest();

  // Create a team
  let team = await t.mutation(api.teams.createTeam, {
    teamName: "Adds",
    createdBy: "info.fiber@gmail.com",
  });

  // Retrieve the specific team
  const retrievedTeam = await t.query(api.teams.getTeam, {
    email: "info.fiber@gmail.com",
    teamName: "Adds",
  });

  // Check that the retrieved team matches the expected values, ignoring auto-generated fields
  expect(retrievedTeam).toContainEqual(
    expect.objectContaining({
      teamName: "Adds",
      createdBy: "info.fiber@gmail.com",
    })
  );
});

test("check retrieval of all teams", async () => {
  const t = convexTest();

  // Create multiple teams
  await t.mutation(api.teams.createTeam, {
    teamName: "Team1",
    createdBy: "user1@example.com",
  });
  await t.mutation(api.teams.createTeam, {
    teamName: "Team2",
    createdBy: "user2@example.com",
  });

  // Retrieve all teams
  const allTeams = await t.query(api.teams.getTeam, {
    email: "", // Assuming the query can handle an empty email to retrieve all teams
    teamName: "", // Assuming the query can handle an empty teamName to retrieve all teams
  });

  // Check that the retrieved teams match the expected values, ignoring auto-generated fields
  expect(allTeams).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        teamName: "Team1",
        createdBy: "user1@example.com",
      }),
      expect.objectContaining({
        teamName: "Team2",
        createdBy: "user2@example.com",
      }),
    ])
  );
});
