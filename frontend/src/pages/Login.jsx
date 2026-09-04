import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Une erreur est survenue."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-container">

                {/* Left side */}
                <div className="login-info">
                    <div className="brand">
                        <div className="brand-icon">E</div>
                        <span>ENAA Leave</span>
                    </div>

                    <div className="info-content">
                        <p className="small-title">
                            GESTION DES CONGÉS
                        </p>

                        <h1>
                            Gérez vos congés
                            <br />
                            en toute simplicité.
                        </h1>

                        <p>
                            Une plateforme simple et moderne pour
                            gérer vos demandes de congés et suivre
                            votre solde.
                        </p>
                    </div>

                    <div className="info-footer">
                        © 2026 ENAA Leave
                    </div>
                </div>

                {/* Right side */}
                <div className="login-form-container">

                    <div className="login-form">

                        <div className="mobile-logo">
                            <div className="brand-icon">E</div>
                            <span>ENAA Leave</span>
                        </div>

                        <h2>Bienvenue </h2>

                        <p className="subtitle">
                            Connectez-vous à votre espace personnel
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="input-group">
                                <label>Email</label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="exemple@email.com"
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Mot de passe</label>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="login-error">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Connexion..."
                                    : "Se connecter"}
                            </button>

                        </form>

                        <p className="register-link">
                            Vous n'avez pas de compte ?
                            <Link to="/register">
                                {" "}Créer un compte
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;