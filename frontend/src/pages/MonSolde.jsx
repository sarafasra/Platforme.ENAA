import { useEffect, useState } from "react";
import api from "../services/api";

function SoldeConge() {
    const [users, setUsers] = useState([]);
    const [typesConges, setTypesConges] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [joursTotal, setJoursTotal] = useState("");

    useEffect(() => {
        api.get("/users")
           .then(res => setUsers(Array.isArray(res.data) ? res.data : res.data.data || []))
           .catch(err => console.error("Erreur Users:", err));

        api.get("/types-conges")
           .then(res => setTypesConges(Array.isArray(res.data) ? res.data : res.data.data || []))
           .catch(err => console.error("Erreur Types:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/soldes-conges", {
                user_id: selectedUser,
                type_conge_id: selectedType,
                jours_total: joursTotal,
            });
            alert("succes");
            setSelectedUser("");
            setSelectedType("");
            setJoursTotal("");
        } catch (error) {
            alert("erreur");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Solde de congés</h2>
            <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
                <h3>Attribuer un solde de congé</h3>

                <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <div>
                        <label>Utilisateur</label>
                        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
                            <option value="">Sélectionner un utilisateur</option>
                            {users.map((u) => (
                                <option key={u.id} value={u.id}>{u.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Type de congé</label>
                        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} required>
                            <option value="">Sélectionner un type</option>
                            {typesConges.map((t) => (
                                <option key={t.id} value={t.id}>{t.nom}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Jours Total</label>
                        <input 
                            type="number" 
                            placeholder="Ex: 22" 
                            value={joursTotal} 
                            onChange={(e) => setJoursTotal(e.target.value)} 
                            required 
                        />
                    </div>

                    <button type="submit">Ajouter le solde</button>
                </form>
            </div>
        </div>
    );
}

export default SoldeConge;