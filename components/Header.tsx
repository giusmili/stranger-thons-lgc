import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="logo-stack">
        <h1 className="logo-title stranger-text title-fade">
          STRANGER THINGS
        </h1>
        <div className="logo-divider">
           <span className="divider-line"></span>
        </div>
        
        <span className="logo-subtitle stranger-text">
          LGC
        </span>
      </div>
    </header>
  );
};
