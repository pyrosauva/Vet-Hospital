import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Patients } from './components/Patients';
import { Appointments } from './components/Appointments';
import { Staff } from './components/Staff';
import { Inventory } from './components/Inventory';
import { Billing } from './components/Billing';
import { Login } from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAuthenticated } = useAuth();

  const renderContent = () => {
    if (!isAuthenticated) {
      return <Login />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <Patients />;
      case 'appointments':
        return <Appointments />;
      case 'staff':
        return <Staff />;
      case 'inventory':
        return <Inventory />;
      case 'billing':
        return <Billing />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </Layout>
    </AuthProvider>
  );
}

export default App;