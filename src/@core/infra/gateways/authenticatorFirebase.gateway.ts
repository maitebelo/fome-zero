import firebase from "firebase/compat/app";
import { authentification } from "../../../utils/firebase";
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
} from "firebase/auth";
import { AuthenticatorGateway } from "../../domain/gateways/authenticator.gateway";

export class AuthenticatorFirebaseGateway implements AuthenticatorGateway {
    constructor(private firestore: firebase.firestore.Firestore) {}

    async login(email: string, password: string): Promise<User> {
        try {
            return await signInWithEmailAndPassword(authentification, email, password).then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                return user;
            });
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao logar");
        }
    }

    async register(email: string, password: string): Promise<User> {
        try {
            return await createUserWithEmailAndPassword(authentification, email, password).then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                return user;
            });
        } catch (error) {
            console.error(error);
            throw new Error("Method not implemented.");
        }
    }

    async logout(): Promise<void> {
        try {
            return await signOut(authentification)
                .then(() => {
                    // Sign-out successful.
                })
                .catch((error) => {
                    // An error happened.
                });
        } catch (error) {
            console.error(error);
            throw new Error("Method not implemented.");
        }
    }

    async getCurrentUser(): Promise<User> {
        try {
            const user = await authentification.currentUser;

            if (!user) {
                throw new Error("Usuário não encontrado");
            }

            return user;
        } catch (error) {
            console.error(error);
            throw new Error("Method not implemented.");
        }
    }

    async sendPasswordResetEmail(email: string): Promise<void> {
        try {
            return await sendPasswordResetEmail(authentification, email)
                .then((data) => {
                    return data;
                })
                .catch((error) => {
                    console.error(error);
                    throw new Error("Method not implemented.");
                });
        } catch (error) {
            console.error(error);
            throw new Error("Method not implemented.");
        }
    }
}
