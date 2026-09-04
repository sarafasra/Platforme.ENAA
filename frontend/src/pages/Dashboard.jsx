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
                setTypesConges(response.data);
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

    return (
        <div className="dashboard">

            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">
                    <div className="logo-icon">E</div>
                    <div>
                        <h2>ENAA</h2>
                        <span>Leave Management</span>
                    </div>
                </div>

                <nav className="menu">
                    <button className="menu-item active">
                        <span>⌂</span>
                        Dashboard
                    </button>

                    <button className="menu-item">
                        <span></span>
                        Mes congés
                    </button>

                    <button className="menu-item">
                        Types de congés
                    </button>

                    <button className="menu-item">
                        <span></span>
                        Mon solde
                    </button>
                </nav>

                <div className="sidebar-bottom">
                    <button className="logout-btn" onClick={handleLogout}>
                        <span></span>
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="main-content">

                {/* Header */}
                <header className="topbar">
                    <div>
                        <p className="welcome-small">Espace personnel</p>
                        <h1>Bonjour, {user?.name} </h1>
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
                            Consultez vos informations et suivez
                            facilement vos congés.
                        </p>
                    </div>

                    <div className="welcome-icon">
                        
                    </div>
                </section>

                {/* Statistics */}
                <section className="stats-grid">

                    <div className="stat-card">
                        <div className="stat-icon"></div>
                        <div>
                            <span>Types de congés</span>
                            <strong>{typesConges.length}</strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon"></div>
                        <div>
                            <span>Demandes</span>
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

                {/* Content */}
                <section className="content-section">

                    <div className="section-header">
                        <div>
                            <h2>Types de congés</h2>
                            <p>Les types de congés disponibles</p>
                        </div>

                        <button className="view-btn">
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
                            <p>
                                Aucun type de congé n'est disponible pour le moment.
                            </p>
                        </div>
                    ) : (
                        <div className="leave-grid">
                            {typesConges.map((type) => (
                                <div className="leave-card" key={type.id}>
                                    <div className="leave-icon">
                                        
                                    </div>

                                    <div>
                                        <h3>{type.nom}</h3>
                                        <p>
                                            {type.description ||
                                                "Aucune description disponible."}
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

                {/* User information */}
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