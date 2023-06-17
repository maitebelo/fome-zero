import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ForgotPasswordUseCase } from "@core/application/authentication/forgotPassword.use-case";
import { Registry, container } from "@core/infra/container.registry";

const ForgotPassword = () => {
    const [email, setEmail] = React.useState("");
    const [formOptions, setFormOptions] = React.useState({
        linkLabel: "Deseja fazer login? Clique aqui",
        href: "/admin",
        buttonLabel: "Enviar e-email de recuperação",
        isDisabled: false,
    });
    const resetPasswordService = container.get<ForgotPasswordUseCase>(Registry.ForgotPasswordUseCase);
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormOptions({
            ...formOptions,
            buttonLabel: "Enviando...",
            isDisabled: true,
        });

        await resetPasswordService.execute(email).then(() => {
            toast.success("E-mail de recuperação enviado com sucesso.");
            navigate("/login");
            }).catch((error) => {
                console.log("cai no catch")
            setFormOptions({
                ...formOptions,
                buttonLabel: "Enviar e-email de recuperação",
                isDisabled: false,
            });
            toast.error(
                "Não foi possível enviar o e-mail de recuperação. Verifique se o e-mail está correto e tente novamente."
            );
            console.error(error);
        })
    }

    return (
        <>
            <div className="container hFlex">
                <div className="formPage">
                    <h1>Esqueci minha senha</h1>
                    <p>Digite seu email para receber um link para redefinição de senha</p>
                    <form className="formBox hFlex" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit" className="loginButton">
                            {formOptions.buttonLabel}
                        </button>
                    </form>
                    <NavLink to="/login" className="redirLink">
                        {formOptions.linkLabel}
                    </NavLink>
                </div>
                <div>
                    <img src="./assets/about/Image.png" alt="About Us" height="500px" width="500px" />
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
