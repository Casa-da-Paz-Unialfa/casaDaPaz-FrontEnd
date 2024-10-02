import { useEffect } from "react";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { IToken } from "../../interfaces/token";
import { verificaTokenExpirado } from "../../services/token";
import { useNavigate } from "react-router-dom";

const Voluntario = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let lsStorage = localStorage.getItem('americanos.token');
        let token: IToken | null = null;

        if (typeof lsStorage === 'string') {
            token = JSON.parse(lsStorage);
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate("/");
        }

        console.log("Pode desfrutar do sistema :D");

    }, [navigate]);

    return (
        <LayoutDashboard>
            <h1>Voluntários</h1>
        </LayoutDashboard>
    );
};

export default Voluntario;
