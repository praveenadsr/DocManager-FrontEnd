import React, { useState, useEffect } from 'react';
import axios from '../api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UploadForm from '../components/UploadForm';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage({ onLogout }) {
  const [formData, setFormData] = useState({ name: '', file: null });
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout?.();
    navigate('/login');
  };

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/documents', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(res.data);
    } catch (err) {
      setError('Failed to fetch documents');
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, name: e.target.value });
    }
    setError('');
    setSuccess('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.file) {
      setError('Please enter a name and select a file');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('file', formData.file);

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('/documents', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Document uploaded successfully ✅');
      setFormData({ name: '', file: null });
      fetchDocuments();
    } catch (err) {
      setError(err.response?.data?.msg || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Document deleted successfully ✅');
      fetchDocuments();
    } catch (err) {
      setError(err.response?.data?.msg || 'Delete failed');
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-600 to-purple-700 text-white dark:bg-gray-900 dark:text-white">
      <Sidebar documents={documents} handleDelete={handleDelete} />
      <main className="flex-1 p-10">
        <Header onLogout={handleLogout} />
        <UploadForm
          formData={formData}
          handleChange={handleChange}
          handleUpload={handleUpload}
          error={error}
          success={success}
          loading={loading}
        />
      </main>
    </div>
  );
}
