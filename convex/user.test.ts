// import { convexTest } from "convex-test";
// import { expect, test } from "vitest";
// import { api } from "./_generated/api";

// // Test case for creating a user
// test("creating a user", async () => {
//   const t = convexTest();

//   // Call the createUser mutation
//   const user = await t.mutation(api.user.createUser, {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     picture: "http://example.com/john.jpg",
//     phone: "1234567890",
//     location: "New York",
//   });

//   // Query the database to verify the insertion
//   const users = await t.query(api.user.getUser, { email: "john.doe@example.com" });
//   expect(users).toContainEqual(
//     expect.objectContaining({
//       name: "John Doe",
//       email: "john.doe@example.com",
//       picture: "http://example.com/john.jpg",
//       phone: "1234567890",
//       location: "New York",
//     })
//   );
// });

// // Test case for fetching a user
// test("fetching a user", async () => {
//   const t = convexTest();

//   // First, create a user to fetch
//   await t.mutation(api.user.createUser, {
//     name: "Jane Doe",
//     email: "jane.doe@example.com",
//     picture: "http://example.com/jane.jpg",
//     phone: "0987654321",
//     location: "Los Angeles",
//   });

//   // Fetch the user by email
//   const users = await t.query(api.user.getUser, { email: "jane.doe@example.com" });

//   // Verify the fetched user information
//   expect(users).toContainEqual(
//     expect.objectContaining({
//       name: "Jane Doe",
//       email: "jane.doe@example.com",
//       picture: "http://example.com/jane.jpg",
//       phone: "0987654321",
//       location: "Los Angeles",
//     })
//   );
// });
