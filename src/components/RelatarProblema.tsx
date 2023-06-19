import React from 'react'

const RelatarProblema = () => {
    return (
        <>
            <div className="container hFlex">
                <div className="formPage">
                    <h1>Relatar problema</h1>
                    <p>Digite sua experiência no App</p>
                    <form className="formBox hFlex">
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                        />
                        <input
                            type="email"
                            placeholder="Digite seu email"
                        />
                        <input
                            type="text"
                            placeholder="Digite o problema encontrado"
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
    )
}

export default RelatarProblema;