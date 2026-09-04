import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [typesConges, setTypesConges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTypesConges = async () => {
            try {
                const response = await api.get("/types-conges");
                const data = Array.isArray(response.data) ? response.data : response.data.data || [];
                setTypesConges(data);
            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                setLoading(false);
            }
        };

        getTypesConges();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const isAdminOrHR = user?.role === "admin" || user?.role === "rh" || user?.role === "manager";

    return (
        <div className="dashboard">

            <aside className="sidebar">
                <div className="logo">
                    <div className="logo-icon">E</div>
                    <div>
                        <h2>ENAA</h2>
                        <span>Leave Management</span>
                    </div>
                </div>

                <nav className="menu">
                    <button className="menu-item active" onClick={() => navigate("/dashboard")}>
                        <span>⌂</span>
                        Dashboard
                    </button>

                    {!isAdminOrHR && (
                        <>
                            <button className="menu-item" onClick={() => navigate("/mes-demandes")}>
                                 Mes demandes
                            </button>

                            <button className="menu-item" onClick={() => navigate("/nouvelle-demande")}>
                                 Nouvelle demande
                            </button>

                            <button className="menu-item" onClick={() => navigate("/mon-solde")}>
                                 Mon solde
                            </button>
                        </>
                    )}

                    <button className="menu-item" onClick={() => navigate("/types-conges")}>
                         Types de congés
                    </button>

                    {isAdminOrHR && (
                        <button className="menu-item" onClick={() => navigate("/mes-demandes")}>
                             Valider demandes
                        </button>
                    )}
                </nav>

                <div className="sidebar-bottom">
                    <button className="logout-btn" onClick={handleLogout}>
                         Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">

                {/* Header */}
                <header className="topbar">
                    <div>
                        <p className="welcome-small">Espace personnel</p>
                        <h1>Bonjour, {user?.name}</h1>
                    </div>

                    <div className="profile">
                        <div className="avatar">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <strong>{user?.name}</strong>
                            <span>{user?.role}</span>
                        </div>
                    </div>
                </header>

                {/* Welcome card */}
                <section className="welcome-card">
                    <div>
                        <span className="welcome-label">
                            BIENVENUE SUR ENAA LEAVE
                        </span>

                        <h2>
                            Gérez vos congés
                            <br />
                            simplement et rapidement.
                        </h2>

                        <p>
                            Consultez vos informations et suivez facilement vos demandes de congés.
                        </p>
                    </div>

                    <div className="welcome-icon"></div>
                </section>

                {/* Statistics */}
                <section className="stats-grid">

                    <div className="stat-card" style={{ cursor: "pointer" }} onClick={() => navigate("/types-conges")}>
                        <div className="stat-icon"></div>
                        <div>
                            <span>Types de congés</span>
                            <strong>{typesConges.length}</strong>
                        </div>
                    </div>

                    <div className="stat-card" style={{ cursor: "pointer" }} onClick={() => navigate("/mes-demandes")}>
                        <div className="stat-icon"></div>
                        <div>
                            <span>Mes Demandes</span>
                            <strong>0</strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">✓</div>
                        <div>
                            <span>Demandes acceptées</span>
                            <strong>0</strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon"></div>
                        <div>
                            <span>En attente</span>
                            <strong>0</strong>
                        </div>
                    </div>

                </section>

                <section className="content-section">

                    <div className="section-header">
                        <div>
                            <h2>Types de congés</h2>
                            <p>Les types de congés disponibles</p>
                        </div>

                        <button className="view-btn" onClick={() => navigate("/types-conges")}>
                            Voir tout →
                        </button>
                    </div>

                    {loading ? (
                        <div className="empty-state">
                            <div className="loader"></div>
                            <p>Chargement...</p>
                        </div>
                    ) : typesConges.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon"></div>
                            <h3>Aucun type de congé</h3>
                            <p>Aucun type de congé n'est disponible pour le moment.</p>
                        </div>
                    ) : (
                        <div className="leave-grid">
                            {typesConges.map((type) => (
                                <div className="leave-card" key={type.id} onClick={() => navigate("/types-conges")} style={{ cursor: "pointer" }}>
                                    <div className="leave-icon"></div>

                                    <div>
                                        <h3>{type.nom}</h3>
                                        <p>
                                            {type.description || "Aucune description disponible."}
                                        </p>
                                    </div>

                                    <button className="arrow-btn">
                                        →
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                </section>

                <section className="account-card">
                    <div className="account-avatar">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="account-info">
                        <span>Mon compte</span>
                        <h3>{user?.name}</h3>
                        <p>{user?.email}</p>
                    </div>

                    <div className="role-badge">
                        {user?.role}
                    </div>
                </section>

            </main>
        </div>
    );
}

export default Dashboard;