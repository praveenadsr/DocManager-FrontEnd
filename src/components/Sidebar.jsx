import React from 'react';

export default function Sidebar({ documents, handleDelete }) {
  return (
    <aside className="w-72 bg-white text-black dark:bg-gray-800 dark:text-white shadow-lg p-5 overflow-auto">
      <h2 className="text-xl font-bold text-indigo-600 dark:text-yellow-400 mb-4">📂 Uploaded Files</h2>
      {documents.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No files yet.</p>
      ) : (
        <ul className="space-y-3">
          {documents.map((doc) => (
            <li key={doc._id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md">
              <span className="truncate text-sm">{doc.name}</span>
              <div className="flex gap-2">
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 text-xs hover:underline"
                >
                  View
                </a>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
