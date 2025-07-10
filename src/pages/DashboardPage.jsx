import React, { useState, useEffect } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage({ onLogout }) {
  const [formData, setFormData] = useState({ name: '', file: null });
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout?.(); // ✅ Update app state
    navigate('/login');
  };

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Token not found");

      const res = await axios.get('/documents', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
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
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDocuments();
    } catch {
      setError('Failed to delete');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-4 text-white">
      <div className="max-w-2xl mx-auto bg-white text-black rounded-2xl shadow-lg p-8 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">📁 Document Dashboard</h2>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

        <form onSubmit={handleUpload} className="space-y-4 mb-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter document title"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full text-sm text-gray-600"
          />
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Upload
          </button>
        </form>

        <h3 className="text-lg font-semibold mb-3">📄 Uploaded Documents</h3>
        {documents.length === 0 ? (
          <div className="text-center py-8">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-folder-7081401-5749253.png"
              alt="empty"
              className="w-32 mx-auto"
            />
            <p className="text-gray-500 mt-3 text-sm">
              No documents uploaded yet. Start by uploading a file above.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {documents.map((doc) => (
              <li
                key={doc._id}
                className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                    alt="file"
                    className="w-6 h-6"
                  />
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-gray-500">Uploaded file</p>
                  </div>
                </div>
                <div className="flex gap-4">
               <a
  href={`http://localhost:5000/${doc.filePath.replace(/\\/g, '/')}`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm text-indigo-600 hover:underline font-medium"
>
  View
</a>

                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="text-sm text-red-500 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
