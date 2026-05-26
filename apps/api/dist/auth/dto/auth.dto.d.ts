export declare class RegisterDto {
    email: string;
    password: string;
    username: string;
    accountType: 'PERSONAL' | 'BUSINESS';
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
