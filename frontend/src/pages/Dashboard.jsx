import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div>
            <h1>Dashboard</h1>

            {user && (
                <>
                    <h2>Bienvenue {user.name}</h2>
                    <p>Email : {user.email}</p>
                    <p>Rôle : {user.role}</p>
                </>
            )}

            <button onClick={handleLogout}>
                Déconnexion
            </button>
        </div>
    );
}

export default Dashboard;