import React from "react";
import { toast } from "react-toastify";

const RelatarProblema = ({ orderId }: { orderId?: string }) => {
    const [problem, setProblem] = React.useState<string>("");

    const sendProblem = () => {
        let message = "";
        if (orderId) message += `Olá, tive um problema com o pedido ${orderId}! \n`;

        message += problem;

        window.open(`https://wa.me/5511999999999?text=${message}`, "_blank");

        toast.success("Pedido enviado no whatsapp");
    };

    return (
        <>
            <div className="container hFlex">
                <div className="formPage">
                    <h1>Relatar problema</h1>
                    <p>Digite sua experiência no App</p>
                    <form className="formBox hFlex" onSubmit={sendProblem}>
                        <textarea
                            placeholder="Digite sua mensagem"
                            onChange={(e) => setProblem(e.target.value)}
                            value={problem}
                            style={{
                                resize: "none",
                                width: "100%",
                                height: "200px",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                outline: "none",
                                fontSize: "16px",
                                fontFamily: "Roboto",
                            }}
                        />
                        <button type="submit" className="loginButton">
                            Enviar
                        </button>
                    </form>
                </div>
                <div>
                    <img src="./assets/relate-problem/bugfix.jpg" alt="Relatar Problema" height="500px" width="500px" />
                </div>
            </div>
        </>
    );
};

export default RelatarProblema;
