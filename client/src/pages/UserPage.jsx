import React from 'react';
import WorkforceSidebar from '../components/WorkforceSidebar';
import MainContent from '../components/MainContent';
import './UserPage.css'; // Pour les styles spécifiques de la page Dashboard

const UserPage = () => {
  return (
    <div className="UserPage">
      <div className="sidebar">
        <WorkforceSidebar tab="manage-workforce" />
      </div>
      <div className="content">
        <MainContent />
      </div>
    </div>
  );
};

export default UserPage;
