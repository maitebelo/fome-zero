import { User } from "firebase/auth";

export interface AuthenticatorGateway {
    login(email: string, password: string): Promise<User>;

    sendPasswordResetEmail(email: string): Promise<void>;
}