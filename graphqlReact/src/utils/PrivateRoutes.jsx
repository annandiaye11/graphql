import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoutes = () => {
  const { isAuthenticated, setToken, setAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true); // État de chargement pour contrôler le rendu

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    setLoading(false); // Réinitialisez le chargement une fois la vérification terminée
  }, []);

  if (loading) {
    return null; // Ou retournez un loader ou un autre élément de chargement
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoutes;
