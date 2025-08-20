import React, { useState } from 'react';
import { Calculator, BookOpen, BarChart3, Gamepad2, Home, Trophy, Timer, CheckCircle, XCircle } from 'lucide-react';

// Import komponen-komponen dari folder 'components'
import HomePage from './components/HomePage';
import MateriPage from './components/MateriPage';
import LatihanSoalPage from './components/LatihanSoalPage';
import GrafikInteraktifPage from './components/GrafikInteraktifPage';
import MiniGamePage from './components/MiniGamePage';
import NavButton from './components/NavButton';

// Main App Component with Navigation
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'materi': return <MateriPage />;
      case 'latihan': return <LatihanSoalPage />;
      case 'grafik': return <GrafikInteraktifPage />;
      case 'game': return <MiniGamePage />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b-4 border-indigo-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-gray-800">BerMatematikan</span>
            </div>
            <div className="flex space-x-1">
              <NavButton
                icon={Home}
                text="Beranda"
                onClick={() => setCurrentPage('home')}
                active={currentPage === 'home'}
              />
              <NavButton
                icon={BookOpen}
                text="Materi"
                onClick={() => setCurrentPage('materi')}
                active={currentPage === 'materi'}
              />
              <NavButton
                icon={CheckCircle}
                text="Latihan"
                onClick={() => setCurrentPage('latihan')}
                active={currentPage === 'latihan'}
              />
              <NavButton
                icon={BarChart3}
                text="Grafik"
                onClick={() => setCurrentPage('grafik')}
                active={currentPage === 'grafik'}
              />
              <NavButton
                icon={Gamepad2}
                text="Game"
                onClick={() => setCurrentPage('game')}
                active={currentPage === 'game'}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
