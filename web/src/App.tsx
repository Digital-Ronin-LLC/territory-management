import React from 'react';
import './App.css';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </div>
  );
}

export default App;
