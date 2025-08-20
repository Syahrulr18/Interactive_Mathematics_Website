import React from 'react';
import { BookOpen, CheckCircle, BarChart3, Gamepad2 } from 'lucide-react';
import NavButton from './NavButton';

const HomePage = ({ setCurrentPage }) => {
  const features = [
    {
      icon: BookOpen,
      title: 'Materi Pembelajaran',
      desc: 'Pelajari konsep matematika dengan penjelasan yang mudah dipahami',
      color: 'bg-blue-500',
      page: 'materi'
    },
    {
      icon: CheckCircle,
      title: 'Latihan Soal',
      desc: 'Uji pemahaman dengan soal-soal interaktif dan feedback langsung',
      color: 'bg-green-500',
      page: 'latihan'
    },
    {
      icon: BarChart3,
      title: 'Visualisasi Grafik',
      desc: 'Lihat representasi visual dari fungsi matematika secara interaktif',
      color: 'bg-purple-500',
      page: 'grafik'
    },
    {
      icon: Gamepad2,
      title: 'Mini Game',
      desc: 'Latih kemampuan hitung cepat dengan game yang menyenangkan',
      color: 'bg-orange-500',
      page: 'game'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
          Belajar Matematika
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Lebih Interaktif
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Platform pembelajaran matematika yang menggabungkan teori, latihan, visualisasi, dan permainan untuk pengalaman belajar yang menyenangkan
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => setCurrentPage(feature.page)}
            className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-indigo-200"
          >
            <div className={`${feature.color} rounded-2xl w-16 h-16 flex items-center justify-center mb-4 shadow-lg`}>
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
