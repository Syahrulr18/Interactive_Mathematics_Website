import React from 'react';

const NavButton = ({ icon: Icon, text, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      active
        ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
    }`}
  >
    <Icon size={18} />
    <span className="font-medium">{text}</span>
  </button>
);

export default NavButton;