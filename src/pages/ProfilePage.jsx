import React, { useEffect, useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      console.log('📦 Token from localStorage:', token);

      if (!token) {
        console.log('❌ No token found');
        setError('Token not found');
        return;
      }

      try {
        const res = await axios.get('/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('✅ Response from /user:', res.data);

        if (!res.data || Object.keys(res.data).length === 0) {
          console.log('⚠️ Response is empty');
          setError('User data is empty');
        } else {
          setUser(res.data);
        }
      } catch (err) {
        console.error('❌ Error in API call:', err.response?.data || err.message);
        setError('Unable to fetch profile.');
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-700 p-10 text-white flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full shadow-lg border border-white/10 dark:text-white dark:bg-gray-800/30">
       
           {/* Profile Image Centered */}
        <div className="flex justify-center mb-6">
          <img
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740" // ✅ must be placed inside /public for direct reference
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>
       
        <h1 className="text-3xl font-bold mb-6 text-center text-white drop-shadow">👤 My Profile</h1>

        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        {user ? (
          <div className="grid grid-cols-2 gap-y-4 text-sm px-4">
            <div className="font-semibold text-yellow-300 text-right pr-4">User ID:</div>
            <div className="text-left break-all">{user._id}</div>

            <div className="font-semibold text-yellow-300 text-right pr-4">Username:</div>
            <div className="text-left">{user.username}</div>

            <div className="font-semibold text-yellow-300 text-right pr-4">Email:</div>
            <div className="text-left">{user.email}</div>

            <div className="font-semibold text-yellow-300 text-right pr-4">Created At:</div>
            <div className="text-left">{new Date(user.createdAt).toLocaleString()}</div>

           
           
          </div>
        ) : (
          <p className="text-gray-200 text-center">Loading or No data found...</p>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2 rounded bg-indigo-500 hover:bg-indigo-600 transition text-white"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
