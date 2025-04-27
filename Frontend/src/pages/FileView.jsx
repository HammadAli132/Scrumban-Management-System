import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, FileText, Calendar, User, Code } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlock from '@tiptap/extension-code';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';


const dummyFile = {
  id: '1',
  name: 'example.html',
  content: `<!DOCTYPE html>
<html>
<head>
  <title>Example Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello World</h1>
    <p>This is an example HTML file</p>
    <script>
      console.log('Page loaded');
      // This is a comment
      function example() {
        return "This is JavaScript";
      }
    </script>
  </div>
</body>
</html>`,
  language: 'html',
  lastModified: '2024-03-10T10:00:00Z',
  author: 'John Smith'
};

// Helper function to escape HTML
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export default function FileView() {
  const { projectid, fileId } = useParams();
  const [copied, setCopied] = React.useState(false);

  const editor = useEditor({
    extensions: [
        StarterKit,
        CodeBlock.configure({
          HTMLAttributes: {
            class: 'hljs',
          },
          languageClassPrefix: 'language-',
        }),
      ],
    content: `
      <pre><code class="language-${dummyFile.language}">${escapeHtml(dummyFile.content)}</code></pre>
    `,
    editable: false,
  });

  React.useEffect(() => {
    if (editor) {
      editor.view.dom.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [editor]);

  const handleCopy = () => {
    navigator.clipboard.writeText(dummyFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format date nicely
  const formattedDate = new Date(dummyFile.lastModified).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8">
      <div className="mb-6">
        <Link 
          to={`/project/${projectid}/repository/${"2"}`} 
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4 transition-colors"
        >
          <ArrowLeft size={18} className="mt-0.5" /> 
          <span>Back to Repository</span>
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-blue-400" />
            <h1 className="text-2xl font-bold text-white">{dummyFile.name}</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <Code size={16} className="text-purple-400" />
            <span>{dummyFile.language}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-yellow-400" />
            <span>Last modified: {formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} className="text-green-400" />
            <span>Author: {dummyFile.author}</span>
          </div>
        </div>
      </div>

      {/* Modern code editor container */}
      <div className="bg-[#1c1c1c] rounded-lg overflow-hidden border border-[#2e2d2d] shadow-lg">
        {/* Editor toolbar */}
        <div className="flex items-center justify-between bg-[#242424] px-4 py-2 border-b border-[#2e2d2d]">
          <div className="flex items-center gap-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-4 text-sm text-gray-400">{dummyFile.name}</span>
          </div>
          
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#2e2d2d] hover:bg-[#2e2d2d] rounded-md text-gray-300 hover:text-white transition-colors text-sm"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy code</span>
              </>
            )}
          </button>
        </div>
        
        {/* Code content with line numbers */}
        <div className="relative">
          <div className="overflow-x-auto">
            <EditorContent 
              editor={editor} 
              className="prose prose-invert max-w-nonefocus:outline-none font-mono"
              style={{
                fontSize: '0.9rem',
                lineHeight: '1.5',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}