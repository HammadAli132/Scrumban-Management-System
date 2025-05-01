import React, { useState, useEffect, useRef } from 'react';
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
  X,
  Code,
  File,
  FilePlus2,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // Import a syntax highlighting theme

// Define sample data (in a real app, you would fetch this from your API)
const sampleRepositories = [
  { _id: "1", name: "main-repo", projectId: "123" },
  { _id: "2", name: "api-repo", projectId: "123" }
];

const sampleCommits = [
  {
    _id: "1",
    message: "Initial commit",
    hash: "a1b2c3d4",
    fileName: "index.js",
    fileContent: "console.log('Hello world');",
    status: "approved",
    userId: "user1",
    repositoryId: "1",
    createdAt: "2024-05-01T10:30:00Z"
  },
  {
    _id: "2",
    message: "Add user authentication",
    hash: "e5f6g7h8",
    fileName: "auth.js",
    fileContent: "function authenticate() { return true; }",
    status: "pending",
    userId: "user2",
    repositoryId: "1",
    createdAt: "2024-05-01T15:45:00Z"
  },
  {
    _id: "3",
    message: "Fix navigation bug",
    hash: "i9j0k1l2",
    fileName: "navigation.js",
    fileContent: "export default function Navigation() { return <nav></nav>; }",
    status: "rejected",
    userId: "user1",
    repositoryId: "1",
    createdAt: "2024-05-02T09:15:00Z"
  },
  {
    _id: "4",
    message: "Update styles",
    hash: "m3n4o5p6",
    fileName: "styles.css",
    fileContent: "body { background: #121212; }",
    status: "pending",
    userId: "user3",
    repositoryId: "1",
    createdAt: "2024-05-02T11:20:00Z"
  }
];

// Language detection for syntax highlighting
const getLanguageFromFileName = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  const extensionMap = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    html: 'html',
    css: 'css',
    json: 'json',
    md: 'markdown',
    py: 'python',
    rb: 'ruby',
    php: 'php',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    cs: 'csharp',
    go: 'go',
    rs: 'rust',
    swift: 'swift',
    kt: 'kotlin'
  };
  
  return extensionMap[extension] || 'plaintext';
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

// File preview component with syntax highlighting
const FilePreview = ({ file, language }) => {
  const codeRef = useRef(null);
  
  useEffect(() => {
    if (codeRef.current && file) {
      const highlightedCode = hljs.highlight(file, { 
        language: language || 'plaintext',
        ignoreIllegals: true 
      }).value;
      
      codeRef.current.innerHTML = highlightedCode;
    }
  }, [file, language]);

  return (
    <div className="bg-[#0d1117] rounded-md p-4 font-mono text-sm overflow-x-auto max-h-64 overflow-y-auto">
      <pre className="hljs">
        <code ref={codeRef} className={`language-${language || 'plaintext'}`}></code>
      </pre>
    </div>
  );
};

// Status badge component
const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending':
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 size={14} className="mr-1.5" />;
      case 'rejected':
        return <XCircle size={14} className="mr-1.5" />;
      case 'pending':
      default:
        return <Clock size={14} className="mr-1.5" />;
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center border ${getStatusStyles()}`}>
      {getStatusIcon()}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Custom styles for syntax highlighting
const syntaxHighlightingStyles = `
  .hljs {
    color: #e9e9e9;
    background: #0d1117;
  }
  
  .hljs-keyword {
    color: #ff7b72;
  }
  
  .hljs-built_in {
    color: #ffa657;
  }
  
  .hljs-type {
    color: #ffa657;
  }
  
  .hljs-literal {
    color: #79c0ff;
  }
  
  .hljs-number {
    color: #79c0ff;
  }
  
  .hljs-string {
    color: #a5d6ff;
  }
  
  .hljs-regexp {
    color: #a5d6ff;
  }
  
  .hljs-symbol {
    color: #a5d6ff;
  }
  
  .hljs-title {
    color: #d2a8ff;
  }
  
  .hljs-attr {
    color: #79c0ff;
  }
  
  .hljs-selector-id {
    color: #ffa657;
  }
  
  .hljs-selector-class {
    color: #ffa657;
  }
  
  .hljs-selector-attr {
    color: #ffa657;
  }
  
  .hljs-selector-pseudo {
    color: #79c0ff;
  }
  
  .hljs-template-tag {
    color: #7ee787;
  }
  
  .hljs-template-variable {
    color: #7ee787;
  }
  
  .hljs-variable {
    color: #e9e9e9;
  }
  
  .hljs-comment {
    color: #8b949e;
  }
  
  .hljs-operator {
    color: #ff7b72;
  }
  
  .hljs-function {
    color: #d2a8ff;
  }
`;

export default function Repository() {
  const { projectid } = useParams();
  const [commits, setCommits] = useState(sampleCommits);
  const [currentPath, setCurrentPath] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [fileLanguage, setFileLanguage] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [currentRepository, setCurrentRepository] = useState(sampleRepositories[0]);
  const [showFileDetails, setShowFileDetails] = useState(null);
  
  // In real app, you'd fetch this from your API based on logged in user
  const user = JSON.parse(localStorage.getItem('user') || '{"_id":"user1","isProjectOwner":true}');
  
  // Check if user is the project owner (in real app, fetch project details and check)
  const isProjectOwner = user?.isProjectOwner === true;

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setFileToUpload(file);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result;
      setFilePreview(content);
      const language = getLanguageFromFileName(file.name);
      setFileLanguage(language);
    };
    
    reader.readAsText(file);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    
    if (!fileToUpload || !commitMessage.trim()) return;
    
    setIsUploading(true);
    
    // Simulating upload delay
    setTimeout(() => {
      const newCommit = {
        _id: Math.random().toString(36).substring(2, 15),
        message: commitMessage,
        hash: Math.random().toString(36).substring(2, 10),
        fileName: fileToUpload.name,
        fileContent: filePreview,
        status: 'pending',
        userId: user._id,
        repositoryId: currentRepository._id,
        createdAt: new Date().toISOString()
      };
      
      setCommits([newCommit, ...commits]);
      setIsUploading(false);
      setShowUploadModal(false);
      setFileToUpload(null);
      setFilePreview('');
      setCommitMessage('');
    }, 1000);
  };

  const handleStatusChange = (commitId, newStatus) => {
    // In a real app, you would call your API to update the status
    setCommits(
      commits.map(commit => 
        commit._id === commitId ? { ...commit, status: newStatus } : commit
      )
    );
  };

  const toggleFileDetails = (commitId) => {
    if (showFileDetails === commitId) {
      setShowFileDetails(null);
    } else {
      setShowFileDetails(commitId);
    }
  };

  useEffect(() => {
    // Apply our custom syntax highlighting styles
    const styleElement = document.createElement('style');
    styleElement.textContent = syntaxHighlightingStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8">
      <div className="mb-6">
        <Link to={`/project/${projectid}`} className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-4">
          <ArrowLeft size={16} className="mr-2" /> Back to Project
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{currentRepository.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <GitBranch size={16} className="text-gray-400" />
                <span className="text-gray-300">main</span>
              </div>
              <div className="flex items-center gap-2">
                <GitCommit size={16} className="text-gray-400" />
                <span className="text-gray-400">
                  {commits.length > 0 
                    ? `Last commit: ${formatDate(commits[0].createdAt)}` 
                    : 'No commits yet'}
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
          >
            <FilePlus2 size={16} />
            Add File
          </button>
        </div>
      </div>

      {/* File List */}
      <div className="bg-[#1c1c1c] rounded-xl shadow-lg border border-[#2e2d2d] mb-8">
        <div className="px-6 py-4 border-b border-[#2e2d2d] flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Files</h2>
          <div className="text-sm text-gray-400">
            {commits.length} {commits.length === 1 ? 'file' : 'files'}
          </div>
        </div>

        {commits.length === 0 ? (
          <div className="p-12 text-center">
            <File size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No files yet</h3>
            <p className="text-gray-400 mb-6">Upload your first file to get started</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Upload size={16} />
              Upload File
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#2e2d2d]">
            {commits.map((commit) => (
              <div key={commit._id} className="flex flex-col">
                <div
                  className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-[#252525] transition-colors cursor-pointer"
                  onClick={() => toggleFileDetails(commit._id)}
                >
                  <div className="flex items-center gap-3 mb-2 md:mb-0">
                    <FileCode size={20} className="text-blue-400 flex-shrink-0" />
                    <div>
                      <div className="text-white font-medium hover:text-blue-400">
                        {commit.fileName}
                      </div>
                      <div className="text-sm text-gray-400 mt-0.5">{commit.message}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-4">
                    <StatusBadge status={commit.status} />
                    
                    <div className="text-sm text-gray-400">
                      {formatDate(commit.createdAt)}
                    </div>
                    
                    {isProjectOwner && commit.status === 'pending' && (
                      <div className="flex items-center gap-2 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(commit._id, 'approved');
                          }}
                          className="p-1.5 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors"
                          title="Approve"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(commit._id, 'rejected');
                          }}
                          className="p-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Reject"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* File preview when expanded */}
                {showFileDetails === commit._id && (
                  <div className="px-6 py-4 bg-[#151515] border-t border-[#2e2d2d]">
                    <div className="mb-3 flex items-center gap-2">
                      <Code size={16} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">File Content</span>
                    </div>
                    <FilePreview 
                      file={commit.fileContent} 
                      language={getLanguageFromFileName(commit.fileName)} 
                    />
                    <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
                      <span className="font-mono">#{commit.hash}</span>
                      <span>•</span>
                      <span>By User {commit.userId}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-[#1c1c1c] rounded-xl max-w-2xl w-full animate-fadeIn shadow-2xl border border-[#2e2d2d]">
            <div className="flex justify-between items-center p-6 border-b border-[#2e2d2d]">
              <h3 className="text-xl font-semibold text-white">Add New File</h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setFileToUpload(null);
                  setFilePreview('');
                  setCommitMessage('');
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleFileUpload} className="p-6">
              {!fileToUpload ? (
                <div 
                  className="border-2 border-dashed border-[#2e2d2d] rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-[#161616]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      const fakEvent = { target: { files: [file] } };
                      handleFileChange(fakEvent);
                    }
                  }}
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".js,.jsx,.ts,.tsx,.html,.css,.json,.md,.py,.php,.java,.c,.cpp,.cs,.go,.rb"
                  />
                  <Upload size={36} className="mx-auto text-gray-500 mb-4" />
                  <h4 className="text-white text-lg font-medium mb-2">Drop your file here</h4>
                  <p className="text-gray-400 mb-2">or click to browse</p>
                  <p className="text-gray-500 text-sm">
                    Supported file types: JavaScript, TypeScript, HTML, CSS, JSON, Markdown, etc.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileCode size={18} className="text-blue-400" />
                        <h4 className="text-white font-medium">{fileToUpload.name}</h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFileToUpload(null);
                          setFilePreview('');
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="bg-[#0d1117] rounded-lg border border-[#30363d] overflow-hidden">
                      <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-2 flex items-center">
                        <div className="rounded-full w-3 h-3 bg-red-500 mr-2"></div>
                        <div className="rounded-full w-3 h-3 bg-yellow-500 mr-2"></div>
                        <div className="rounded-full w-3 h-3 bg-green-500 mr-2"></div>
                        <div className="text-gray-400 text-xs ml-2">{fileToUpload.name}</div>
                      </div>
                      <FilePreview file={filePreview} language={fileLanguage} />
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <span className="px-2 py-1 rounded bg-[#0d1117] border border-[#30363d]">{fileLanguage}</span>
                      <span>{fileToUpload.size} bytes</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="commit-message" className="block text-gray-300 mb-2 font-medium">
                      Commit Message
                    </label>
                    <input
                      id="commit-message"
                      type="text"
                      value={commitMessage}
                      onChange={(e) => setCommitMessage(e.target.value)}
                      className="w-full bg-[#161616] border border-[#2e2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your changes..."
                      required
                    />
                  </div>
                </>
              )}
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setFileToUpload(null);
                    setFilePreview('');
                    setCommitMessage('');
                  }}
                  className="px-4 py-2 rounded-lg border border-[#2e2d2d] text-gray-300 hover:bg-[#252525] transition-colors"
                >
                  Cancel
                </button>
                {fileToUpload && (
                  <button
                    type="submit"
                    disabled={isUploading || !commitMessage.trim()}
                    className={`px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2 ${
                      isUploading || !commitMessage.trim()
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-blue-700'
                    } transition-colors`}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        Commit File
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}