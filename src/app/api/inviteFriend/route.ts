import { NextResponse } from "next/server";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

// API route to handle email invites
export async function POST(req: Request) {
	const { friendEmail, userId } = await req.json();

	const mailerSend = new MailerSend({
		apiKey: process.env.MAILERSEND_API_KEY!,
	});

	const sentFrom = new Sender("noreply@adzpay.net", "Your App");
	const recipients = [new Recipient(friendEmail, "Friend")];

	// Personalization data to be used in the template
	const personalization = [
		{
			email: friendEmail,
			data: {
				userId: userId, // Assuming this is used in your template
				referralUrl: `https://yourapp.com/signup?ref=${userId}`,
			},
		},
	];

	// Use a pre-built template by ID, and add personalization
	const emailParams = new EmailParams()
		.setFrom(sentFrom)
		.setTo(recipients)
		.setSubject("You're Invited!") // Subject will be overwritten by template if the template has one.
		.setTemplateId("k68zxl2mdw94j905") // Set the template ID
		.setPersonalization(personalization); // Use personalization to pass dynamic data

	try {
		const response = await mailerSend.email.send(emailParams);
		return NextResponse.json({
			success: true,
			message: "Invitation sent successfully!",
		});
	} catch (error) {
		console.error("Error sending email:", error);
		return NextResponse.json({
			success: false,
			message: "Failed to send invitation.",
		});
	}
}
