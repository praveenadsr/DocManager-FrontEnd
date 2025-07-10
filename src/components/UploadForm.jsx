import React from 'react';

export default function UploadForm({ formData, handleChange, handleUpload, error, success, loading }) {
  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-lg p-6 text-black dark:text-white max-w-2xl mx-auto border border-white/10 transition-all">
      {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}
      {success && <p className="text-green-600 mb-3 text-sm">{success}</p>}

      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter document title"
          className="w-full px-4 py-2 border rounded border-gray-300/40 backdrop-blur-md bg-white/30 dark:bg-gray-700/30 text-black dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="w-full text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
