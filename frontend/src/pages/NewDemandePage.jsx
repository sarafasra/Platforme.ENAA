import { useEffect, useState } from "react";
import api from "../services/api";

function NewDemandePage() {
    const [typesConges, setTypesConges] = useState([]);
    const [typeCongeId, setTypeCongeId] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [typeJournee, setTypeJournee] = useState("entiere");
    const [motif, setMotif] = useState("");
    const [pieceJointe, setPieceJointe] = useState(null);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        api.get("/types-conges")
            .then(res => setTypesConges(Array.isArray(res.data) ? res.data : res.data.data || []))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append("type_conge_id", typeCongeId);
        formData.append("date_debut", dateDebut);
        formData.append("date_fin", dateFin);
        formData.append("type_journee", typeJournee);
        if (motif) formData.append("motif", motif);
        if (pieceJointe) formData.append("piece_jointe", pieceJointe);

        try {
            await api.post("/demandes-conges", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setMessage({ type: "success", text: "Demande créée avec succès !" });
            setTypeCongeId("");
            setDateDebut("");
            setDateFin("");
            setTypeJournee("entiere");
            setMotif("");
            setPieceJointe(null);
        } catch (err) {
            setMessage({ type: "error", text: err.response?.data?.message || "Erreur lors de l'envoi." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "30px auto", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <h2>Nouvelle Demande</h2>

            {message && (
                <div style={{ padding: "10px", marginBottom: "15px", borderRadius: "5px", background: message.type === "success" ? "#d1fae5" : "#fee2e2", color: message.type === "success" ? "#065f46" : "#991b1b" }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                    <label style={{ display: "block", fontWeight: "bold" }}>Type de congé :</label>
                    <select value={typeCongeId} onChange={(e) => setTypeCongeId(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "5px" }}>
                        <option value="">Sélectionner un type</option>
                        {typesConges.map(t => (
                            <option key={t.id} value={t.id}>{t.nom}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: "block", fontWeight: "bold" }}>Date début :</label>
                        <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: "block", fontWeight: "bold" }}>Date fin :</label>
                        <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
                    </div>
                </div>

                <div>
                    <label style={{ display: "block", fontWeight: "bold" }}>Type de journée :</label>
                    <select value={typeJournee} onChange={(e) => setTypeJournee(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "5px" }}>
                        <option value="entiere">Journée entière</option>
                        <option value="matin">Matin</option>
                        <option value="apres_midi">Après-midi</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: "block", fontWeight: "bold" }}>Motif :</label>
                    <textarea value={motif} onChange={(e) => setMotif(e.target.value)} rows="3" style={{ width: "100%", padding: "8px", marginTop: "5px" }}></textarea>
                </div>

                <div>
                    <label style={{ display: "block", fontWeight: "bold" }}>Justificatif :</label>
                    <input type="file" onChange={(e) => setPieceJointe(e.target.files[0])} accept=".pdf,.png,.jpg,.jpeg" style={{ marginTop: "5px" }} />
                </div>

                <button type="submit" disabled={loading} style={{ background: "#2563eb", color: "#fff", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
                    {loading ? "Envoi..." : "Envoyer la demande"}
                </button>
            </form>
        </div>
    );
}

export default NewDemandePage;