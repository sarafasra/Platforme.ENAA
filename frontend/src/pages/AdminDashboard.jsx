import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AdminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="admin-dashboard">

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

                    <button
                        className="admin-menu-item active"
                        onClick={() => navigate("/admin")}
                    >
                         Dashboard
                    </button>

                    <button
                        className="admin-menu-item"
                        onClick={() => navigate("/types-conges")}
                    >
                         Types de congés
                    </button>

                    <button
                        className="admin-menu-item"
                        onClick={() => navigate("/solde-conges")}
                    >
                         Soldes de congés
                    </button>

                    <button className="admin-menu-item">
                         Utilisateurs
                    </button>

                    <button className="admin-menu-item">
                         Demandes de congé
                    </button>

                    <button className="admin-menu-item">
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

            {/* Main */}
            <main className="admin-main">

                {/* Topbar */}
                <header className="admin-topbar">

                    <div>
                        <p className="admin-welcome">
                            Bienvenue dans votre espace
                        </p>

                        <h1>Dashboard Admin</h1>
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

                {/* Content */}
                <section className="admin-content">

                    <div className="admin-title">
                        <h2>Vue d'ensemble</h2>
                        <p>
                            Gérez facilement les congés et les utilisateurs.
                        </p>
                    </div>

                    <div className="admin-cards">

                        <div className="admin-card">
                            <div className="card-icon">👥</div>

                            <div>
                                <span>Utilisateurs</span>
                                <h3>--</h3>
                            </div>
                        </div>

                        <div className="admin-card">
                            <div className="card-icon"></div>

                            <div>
                                <span>Types de congés</span>
                                <h3>--</h3>
                            </div>
                        </div>

                        <div className="admin-card">
                            <div className="card-icon"></div>

                            <div>
                                <span>Demandes</span>
                                <h3>--</h3>
                            </div>
                        </div>

                        <div className="admin-card">
                            <div className="card-icon">⏳</div>

                            <div>
                                <span>En attente</span>
                                <h3>--</h3>
                            </div>
                        </div>

                    </div>

                    {/* Actions rapides */}
                    <div className="admin-section">

                        <h2>Actions rapides</h2>

                        <div className="admin-actions">

                            <button
                                onClick={() =>
                                    navigate("/types-conges")
                                }
                            >
                                
                                <span>
                                    Gérer les types de congés
                                </span>
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/solde-conges")
                                }
                            >
                                
                                <span>
                                    Gérer les soldes
                                </span>
                            </button>

                            <button>
                                
                                <span>
                                    Gérer les utilisateurs
                                </span>
                            </button>

                            <button>
                                
                                <span>
                                    Voir les demandes
                                </span>
                            </button>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;