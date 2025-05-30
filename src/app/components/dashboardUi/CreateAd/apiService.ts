// apiService.ts
export const uploadFileToS3 = async (file: File): Promise<string> => {
	const fileName = encodeURIComponent(file.name);
	const fileType = file.type;

	const base64Content = await new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			const result = reader.result as string | null;
			result ? resolve(result.split(',')[1]) : reject('File reading failed');
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});

	try {
		const res = await fetch('/api/uploadToS3', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ fileName, fileType, fileContent: base64Content }),
		});

		if (!res.ok) throw new Error(`Server error: ${await res.text()}`);
		return (await res.json()).cloudFrontUrl;
	} catch (error) {
		console.error('Error uploading file to S3:', error);
		throw error;
	}
};
