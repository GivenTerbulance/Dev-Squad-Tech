export type UserRole = 'USER' | 'ADMIN';

export interface User {
    id: string;
    email: string;
    name?: string | null;
    role: UserRole;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token?: string; // Optional if you are using session cookies
}
