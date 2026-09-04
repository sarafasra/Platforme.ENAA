import { useEffect, useState } from "react";
import api from "../services/api";

function TypesConge() {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = async () => {
        try {
            const response = await api.get("/types-conges");
            setTypes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Types de congé</h1>

            {types.map((type) => (
                <div key={type.id}>
                    <h3>{type.nom}</h3>
                    <p>{type.description}</p>
                    <p>Durée maximale : {type.duree_max} jours</p>
                </div>
            ))}
        </div>
    );
}

export default TypesConge;