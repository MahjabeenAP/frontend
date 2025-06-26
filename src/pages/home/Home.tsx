import React from 'react';
import Card from './components/Card';

const Home: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    padding: '40px 20px',
    fontFamily: '"Segoe UI", Roboto, -apple-system, BlinkMacSystemFont, sans-serif',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '48px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    color: '#262626',
    margin: '0 0 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#8e8e8e',
    margin: 0,
    fontWeight: 400,
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };

  const alertStyle: React.CSSProperties = {
    backgroundColor: '#fff8e6',
    borderLeft: '4px solid #ffc53d',
    padding: '16px 20px',
    borderRadius: '8px',
    margin: '40px auto',
    maxWidth: '800px',
  };

  const alertTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    margin: '0 0 12px',
    color: '#d46b08',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const requirementListStyle: React.CSSProperties = {
    margin: 0,
    paddingLeft: '24px',
  };

  const requirementItemStyle: React.CSSProperties = {
    margin: '8px 0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>
          <span>📊</span>
          Instagram Automation Dashboard
        </h1>
        <p style={subtitleStyle}>Manage your Instagram content and automation in one place</p>
      </header>

      <div style={gridStyle}>
        <Card
          title="Photo Post Automation"
          description="Create and schedule single photo posts with custom captions and hashtags"
          icon="🖼️"
          isActive={true}
          to="/photo-post"
        />
        
        <Card
          title="Reel Post Automation"
          description="Schedule and publish Instagram Reels with automated captions"
          icon="🎥"
          isActive={true}
          to="/reel-post"
        />
        
        <Card
          title="Carousel Post Automation"
          description="Create engaging carousel posts with multiple images/videos"
          icon="🖼️🔄"
          isActive={true}
          to="/carousel-post"
        />
        
        <Card
          title="Auto Comment Reply"
          description="Automatically respond to comments with custom messages"
          icon="💬"
          isActive={false}
          isComingSoon={true}
        />
        
        <Card
          title="DM Auto Reply"
          description="Set up automated responses to direct messages"
          icon="✉️"
          isActive={false}
          isComingSoon={true}
        />
        
        <Card
          title="Analytics Dashboard"
          description="Track your Instagram performance and engagement metrics"
          icon="📈"
          isActive={false}
          isComingSoon={true}
        />
      </div>

      <div style={alertStyle}>
        <h3 style={alertTitleStyle}>⚠️ Important Requirements</h3>
        <ul style={requirementListStyle}>
          <li style={requirementItemStyle}>
            <span>🔹</span>
            <span>Your Instagram account must be a <strong>Business</strong> account</span>
          </li>
          <li style={requirementItemStyle}>
            <span>🔹</span>
            <span>Your Instagram must be connected to a <strong>Facebook Page</strong></span>
          </li>
          <li style={requirementItemStyle}>
            <span>🔹</span>
            <span>A <strong>Facebook Business account</strong> is required to manage assets</span>
          </li>
          <li style={requirementItemStyle}>
            <span>🔹</span>
            <span>Permissions must be granted in <strong>Meta Developer settings</strong></span>
          </li>
          <li style={requirementItemStyle}>
            <span>🚫</span>
            <span>Without these, posting and automation won't work</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
