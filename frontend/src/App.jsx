import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TypesConge from "./pages/TypesConge";
import MonSolde from "./pages/MonSolde";
import AdminDashboard from "./pages/AdminDashboard";
import MesDemandesPage from "./pages/MesDemandesPage";
import NewDemandePage from "./pages/NewDemandePage";
function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/types-conges" element={<TypesConge />} />
            <Route path="/mon-solde" element={<MonSolde />} />
            <Route path="/mes-demandes" element={<MesDemandesPage />} />
<Route path="/nouvelle-demande" element={<NewDemandePage />} />

            <Route path="/admin" element={<AdminDashboard />} />

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    );
}

export default App;