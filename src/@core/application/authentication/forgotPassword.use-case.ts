import { User } from 'firebase/auth';
import { AuthenticatorGateway } from '../../domain/gateways/authenticator.gateway';

export class ForgotPasswordUseCase {
  constructor(private authenticatorGateway: AuthenticatorGateway) {}

  async execute(email: string): Promise<void> {
    try {
      return await this.authenticatorGateway.sendPasswordResetEmail(
        email
      );
    } catch (error) {
      console.log("error", error)
      throw new Error('Method not implemented.');
    }
  }
}