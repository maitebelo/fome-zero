import { Container } from "inversify";
import { firestore } from "../../utils/firebase";
import { AuthenticatorFirebaseGateway } from "./gateways/authenticatorFirebase.gateway";
import { LoginUseCase } from "../application/authentication/login.use-case";
import { ForgotPasswordUseCase } from "../application/authentication/forgotPassword.use-case";
import { ProductFirebaseGateway } from "./gateways/productFirebase.gateway";
import { ListProductUseCase } from "../application/products/listProducts.use-case";
import { CartFirebaseGateway } from "./gateways/cartFirebase.gateway";
import { MyCartUseCase } from "@core/application/cart/myCart.use-case";
import { AddProductOnCartUseCase } from "@core/application/cart/addProductOnCart.use-case";

export const Registry = {
    FirestoreAdapter: Symbol.for("FirestoreAdapter"),

    AuthenticatorGateway: Symbol.for("AuthenticatorGateway"),

    LoginUseCase: Symbol.for("LoginUseCase"),

    ForgotPasswordUseCase: Symbol.for("ForgotPasswordUseCase"),

    ProductGateway: Symbol.for("ProductGateway"),

    ListProductUseCase: Symbol.for("ListProductUseCase"),

    CartGateway: Symbol.for("CartGateway"),

    MyCartUseCase: Symbol.for("MyCartUseCase"),

    AddProductOnCartUseCase: Symbol.for("AddProductOnCartUseCase"),
};

export const container = new Container();

container.bind(Registry.FirestoreAdapter).toConstantValue(firestore);

container.bind(Registry.AuthenticatorGateway).toDynamicValue((context) => {
    return new AuthenticatorFirebaseGateway(context.container.get(Registry.FirestoreAdapter));
});

container.bind(Registry.LoginUseCase).toDynamicValue((context) => {
    return new LoginUseCase(context.container.get(Registry.AuthenticatorGateway));
});

container.bind(Registry.ForgotPasswordUseCase).toDynamicValue((context) => {
    return new ForgotPasswordUseCase(context.container.get(Registry.AuthenticatorGateway));
});

container.bind(Registry.ProductGateway).toDynamicValue((context) => {
    return new ProductFirebaseGateway(context.container.get(Registry.FirestoreAdapter));
});

container.bind(Registry.ListProductUseCase).toDynamicValue((context) => {
    return new ListProductUseCase(context.container.get(Registry.ProductGateway));
});

container.bind(Registry.CartGateway).toDynamicValue((context) => {
    return new CartFirebaseGateway(context.container.get(Registry.FirestoreAdapter));
});

container.bind(Registry.MyCartUseCase).toDynamicValue((context) => {
    return new MyCartUseCase(
        context.container.get(Registry.CartGateway),
        context.container.get(Registry.ListProductUseCase)
    );
});

container.bind(Registry.AddProductOnCartUseCase).toDynamicValue((context) => {
    return new AddProductOnCartUseCase(context.container.get(Registry.CartGateway));
});
