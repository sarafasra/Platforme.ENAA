import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AdminLayout.css";

function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="admin-layout">

            {/* Sidebar */}
            <aside className="admin-sidebar">

                <div className="admin-logo">
                    <div className="admin-logo-icon">E</div>

                    <div>
                        <h2>ENAA</h2>
                        <span>Leave Management</span>
                    </div>
                </div>

                <nav className="admin-menu">

                    <button onClick={() => navigate("/admin")}>
                         Dashboard
                    </button>

                    <button onClick={() => navigate("/users")}>
                        Utilisateurs
                    </button>

                    <button onClick={() => navigate("/types-conges")}>
                        Types de congés
                    </button>

                    <button onClick={() => navigate("/solde-conges")}>
                         Soldes de congés
                    </button>

                    <button onClick={() => navigate("/demandes-conges")}>
                         Demandes de congé
                    </button>

                    <button onClick={() => navigate("/notifications")}>
                         Notifications
                    </button>

                </nav>

                <div className="admin-sidebar-bottom">
                    <button
                        className="admin-logout"
                        onClick={handleLogout}
                    >
                         Déconnexion
                    </button>
                </div>

            </aside>

            {/* Contenu */}
            <main className="admin-main">

                <header className="admin-topbar">
                    <div>
                        <p>Administration</p>
                        <h1>Espace Administrateur</h1>
                    </div>

                    <div className="admin-profile">
                        <div className="admin-avatar">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <strong>{user?.name}</strong>
                            <span>{user?.role}</span>
                        </div>
                    </div>
                </header>

                <div className="admin-content">
                    <Outlet />
                </div>

            </main>

        </div>
    );
}

export default AdminLayout;