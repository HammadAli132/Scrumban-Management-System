import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  GitBranch, 
  GitCommit, 
  FileCode, 
  Folder, 
  ChevronRight,
  Upload,
  Check,
  X
} from 'lucide-react';


const dummyFiles = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    path: '/src',
    lastModified: '2024-03-10T10:00:00Z'
  },
  {
    id: '2',
    name: 'package.json',
    type: 'file',
    path: '/package.json',
    lastModified: '2024-03-09T15:30:00Z',
    commitMessage: 'Update dependencies',
    status: 'approved'
  },
  {
    id: '3',
    name: 'README.md',
    type: 'file',
    path: '/README.md',
    lastModified: '2024-03-08T09:15:00Z',
    commitMessage: 'Update documentation',
    status: 'pending'
  }
];

export default function Repository() {
  const { projectid } = useParams();
  const [files, setFiles] = useState(dummyFiles);
  const [currentPath, setCurrentPath] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const getCurrentFiles = () => {
    return files;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newFile = {
      id: Date.now().toString(),
      name: file.name,
      type: 'file',
      path: '/' + [...currentPath, file.name].join('/'),
      lastModified: new Date().toISOString(),
      commitMessage: 'Initial commit',
      status: 'pending'
    };

    setFiles([...files, newFile]);
    setShowUploadModal(false);
  };

  const handleStatusChange = (fileId, status) => {
    setFiles(files.map(file => 
      file.id === fileId ? { ...file, status } : file
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-400';
      case 'rejected':
        return 'text-red-400';
      case 'pending':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8">
      <div className="mb-6">
        <Link to={`/project/${projectid}`} className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-4">
          <ArrowLeft size={16} className="mr-2" /> Back to Project
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Repository</h1>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Upload size={16} />
            Upload File
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to={`/project/${projectid}/repository/${"2"}`} className="hover:text-white">
          Repository
        </Link>
        {currentPath.map((path, index) => (
          <React.Fragment key={path}>
            <ChevronRight size={14} />
            <button
              onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
              className="hover:text-white"
            >
              {path}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* File List */}
      <div className="bg-[#1c1c1c] rounded-xl shadow-lg border border-[#2e2d2d]">
        <div className="px-6 py-4 border-b border-[#2e2d2d]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <GitBranch size={16} className="text-gray-400" />
              <span className="text-white">main</span>
            </div>
            <div className="flex items-center gap-2">
              <GitCommit size={16} className="text-gray-400" />
              <span className="text-gray-400">Last commit: 2 hours ago</span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#2e2d2d]">
          {getCurrentFiles().map((file) => (
            <div
              key={file.id}
              className="px-6 py-4 flex items-center justify-between hover:bg-[#252525] transition-colors"
            >
              <div className="flex items-center gap-3">
                {file.type === 'folder' ? (
                  <Folder size={20} className="text-blue-400" />
                ) : (
                  <FileCode size={20} className="text-gray-400" />
                )}
                <Link
                  to={file.type === 'folder' ? '#' : `/project/${projectid}/repository/${"1"}/file/${file.id}`}
                  onClick={file.type === 'folder' ? () => setCurrentPath([...currentPath, file.name]) : undefined}
                  className="text-white hover:text-blue-400 font-medium"
                >
                  {file.name}
                </Link>
                {file.commitMessage && (
                  <span className="text-sm text-gray-400">{file.commitMessage}</span>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                {file.status && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusChange(file.id, 'approved')}
                      className={`p-1 rounded hover:bg-[#2e2d2d] ${
                        file.status === 'approved' ? 'text-green-400' : 'text-gray-400'
                      }`}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => handleStatusChange(file.id, 'rejected')}
                      className={`p-1 rounded hover:bg-[#2e2d2d] ${
                        file.status === 'rejected' ? 'text-red-400' : 'text-gray-400'
                      }`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                <span className="text-sm text-gray-400">
                  {new Date(file.lastModified).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-[#1c1c1c] rounded-xl max-w-md w-full animate-fadeIn shadow-2xl border border-[#2e2d2d]">
            <div className="flex justify-between items-center p-6 border-b border-[#2e2d2d]">
              <h3 className="text-xl font-semibold text-white">Upload File</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <input
                type="file"
                onChange={handleFileUpload}
                className="block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}