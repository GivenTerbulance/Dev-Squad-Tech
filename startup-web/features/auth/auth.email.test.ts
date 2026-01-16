import { AuthService } from './auth.service';
import { EmailService } from '../email/email.service';
import { prismaMock } from '../../jest.setup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthService Email Integration', () => {
    const mockUser = {
        id: 'user-1',
        email: 'test-email@example.com',
        password: 'hashed-password',
        name: 'Test User',
        role: 'USER' as const,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        // Spy on the real EmailService method
        jest.spyOn(EmailService, 'sendWelcomeEmail').mockResolvedValue(undefined);
    });

    it('should call sendWelcomeEmail after successful registration', async () => {
        const credentials = {
            email: 'test-email@example.com',
            password: 'password123',
            name: 'Test User',
        };

        prismaMock.user.findUnique.mockResolvedValue(null);
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
        prismaMock.user.create.mockResolvedValue(mockUser);
        (jwt.sign as jest.Mock).mockReturnValue('mock-token');

        await AuthService.register(credentials);

        expect(EmailService.sendWelcomeEmail).toHaveBeenCalledTimes(1);
        expect(EmailService.sendWelcomeEmail).toHaveBeenCalledWith(
            credentials.email,
            credentials.name
        );
    });
});
