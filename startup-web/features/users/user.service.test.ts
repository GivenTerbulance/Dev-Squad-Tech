import { UserService } from './user.service';
import { prismaMock } from '../../jest.setup';

describe('UserService', () => {
    const mockUser = {
        id: 'user-1',
        email: 'test@example.com',
        password: 'hashed-password',
        name: 'Test User',
        role: 'USER' as const,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    describe('getProfile', () => {
        it('should return user profile if found', async () => {
            // Exclude password from the mock return to simulate Prisma 'select' behavior
            const { password, ...userProfile } = mockUser;
            prismaMock.user.findUnique.mockResolvedValue(userProfile as any);

            const result = await UserService.getProfile('user-1');

            expect(result).toEqual({
                id: mockUser.id,
                name: mockUser.name,
                email: mockUser.email,
                image: mockUser.image,
                role: mockUser.role,
                createdAt: mockUser.createdAt,
                updatedAt: mockUser.updatedAt,
            });
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { id: 'user-1' },
                select: expect.any(Object),
            });
        });

        it('should return null if user not found', async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            const result = await UserService.getProfile('non-existent');

            expect(result).toBeNull();
        });
    });

    describe('updateProfile', () => {
        it('should update user profile successfully', async () => {
            const updateData = {
                name: 'Updated Name',
                image: 'https://example.com/new-image.jpg',
            };

            const updatedUser = { ...mockUser, ...updateData };
            prismaMock.user.update.mockResolvedValue(updatedUser);

            const result = await UserService.updateProfile('user-1', updateData);

            expect(result.name).toBe(updateData.name);
            expect(result.image).toBe(updateData.image);
            expect(prismaMock.user.update).toHaveBeenCalledWith({
                where: { id: 'user-1' },
                data: updateData,
                select: expect.any(Object),
            });
        });
    });
});
