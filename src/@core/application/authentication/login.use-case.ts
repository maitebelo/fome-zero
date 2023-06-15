import { User } from "firebase/auth";
import { AuthenticatorGateway } from "../../domain/gateways/authenticator.gateway";

export class LoginUseCase {
    constructor(private authenticatorGateway: AuthenticatorGateway) {}

    async execute(email: string, password: string): Promise<User> {
        const user = await this.authenticatorGateway.login(email, password);

        return JSON.parse(JSON.stringify(user));
    }
}