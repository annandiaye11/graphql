import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [datas, setData] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [credentialsError, setCredentialsError] = useState(false);
  const [errorFetchData, setErrorFetchData] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  function utf8ToBase64(str) {
    const encoder = new TextEncoder();
    const uint8array = encoder.encode(str);
    return btoa(String.fromCharCode.apply(null, uint8array));
  }

  const GetToken = async () => {
    const base64Credentials = utf8ToBase64(`${email}:${password}`);
    const url = "https://learn.zone01dakar.sn/api/auth/signin";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64Credentials}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      localStorage.setItem("token", result);
      setToken(result);
      setAuthenticated(true);
      setCredentialsError(false);
      setData("");
      navigate("/");
    } catch (error) {
      setAuthenticated(false);
      setCredentialsError(true);
    }
  };

  const data = {
    isAuthenticated,
    email,
    password,
    token,
    datas,
    credentialsError,
    errorFetchData,
    setCredentialsError,
    setErrorFetchData,
    setEmail,
    setPassword,
    logout,
    GetToken,
    setToken,
    setAuthenticated,
    setData,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
