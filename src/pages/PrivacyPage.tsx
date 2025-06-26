import React from "react";
import "../styles/glassmorphism.css";

const PrivacyPage: React.FC = () => (
  <div className="glass-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="glass-content" style={{ maxWidth: 600, padding: 32, borderRadius: 16, textAlign: 'center' }}>
      <h1>Privacy Policy</h1>
      <p>
        This is a sample privacy policy page used for testing Facebook or Instagram login integration.
        We do not collect or store any personal information unless explicitly permitted by the user.
      </p>
      <p>
        For demo purposes, your login data is only used to authenticate with Facebook or Instagram via their official OAuth.
      </p>
      <p>
        This app does not share your data with third parties. For more information, please contact us at support@example.com.
      </p>
    </div>
  </div>
);

export default PrivacyPage;
