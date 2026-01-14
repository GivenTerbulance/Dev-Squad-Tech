import { AuthService } from './auth.service';
import { prismaMock } from '../../jest.setup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
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

    describe('register', () => {
        it('should register a new user successfully', async () => {
            const credentials = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
            };

            prismaMock.user.findUnique.mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
            prismaMock.user.create.mockResolvedValue(mockUser);
            (jwt.sign as jest.Mock).mockReturnValue('mock-token');

            const result = await AuthService.register(credentials);

            expect(result.user.email).toBe(credentials.email);
            expect(result.token).toBe('mock-token');
            expect(prismaMock.user.create).toHaveBeenCalled();
        });

        it('should throw error if user already exists', async () => {
            prismaMock.user.findUnique.mockResolvedValue(mockUser);

            await expect(AuthService.register({
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
            })).rejects.toThrow('User with this email already exists');
        });
    });

    describe('login', () => {
        it('should login successfully with correct credentials', async () => {
            const credentials = {
                email: 'test@example.com',
                password: 'password123',
            };

            prismaMock.user.findUnique.mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue('mock-token');

            const result = await AuthService.login(credentials);

            expect(result.user.id).toBe(mockUser.id);
            expect(result.token).toBe('mock-token');
        });

        it('should throw error if user not found', async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            await expect(AuthService.login({
                email: 'wrong@example.com',
                password: 'password123',
            })).rejects.toThrow('Invalid credentials');
        });

        it('should throw error if password incorrect', async () => {
            prismaMock.user.findUnique.mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(AuthService.login({
                email: 'test@example.com',
                password: 'wrong-password',
            })).rejects.toThrow('Invalid credentials');
        });
    });
});
