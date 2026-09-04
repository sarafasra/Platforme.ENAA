import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Dashboard.css";
import "./TypesConge.css";

function TypesConge() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [types, setTypes] = useState([]);
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [dureeMax, setDureeMax] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = async () => {
        try {
            const response = await api.get("/types-conges");
            const data = Array.isArray(response.data) ? response.data : response.data.data || [];
            setTypes(data);
        } catch (error) {
            console.error("Erreur API:", error);
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(dureeMax) < 1) {
        alert("La durée maximale doit être au moins 1 jour.");
        return;
    }

    const payload = {
        nom,
        description,
        duree_max: Number(dureeMax),
    };

    try {
        if (editId) {
            await api.put(`/types-conges/${editId}`, payload);
        } else {
            await api.post("/types-conges", payload);
        }

        alert(
            editId
                ? "Type de congé modifié avec succès !"
                : "Type de congé ajouté avec succès !"
        );

        resetForm();
        getTypes();
    } catch (error) {
        console.error(
            "Erreur Enregistrement:",
            error.response?.data || error
        );
    }
};
    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce type de congé ?")) {
            try {
                await api.delete(`/types-conges/${id}`);
                getTypes();
            } catch (error) {
                console.error("Erreur Suppression:", error);
            }
        }
    };

    const handleEdit = (type) => {
        setEditId(type.id);
        setNom(type.nom || "");
        setDescription(type.description || "");
        setDureeMax(type.duree_max || type.duree_maximale || type.duree || "");
    };

    const resetForm = () => {
        setEditId(null);
        setNom("");
        setDescription("");
        setDureeMax("");
    };

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="dashboard types-conge-page">
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
                    <button className="menu-item" onClick={() => navigate("/dashboard")}>
                        <span>⌂</span> Dashboard
                    </button>
                    <button className="menu-item" onClick={() => navigate("/mes-conges")}>
                        Mes congés
                    </button>
                    <button className="menu-item active" onClick={() => navigate("/types-conges")}>
                        Types de congés
                    </button>
                    <button className="menu-item" onClick={() => navigate("/mon-solde")}>
                        Mon solde
                    </button>
                </nav>

                <div className="sidebar-bottom">
                    <button className="logout-btn" onClick={handleLogout}>
                        Déconnexion
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <header className="topbar">
                    <div>
                        <p className="welcome-small">Gestion des paramètres</p>
                        <h1>Types de congés</h1>
                    </div>
                    <div className="profile">
                        <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
                        <div>
                            <strong>{user?.name}</strong>
                            <span>{user?.role}</span>
                        </div>
                    </div>
                </header>

                <section className="form-section">
                    <h3 className="form-title">{editId ? "Modifier le type" : "Ajouter un type de congé"}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Nom du type</label>
                                <input 
                                    className="form-input" 
                                    type="text" 
                                    placeholder="Ex: Congé payé" 
                                    value={nom} 
                                    onChange={(e) => setNom(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input 
                                    className="form-input" 
                                    type="text" 
                                    placeholder="Ex: Congé annuel" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Durée max (jours)</label>
                              <input
    className="form-input"
    type="number"
    min="1"
    placeholder="Ex: 18"
    value={dureeMax}
    onChange={(e) => setDureeMax(e.target.value)}
    required
/>
                            </div>
                        </div>
                        <button type="submit" className="btn-primary">
                            {editId ? "Mettre à jour" : "Ajouter"}
                        </button>
                        {editId && (
                            <button type="button" className="btn-secondary" onClick={resetForm}>
                                Annuler
                            </button>
                        )}
                    </form>
                </section>

                <section className="cards-grid">
                    {types.map((type) => {
                        const days = type.duree_max ?? type.duree_maximale ?? type.duree ?? "0";
                        return (
                            <div key={type.id} className="type-card">
                                <div>
                                    <div className="type-card-header">
                                        <div className="type-icon"></div>
                                        <h3>{type.nom}</h3>
                                    </div>
                                    <p>{type.description || "Aucune description"}</p>
                                    <span className="duration-badge">Durée max: {days} jours</span>
                                </div>
                                <div className="card-actions">
                                    <button className="btn-edit" onClick={() => handleEdit(type)}>Modifier</button>
                                    <button className="btn-delete" onClick={() => handleDelete(type.id)}>Supprimer</button>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </main>
        </div>
    );
}

export default TypesConge;