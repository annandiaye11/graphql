import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import "../style/App.css";
import { useAuth } from "../utils/AuthProvider";

const LoginForm = () => {
  const {
    GetToken,
    setEmail,
    setPassword,
    email,
    password,
    credentialsError,
    setCredentialsError,
  } = useAuth();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordInputClass, setPasswordInputClass] = useState(
    "input input-bordered w-full max-w-xs"
  );
  const [emailInputClass, setEmailInputClass] = useState(
    "input input-bordered w-full max-w-xs"
  );
  const [errorCredentialsMessage, seterrorCredentialsMessage] = useState("");

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      setEmailInputClass("border-2 border-rose-500");
      return false;
    } else {
      setEmailError("");
      setEmailInputClass("");
      return true;
    }
  };
  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      setPasswordInputClass("border-2 border-rose-500");
      return false;
    } else {
      setPasswordError("");
      setPasswordInputClass("");
      return true;
    }
  };

  useEffect(() => {
    if (credentialsError) {
      seterrorCredentialsMessage("Credentials Error");
      setPasswordInputClass("border-2 border-rose-500");
      setEmailInputClass("border-2 border-rose-500");
    }
    setCredentialsError(false);
  }, [credentialsError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    GetToken();
  };

  return (
    <form action="" className="flex flex-col max-w-sm gap-5 w-80">
      <h1 className="text-[40px] text-white font-bold">Sign In</h1>
      <div className="flex flex-col max-w-sm justify-start items-start gap-2.5 w-full">
        <Label className="text-red-500">{errorCredentialsMessage}</Label>
        <Label className="text-[17px] text-white" htmlFor="email">
          Email or Username
        </Label>
        <Input
          autoComplete="current-username"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          id="email"
          placeholder="Email or Username"
          className={emailInputClass}
          onBlur={validateEmail}
        />
        <Label className="text-red-500">{emailError}</Label>
      </div>

      <div className="flex flex-col max-w-sm justify-start items-start gap-2.5 w-full">
        <Label className="text-[17px] text-white" htmlFor="email">
          Password
        </Label>
        <Input
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          id="password"
          placeholder="Password"
          className={passwordInputClass}
          onBlur={validatePassword}
        />
        <Label className="text-red-500">{passwordError}</Label>
      </div>
      <Button variant="perso" onClick={handleSubmit} type="submit" className="text-white">
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
