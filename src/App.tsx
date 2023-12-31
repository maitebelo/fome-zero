import React from "react";
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Header from "./components/Header";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import Carrinho from "./components/Carrinho";
import ForgotPassword from "components/ForgotPassword";
import RelatarProblema from "components/RelatarProblema";

import "./styles/reset.css";
import "./styles/App.css";
import Login from "components/Login";
import useToken from "utils/hooks/useToken";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "contexts/UserContext";
import HistoryScreen from "components/HistoryScreen";
import Register from "components/Register";

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/sobre" element={<AboutUs />} />
                    <Route
                        path="/carrinho"
                        element={
                            <ProtectedRouteGuard>
                                <Carrinho />
                            </ProtectedRouteGuard>
                        }
                    ></Route>
                    <Route
                        path="/history"
                        element={
                            <ProtectedRouteGuard>
                                <HistoryScreen />
                            </ProtectedRouteGuard>
                        }
                    />
                    <Route path="/esqueci-minha-senha" element={<ForgotPassword />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/relatar-problema" element={<RelatarProblema />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Navigate replace to="/" />} />
                </Routes>
                <Footer />
                <ToastContainer />
            </Router>
        </UserProvider>
    );
};

function ProtectedRouteGuard({ children }: { children: React.ReactNode }) {
    const token = useToken();

    if (!token) {
        toast.error("Você precisa estar logado para acessar esta página");
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

export default App;
