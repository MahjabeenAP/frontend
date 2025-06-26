import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import axios from "axios";

const OauthCallbackPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) {
      setError("No code provided in URL.");
      setLoading(false);
      return;
    }

    // Exchange code for access token
    axios.get(`http://localhost:8000/oauth-callback/?code=${encodeURIComponent(code)}`)
      .then(() => {
        // For demo, use code as token. In production, use real access_token.
        login(code);
        setLoading(false);
        navigate("/home", { replace: true });
      })
      .catch(err => {
        setError("Failed to authenticate: " + (err.response?.data?.detail || err.message));
        setLoading(false);
      });
  }, [navigate, login]);

  return (
    <div className="glass-container">
      <div className="glass-content">
        {loading ? (
          <p>Authenticating...</p>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <div>Authentication successful! Redirecting...</div>
        )}
      </div>
    </div>
  );
};

export default OauthCallbackPage;
