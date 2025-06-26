import React, { useCallback, useEffect } from "react";
import "../styles/glassmorphism.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

const FACEBOOK_APP_ID = "1264986601639476";
const REDIRECT_URI = `${window.location.origin}/oauth-callback`;

const fbAuthUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=instagram_basic,instagram_manage_insights,pages_show_list,pages_read_engagement&response_type=code`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = useCallback(() => {
    window.open(fbAuthUrl, "_self");
  }, []);

  return (
    <div className="glass-container">
      <div className="glass-content">
        <h1 className="glass-title">Login to Instagram</h1>
        <button className="glass-btn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
