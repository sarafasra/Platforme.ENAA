import { useEffect, useState } from "react";
import api from "../services/api";

function MesDemandesPage() {
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getDemandes();
    }, []);

    const getDemandes = async () => {
        try {
            const response = await api.get("/demandes-conges");

            console.log("DEMANDES API:", response.data);

            const data = Array.isArray(response.data)
                ? response.data
                : response.data.data || [];

            setDemandes(data);
        } catch (error) {
            console.error(
                "Erreur demandes:",
                error.response?.data || error
            );

            setError(
                error.response?.data?.message ||
                "Erreur lors du chargement des demandes."
            );
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (statut) => {
        switch (statut) {
            case "pending_manager":
                return (
                    <span style={{
                        background: "#fef3c7",
                        color: "#92400e",
                        padding: "4px 8px",
                        borderRadius: "4px"
                    }}>
                        En attente Manager
                    </span>
                );

            case "pending_hr":
                return (
                    <span style={{
                        background: "#dbeafe",
                        color: "#1e40af",
                        padding: "4px 8px",
                        borderRadius: "4px"
                    }}>
                        En attente RH
                    </span>
                );

            case "approved":
                return (
                    <span style={{
                        background: "#d1fae5",
                        color: "#065f46",
                        padding: "4px 8px",
                        borderRadius: "4px"
                    }}>
                        Validé
                    </span>
                );

            case "rejected":
                return (
                    <span style={{
                        background: "#fee2e2",
                        color: "#991b1b",
                        padding: "4px 8px",
                        borderRadius: "4px"
                    }}>
                        Refusé
                    </span>
                );

            default:
                return statut || "N/A";
        }
    };

    if (loading) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Mes demandes</h2>
                <p>Chargement...</p>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: "1000px",
            margin: "30px auto",
            padding: "20px"
        }}>
            <h2>Mes demandes de congé</h2>

            {error && (
                <div style={{
                    background: "#fee2e2",
                    color: "#991b1b",
                    padding: "12px",
                    borderRadius: "6px",
                    marginTop: "15px"
                }}>
                    {error}
                </div>
            )}

            {!error && demandes.length === 0 && (
                <div style={{
                    background: "#fff",
                    padding: "30px",
                    marginTop: "20px",
                    borderRadius: "8px",
                    textAlign: "center"
                }}>
                    <p>Aucune demande de congé trouvée.</p>
                </div>
            )}

            {demandes.length > 0 && (
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                    background: "#fff"
                }}>
                    <thead>
                        <tr style={{
                            background: "#f3f4f6",
                            textAlign: "left"
                        }}>
                            <th style={{ padding: "12px" }}>Type</th>
                            <th style={{ padding: "12px" }}>Début</th>
                            <th style={{ padding: "12px" }}>Fin</th>
                            <th style={{ padding: "12px" }}>Journée</th>
                            <th style={{ padding: "12px" }}>Statut</th>
                        </tr>
                    </thead>

                    <tbody>
                        {demandes.map((demande) => (
                            <tr
                                key={demande.id}
                                style={{
                                    borderBottom: "1px solid #e5e7eb"
                                }}
                            >
                                <td style={{ padding: "12px" }}>
                                    {demande.type_conge?.nom || "N/A"}
                                </td>

                                <td style={{ padding: "12px" }}>
                                    {demande.date_debut}
                                </td>

                                <td style={{ padding: "12px" }}>
                                    {demande.date_fin}
                                </td>

                                <td style={{ padding: "12px" }}>
                                    {demande.type_journee}
                                </td>

                                <td style={{ padding: "12px" }}>
                                    {getStatusBadge(demande.statut)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MesDemandesPage;