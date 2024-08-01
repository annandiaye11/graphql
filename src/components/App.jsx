import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "../style/App.css";
import { AuthProvider } from "../utils/AuthProvider";
import PrivateRoutes from "../utils/PrivateRoutes";
import Home from "./Home";
import LoginForm from "./LoginForm";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        {" "}
        <Routes>
          <Route element={<PrivateRoutes />}>
            {" "}
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
