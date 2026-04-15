interface UserRegistration {
	login: string;
	username: string;
	password: string;
	email: string;
	phoneNumber: string;
}

interface AuthData {
	login: string;
	password: string;
}

interface RefreshToken {
	refreshToken: string;
}

interface Profile {
	id: number;
	username: string;
	email: string;
	date: string;
	isBlocked: boolean;
	roles: Role[];
	phoneNumber: string;
}

interface ProfileRequest {
	username: string;
	email: string;
	phoneNumber: string;
}

interface PasswordRequest {
	password: string;
}

interface Token {
	accessToken: string;
	refreshToken: string;
}

type Role = "ADMIN" | "USER" | "MODERATOR";
