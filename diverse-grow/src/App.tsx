import React, { useState } from 'react';
import './index.css';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import FarmManagement from './components/FarmManagement';
import Marketplace from './components/Marketplace';
import EducationHub from './components/EducationHub';
import CooperativeHub from './components/CooperativeHub';
import type { Screen } from './types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':        return <Dashboard onNavigate={setScreen} />;
      case 'farm-management':  return <FarmManagement />;
      case 'marketplace':
      case 'marketplace-post': return <Marketplace onNavigate={setScreen} />;
      case 'education':
      case 'education-article':return <EducationHub />;
      case 'cooperative':      return <CooperativeHub />;
      default:                 return <Dashboard onNavigate={setScreen} />;
    }
  };

  return (
    <Layout currentScreen={screen} onNavigate={setScreen}>
      {renderScreen()}
    </Layout>
  );
}
