import { User } from "firebase/auth";
import { AuthenticatorGateway } from "../../domain/gateways/authenticator.gateway";

export class RegisterUseCase {
    constructor(private authenticatorGateway: AuthenticatorGateway) {}

    async execute(email: string, password: string): Promise<User> {
        try {
            return await this.authenticatorGateway.register(email, password);
        } catch (error) {
            console.log("error", error);
            throw new Error("Method not implemented.");
        }
    }
}
