// import { test } from 'vitest';
// import { ConvexHttpClient } from 'convex/browser';
// import { api } from './_generated/api';
// import { Id } from './_generated/dataModel';

// // Mock the Convex client
// const mockConvex = {
// 	query: vi.fn(),
// 	mutation: vi.fn(),
// };

// // Mock the database
// const mockDb = {
// 	get: vi.fn(),
// 	insert: vi.fn(),
// 	patch: vi.fn(),
// 	delete: vi.fn(),
// };

// // Mock the context
// const mockCtx = {
// 	db: mockDb,
// 	auth: {
// 		getUserIdentity: vi.fn(),
// 	},
// };

// describe('Ads API', () => {
// 	beforeEach(() => {
// 		vi.clearAllMocks();
// 	});

// 	describe('createAd', () => {
// 		test('should create a new ad successfully', async () => {
// 			const mockUser = { email: 'test@example.com' };
// 			mockCtx.auth.getUserIdentity.mockResolvedValue(mockUser);

// 			const args = {
// 				adName: 'Test Ad',
// 				teamId: 'team123',
// 				type: 'banner',
// 				costPerView: '0.01',
// 				numberOfDaysRunning: '30',
// 				adResourceUrl: 'https://example.com/ad.jpg',
// 				description: 'Test description',
// 			};

// 			const expectedAd = {
// 				...args,
// 				createdBy: mockUser.email,
// 				createdAt: expect.any(String),
// 				lastModifiedAt: expect.any(String),
// 				isPublished: false,
// 			};

// 			mockDb.insert.mockResolvedValue({ _id: 'ad123' });

// 			const result = await api.ads.createAd.handler(mockCtx, args);

// 			expect(mockDb.insert).toHaveBeenCalledWith('ads', expectedAd);
// 			expect(result).toEqual({ id: 'ad123' });
// 		});

// 		test('should throw error if user is not authenticated', async () => {
// 			mockCtx.auth.getUserIdentity.mockResolvedValue(null);

// 			const args = {
// 				adName: 'Test Ad',
// 				teamId: 'team123',
// 			};

// 			await expect(api.ads.createAd.handler(mockCtx, args)).rejects.toThrow(
// 				'User must be authenticated to create an ad'
// 			);
// 		});
// 	});

// 	describe('updateAd', () => {
// 		test('should update an existing ad successfully', async () => {
// 			const mockUser = { email: 'test@example.com' };
// 			mockCtx.auth.getUserIdentity.mockResolvedValue(mockUser);

// 			const existingAd = {
// 				_id: 'ad123',
// 				createdBy: mockUser.email,
// 				adName: 'Old Name',
// 			};

// 			mockDb.get.mockResolvedValue(existingAd);

// 			const args = {
// 				id: 'ad123',
// 				adName: 'New Name',
// 			};

// 			await api.ads.updateAd.handler(mockCtx, args);

// 			expect(mockDb.patch).toHaveBeenCalledWith('ad123', {
// 				adName: 'New Name',
// 				lastModifiedAt: expect.any(String),
// 			});
// 		});

// 		test('should throw error if ad does not exist', async () => {
// 			mockDb.get.mockResolvedValue(null);

// 			const args = {
// 				id: 'nonexistent',
// 				adName: 'New Name',
// 			};

// 			await expect(api.ads.updateAd.handler(mockCtx, args)).rejects.toThrow(
// 				'Ad not found'
// 			);
// 		});

// 		test('should throw error if user is not the creator', async () => {
// 			const mockUser = { email: 'test@example.com' };
// 			mockCtx.auth.getUserIdentity.mockResolvedValue(mockUser);

// 			const existingAd = {
// 				_id: 'ad123',
// 				createdBy: 'other@example.com',
// 			};

// 			mockDb.get.mockResolvedValue(existingAd);

// 			const args = {
// 				id: 'ad123',
// 				adName: 'New Name',
// 			};

// 			await expect(api.ads.updateAd.handler(mockCtx, args)).rejects.toThrow(
// 				'Only the creator can update this ad'
// 			);
// 		});
// 	});

// 	describe('deleteAd', () => {
// 		test('should delete an ad successfully', async () => {
// 			const mockUser = { email: 'test@example.com' };
// 			mockCtx.auth.getUserIdentity.mockResolvedValue(mockUser);

// 			const existingAd = {
// 				_id: 'ad123',
// 				createdBy: mockUser.email,
// 			};

// 			mockDb.get.mockResolvedValue(existingAd);

// 			const args = {
// 				id: 'ad123',
// 			};

// 			await api.ads.deleteAd.handler(mockCtx, args);

// 			expect(mockDb.delete).toHaveBeenCalledWith('ad123');
// 		});

// 		test('should throw error if ad does not exist', async () => {
// 			mockDb.get.mockResolvedValue(null);

// 			const args = {
// 				id: 'nonexistent',
// 			};

// 			await expect(api.ads.deleteAd.handler(mockCtx, args)).rejects.toThrow(
// 				'Ad not found'
// 			);
// 		});

// 		test('should throw error if user is not the creator', async () => {
// 			const mockUser = { email: 'test@example.com' };
// 			mockCtx.auth.getUserIdentity.mockResolvedValue(mockUser);

// 			const existingAd = {
// 				_id: 'ad123',
// 				createdBy: 'other@example.com',
// 			};

// 			mockDb.get.mockResolvedValue(existingAd);

// 			const args = {
// 				id: 'ad123',
// 			};

// 			await expect(api.ads.deleteAd.handler(mockCtx, args)).rejects.toThrow(
// 				'Only the creator can delete this ad'
// 			);
// 		});
// 	});

// 	describe('listAds', () => {
// 		test('should return all ads for a user', async () => {
// 			const mockUser = { email: 'test@example.com' };
// 			mockCtx.auth.getUserIdentity.mockResolvedValue(mockUser);

// 			const mockAds = [
// 				{
// 					_id: 'ad1',
// 					createdBy: mockUser.email,
// 					adName: 'Ad 1',
// 				},
// 				{
// 					_id: 'ad2',
// 					createdBy: mockUser.email,
// 					adName: 'Ad 2',
// 				},
// 			];

// 			mockDb.query.mockResolvedValue(mockAds);

// 			const result = await api.ads.listAds.handler(mockCtx, {});

// 			expect(result).toEqual(mockAds);
// 		});

// 		test('should throw error if user is not authenticated', async () => {
// 			mockCtx.auth.getUserIdentity.mockResolvedValue(null);

// 			await expect(api.ads.listAds.handler(mockCtx, {})).rejects.toThrow(
// 				'User must be authenticated to list ads'
// 			);
// 		});
// 	});

// 	describe('getAdById', () => {
// 		test('should return a specific ad', async () => {
// 			const mockUser = { email: 'test@example.com' };
// 			mockCtx.auth.getUserIdentity.mockResolvedValue(mockUser);

// 			const mockAd = {
// 				_id: 'ad123',
// 				createdBy: mockUser.email,
// 				adName: 'Test Ad',
// 			};

// 			mockDb.get.mockResolvedValue(mockAd);

// 			const result = await api.ads.getAdById.handler(mockCtx, { id: 'ad123' });

// 			expect(result).toEqual(mockAd);
// 		});

// 		test('should throw error if ad does not exist', async () => {
// 			mockDb.get.mockResolvedValue(null);

// 			await expect(
// 				api.ads.getAdById.handler(mockCtx, { id: 'nonexistent' })
// 			).rejects.toThrow('Ad not found');
// 		});
// 	});
// });
