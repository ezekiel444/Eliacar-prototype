import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import ChatBot from './components/ChatBot';
import ContactBar from './components/ContactBar';
import { VehicleProvider } from './context/VehicleContext';

function App() {
  return (
    <Router>
      <VehicleProvider>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
            </Routes>
          </main>
          <ContactBar />
          <Footer />
          <ChatBot />
        </div>
      </VehicleProvider>
    </Router>
  );
}

export default App;