// Script to run the user credits migration
require('dotenv').config();
const { ConvexHttpClient } = require('convex/browser');
const { api } = require('../convex/_generated/api');

// Create a Convex client
const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function runMigration() {
	console.log('Starting user credits migration...');

	try {
		const result = await client.mutation(api.credits.migrateUserCredits);
		console.log('Migration completed successfully!');
		console.log('Migration details:', result);
	} catch (error) {
		console.error('Migration failed:', error);
		process.exit(1);
	}
}

// Run the migration
runMigration();
