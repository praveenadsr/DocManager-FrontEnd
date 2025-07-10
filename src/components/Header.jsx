import React, { useState, useEffect } from 'react';
import ProfileDropdown from './ProfileDropdown';
import { useNavigate } from 'react-router-dom';

export default function Header({ onLogout }) {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate(); // ✅ Correct placement

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem(
      'theme',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleProfileClick = () => {
    navigate('/profile'); // ✅ Navigate to profile page
    setShowProfile(false);
  };

  const handleSettingsClick = () => {
    alert('⚙️ Settings clicked! (You can open settings modal)');
    setShowProfile(false);
  };

  return (
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold text-white dark:text-yellow-400">📁 Document Dashboard</h1>
      <div className="flex items-center gap-4 relative">
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 bg-yellow-400 dark:bg-indigo-700 text-black dark:text-white rounded hover:opacity-90 transition"
        >
          Toggle Mode
        </button>

        {/* Avatar */}
        <div className="relative">
          <img
            onClick={() => setShowProfile(!showProfile)}
            src="https://api.dicebear.com/6.x/bottts/svg?seed=Gopi"
            alt="Profile"
            className="w-9 h-9 rounded-full cursor-pointer border-2 border-white hover:ring-2 hover:ring-indigo-400"
          />
          {showProfile && (
            <ProfileDropdown
              onLogout={onLogout}
              onProfileClick={handleProfileClick}
              onSettingsClick={handleSettingsClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
