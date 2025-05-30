import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
	excelUploader: f({
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
			maxFileSize: '4MB',
		},
	}).onUploadComplete((data) => {
		console.log('Upload complete', data);
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
