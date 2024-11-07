// // pages/api/inviteFriend.ts

// import type { NextApiRequest, NextApiResponse } from "next";
// import sendgrid from "@sendgrid/mail";

// sendgrid.setApiKey(process.env.SENDGRID_API_KEY); // Set your SendGrid API key in the .env.local file

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	if (req.method !== "POST") {
// 		return res.status(405).json({ message: "Method not allowed" });
// 	}

// 	const { friendEmail, userId } = req.body;

// 	if (!friendEmail || !userId) {
// 		return res.status(400).json({ message: "Email and user ID are required" });
// 	}

// 	try {
// 		// Send an email using SendGrid
// 		await sendgrid.send({
// 			to: friendEmail, // Recipient's email
// 			from: "your-email@example.com", // Your verified SendGrid sender email
// 			subject: "You’ve been invited!",
// 			text: `Hey! Your friend invited you to join our platform. Use this link to sign up!`,
// 			html: `<p>Hey! Your friend invited you to join our platform. <a href="https://your-app.com/signup?ref=${userId}">Click here</a> to sign up!</p>`,
// 		});

// 		return res
// 			.status(200)
// 			.json({ success: true, message: "Invitation sent successfully!" });
// 	} catch (error) {
// 		console.error("Error sending email:", error);
// 		return res
// 			.status(500)
// 			.json({ success: false, message: "Failed to send invitation." });
// 	}
// }
