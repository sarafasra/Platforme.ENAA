import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TypesConge from "./pages/TypesConge";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route
                path="/types-conges"
                element={<TypesConge />}
            />

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    );
}

export default App;