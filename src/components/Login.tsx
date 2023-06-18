import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Registry, container } from "@core/infra/container.registry";
import { LoginUseCase } from "@core/application/authentication/login.use-case";
import UserContext from "contexts/UserContext";

const Login = () => {
    const { setUserData } = React.useContext(UserContext);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [formOptions, setFormOptions] = React.useState({
        linkLabel: "Esqueceu a senha? Clique aqui",
        href: "/carrinho",
        buttonLabel: "Entrar",
        isDisabled: false,
    });
    const loginService = container.get<LoginUseCase>(Registry.LoginUseCase);
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormOptions({
            ...formOptions,
            buttonLabel: "Entrando...",
            isDisabled: true,
        });

        try {
            await loginService.execute(email, password).then((data) => {
                toast.success("Usuário logado com sucesso.");
                setUserData({
                    email: data?.email,
                    // @ts-ignore
                    token: data?.stsTokenManager?.accessToken,
                });
                navigate("/carrinho");
            });
        } catch (error) {
            setFormOptions({
                ...formOptions,
                buttonLabel: "Entrar",
                isDisabled: false,
            });
            toast.error("Não foi possível logar. Verifique se o email e a senha estão corretos e tente novamente.");
            console.error(error);
        }
    }

    return (
        <>
            <div className="container hFlex">
                <div className="formPage">
                    <h1>Login</h1>
                    <p>Digite seu email e senha para acessar sua conta</p>
                    <form className="formBox hFlex" onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="loginButton">
                            {formOptions.buttonLabel}
                        </button>
                    </form>
                    <NavLink to="/esqueci-minha-senha" className="redirLink">
                        {formOptions.linkLabel}
                    </NavLink>
                    <NavLink to="/register" className="redirLink">Cadastre sua conta</NavLink>
                </div>
                <div>
                    <img src="./assets/about/Image.png" alt="About Us" height="500px" width="500px" />
                </div>
            </div>
        </>
    );
};

export default Login;
