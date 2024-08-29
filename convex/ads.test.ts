// import { convexTest } from "convex-test";
// import { expect, test } from "vitest";
// import { api } from "./_generated/api";

// test("creating an advertisement with all fields", async () => {
// 	const t = convexTest();

// 	const add = await t.mutation(api.ads.createAd, {
// 		addName: "New Ad",
// 		teamId: "team123",
// 		createdBy: "user123@example.com",
// 		type: "banner",
// 		costPerView: "0.05",
// 		nOfDaysRunning: "30",
// 	});

// 	const ads = await t.query(api.ads.list, { email: "user123@example.com" });
// 	expect(ads).toContainEqual(
// 		expect.objectContaining({
// 			addName: "New Ad",
// 			teamId: "team123",
// 			createdBy: "user123@example.com",
// 			type: "banner",
// 			costPerView: "0.05",
// 			nOfDaysRunning: "30",
// 		})
// 	);
// });

// test("creating an advertisement with required fields only", async () => {
// 	const t = convexTest();

// 	const add = await t.mutation(api.ads.createAd, {
// 		addName: "Basic Ad",
// 		teamId: "team456",
// 		createdBy: "user456@example.com",
// 	});

// 	const ads = await t.query(api.ads.list, { email: "user456@example.com" });
// 	expect(ads).toContainEqual(
// 		expect.objectContaining({
// 			addName: "Basic Ad",
// 			teamId: "team456",
// 			createdBy: "user456@example.com",
// 		})
// 	);
// });

// test("creating an advertisement with missing required fields", async () => {
// 	const t = convexTest();

// 	await expect(
// 		t.mutation(api.ads.createAd, {
// 			addName: "Incomplete Ad",
// 			// Missing teamId and createdBy
// 		})
// 	).rejects.toThrow();
// });

// test("listing advertisements by email", async () => {
// 	const t = convexTest();

// 	await t.mutation(api.ads.createAd, {
// 		addName: "Ad 1",
// 		teamId: "team123",
// 		createdBy: "user123@example.com",
// 	});

// 	await t.mutation(api.ads.createAd, {
// 		addName: "Ad 2",
// 		teamId: "team123",
// 		createdBy: "user123@example.com",
// 	});

// 	const ads = await t.query(api.ads.list, { email: "user123@example.com" });
// 	expect(ads).toHaveLength(2);
// 	expect(ads).toContainEqual(expect.objectContaining({ addName: "Ad 1" }));
// 	expect(ads).toContainEqual(expect.objectContaining({ addName: "Ad 2" }));
// });

// test("listing advertisements with no results", async () => {
// 	const t = convexTest();

// 	const ads = await t.query(api.ads.list, {
// 		email: "nonexistent@example.com",
// 	});
// 	expect(ads).toHaveLength(0);
// });

// test("listing all advertisements", async () => {
// 	const t = convexTest();

// 	await t.mutation(api.ads.createAd, {
// 		addName: "Ad 1",
// 		teamId: "team123",
// 		createdBy: "user123@example.com",
// 	});

// 	await t.mutation(api.ads.createAd, {
// 		addName: "Ad 2",
// 		teamId: "team456",
// 		createdBy: "user456@example.com",
// 	});

// 	const ads = await t.query(api.ads.listAll);
// 	expect(ads).toHaveLength(2);
// 	expect(ads).toContainEqual(expect.objectContaining({ addName: "Ad 1" }));
// 	expect(ads).toContainEqual(expect.objectContaining({ addName: "Ad 2" }));
// // });
// import { convexTest } from "convex-test";
// import { expect, test } from "vitest";
// import { api } from "./_generated/api";

// test("creating an advertisement with all fields", async () => {
// 	const t = convexTest();

// 	const add = await t.mutation(api.ads.createAd as any, {
// 		addName: "New Ad",
// 		teamId: "team123",
// 		createdBy: "user123@example.com",
// 		type: "banner",
// 		costPerView: "0.05",
// 		nOfDaysRunning: "30",
// 	});

// 	const ads = await t.query(api.ads.list as any, {
// 		email: "user123@example.com",
// 	});
// 	expect(ads).toContainEqual(
// 		expect.objectContaining({
// 			addName: "New Ad",
// 			teamId: "team123",
// 			createdBy: "user123@example.com",
// 			type: "banner",
// 			costPerView: "0.05",
// 			nOfDaysRunning: "30",
// 		})
// 	);
// });

// test("creating an advertisement with required fields only", async () => {
// 	const t = convexTest();

// 	const add = await t.mutation(api.ads.createAd as any, {
// 		addName: "Basic Ad",
// 		teamId: "team456",
// 		createdBy: "user456@example.com",
// 	});

// 	const ads = await t.query(api.ads.list as any, {
// 		email: "user456@example.com",
// 	});
// 	expect(ads).toContainEqual(
// 		expect.objectContaining({
// 			addName: "Basic Ad",
// 			teamId: "team456",
// 			createdBy: "user456@example.com",
// 		})
// 	);
// });

// test("creating an advertisement with missing required fields", async () => {
// 	const t = convexTest();

// 	await expect(
// 		t.mutation(api.ads.createAd as any, {
// 			addName: "Incomplete Ad",
// 			// Missing teamId and createdBy
// 		})
// 	).rejects.toThrow();
// });

// test("listing advertisements by email", async () => {
// 	const t = convexTest();

// 	await t.mutation(api.ads.createAd as any, {
// 		addName: "Ad 1",
// 		teamId: "team123",
// 		createdBy: "user123@example.com",
// 	});

// 	await t.mutation(api.ads.createAd as any, {
// 		addName: "Ad 2",
// 		teamId: "team123",
// 		createdBy: "user123@example.com",
// 	});

// 	const ads = await t.query(api.ads.list as any, {
// 		email: "user123@example.com",
// 	});
// 	expect(ads).toHaveLength(2);
// 	expect(ads).toContainEqual(expect.objectContaining({ addName: "Ad 1" }));
// 	expect(ads).toContainEqual(expect.objectContaining({ addName: "Ad 2" }));
// });

// test("listing advertisements with no results", async () => {
// 	const t = convexTest();

// 	const ads = await t.query(api.ads.list as any, {
// 		email: "nonexistent@example.com",
// 	});
// 	expect(ads).toHaveLength(0);
// });

// test("listing all advertisements", async () => {
// 	const t = convexTest();

// 	await t.mutation(api.ads.createAd as any, {
// 		addName: "Ad 1",
// 		teamId: "team123",
// 		createdBy: "user123@example.com",
// 	});

// 	await t.mutation(api.ads.createAd as any, {
// 		addName: "Ad 2",
// 		teamId: "team456",
// 		createdBy: "user456@example.com",
// 	});

// 	const ads = await t.query(api.ads.listAll as any);
// 	expect(ads).toHaveLength(2);
// 	expect(ads).toContainEqual(expect.objectContaining({ addName: "Ad 1" }));
// 	expect(ads).toContainEqual(expect.objectContaining({ addName: "Ad 2" }));
// });

// import { convexTest } from "convex-test";
// import { expect, test } from "vitest";
// import { api } from "./_generated/api";

// test("creating an advertisement with all fields", async () => {
// 	const t = convexTest();

// 	// Create an advertisement
// 	const ad = await t.mutation(api.ads.createAd, {
// 		adName: "New Ad",
// 		teamId: "team123",
// 		createdBy: "user123@example.com",
// 		type: "banner",
// 		costPerView: "0.05",
// 		numberOfDaysRunning: "30",
// 	});

// 	// Retrieve the specific advertisement
// 	const ads = await t.query(api.ads.list, { email: "user123@example.com" });
// 	expect(ads).toContainEqual(
// 		expect.objectContaining({
// 			adName: "New Ad",
// 			teamId: "team123",
// 			createdBy: "user123@example.com",
// 			type: "banner",
// 			costPerView: "0.05",
// 			numberOfDaysRunning: "30",
// 		})
// 	);
// });

// test("creating an advertisement with required fields only", async () => {
// 	const t = convexTest();

// 	// Create an advertisement with required fields only
// 	const ad = await t.mutation(api.ads.createAd, {
// 		adName: "Basic Ad",
// 		teamId: "team456",
// 		createdBy: "user456@example.com",
// 	});

// 	// Retrieve the specific advertisement
// 	const ads = await t.query(api.ads.list, { email: "user456@example.com" });
// 	expect(ads).toContainEqual(
// 		expect.objectContaining({
// 			adName: "Basic Ad",
// 			teamId: "team456",
// 			createdBy: "user456@example.com",
// 		})
// 	);
// });

// test("creating an advertisement with missing required fields", async () => {
// 	const t = convexTest();

// 	// Attempt to create an advertisement with missing required fields
// 	await expect(
// 		t.mutation(api.ads.createAd, {
// 			adName: "Incomplete Ad",
// 			// Missing teamId and createdBy
// 		})
// 	).rejects.toThrow();
// });

// test("listing advertisements by email", async () => {
// 	const t = convexTest();

// 	// Create multiple advertisements
// 	await t.mutation(api.ads.createAd, {
// 		adName: "Ad 1",
// 		teamId: "team123",
// 		createdBy: "user123@example.com",
// 	});

// 	await t.mutation(api.ads.createAd, {
// 		adName: "Ad 2",
// 		teamId: "team123",
// 		createdBy: "user123@example.com",
// 	});

// 	// Retrieve advertisements by email
// 	const ads = await t.query(api.ads.list, { email: "user123@example.com" });
// 	expect(ads).toHaveLength(2);
// 	expect(ads).toContainEqual(expect.objectContaining({ adName: "Ad 1" }));
// 	expect(ads).toContainEqual(expect.objectContaining({ adName: "Ad 2" }));
// });

// test("listing advertisements with no results", async () => {
// 	const t = convexTest();

// 	// Attempt to retrieve advertisements for a non-existent email
// 	const ads = await t.query(api.ads.list, {
// 		email: "nonexistent@example.com",
// 	});
// 	expect(ads).toHaveLength(0);
// });

// test("listing all advertisements", async () => {
// 	const t = convexTest();

// 	// Create multiple advertisements
// 	await t.mutation(api.ads.createAd, {
// 		adName: "Ad 1",
// 		teamId: "team123",
// 		createdBy: "user123@example.com",
// 	});

// 	await t.mutation(api.ads.createAd, {
// 		adName: "Ad 2",
// 		teamId: "team456",
// 		createdBy: "user456@example.com",
// 	});

// 	// Retrieve all advertisements
// 	const ads = await t.query(api.ads.listAll);
// 	expect(ads).toHaveLength(2);
// 	expect(ads).toContainEqual(expect.objectContaining({ adName: "Ad 1" }));
// 	expect(ads).toContainEqual(expect.objectContaining({ adName: "Ad 2" }));
// });
