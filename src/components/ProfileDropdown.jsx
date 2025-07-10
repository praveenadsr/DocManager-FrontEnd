import React from 'react';

export default function ProfileDropdown({ onLogout, onProfileClick, onSettingsClick }) {
  return (
    <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg w-48 z-50 animate-fade-in">
      <ul className="text-sm">
        <li
          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          onClick={onProfileClick}
        >
          My Profile
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          onClick={onSettingsClick}
        >
          Settings
        </li>
        <li
          className="px-4 py-2 hover:bg-red-100 dark:hover:bg-red-800 text-red-500 dark:text-red-400 cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}
