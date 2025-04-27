import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Define custom renderers for various markdown elements
const MarkdownRenderer = ({ children, className = '' }) => {
  // Create GitHub-inspired dark theme based on oneDark
  const githubDarkTheme = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: '#0d1117', // GitHub dark background
      borderRadius: '0.5rem',
      padding: '1.5rem',
      margin: '1.8rem 0',
      overflow: 'auto',
      border: '1px solid #30363d', // GitHub dark border
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: 'none',
      textShadow: 'none',
      fontSize: '0.95rem',
      fontFamily: '"JetBrains Mono", SFMono-Regular, Consolas, Menlo, Monaco, "Liberation Mono", "Courier New", monospace',
      lineHeight: 1.6,
    },
    comment: {
      ...oneDark.comment,
      color: '#8b949e', // GitHub dark comment color
    },
    punctuation: {
      ...oneDark.punctuation,
      color: '#c9d1d9', // GitHub dark punctuation
    },
    tag: {
      ...oneDark.tag,
      color: '#7ee787', // GitHub dark tag color
    },
    'attr-name': {
      ...oneDark['attr-name'],
      color: '#79c0ff', // GitHub dark attribute color
    },
    'attr-value': {
      ...oneDark['attr-value'],
      color: '#a5d6ff', // GitHub dark attribute value color
    },
    string: {
      ...oneDark.string,
      color: '#a5d6ff', // GitHub dark string color
    },
    keyword: {
      ...oneDark.keyword,
      color: '#ff7b72', // GitHub dark keyword color
    },
    boolean: {
      ...oneDark.boolean,
      color: '#ff7b72',
    },
    number: {
      ...oneDark.number,
      color: '#f2cc60', // GitHub dark number color
    },
    'function-variable': {
      ...oneDark['function-variable'],
      color: '#d2a8ff', // GitHub dark function color
    },
    function: {
      ...oneDark.function,
      color: '#d2a8ff', // GitHub dark function color
    },
    'class-name': {
      ...oneDark['class-name'],
      color: '#7ee787', // GitHub dark class color
    },
    operator: {
      ...oneDark.operator,
      color: '#ff7b72',
    },
    builtin: {
      ...oneDark.builtin,
      color: '#79c0ff',
    },
    property: {
      ...oneDark.property,
      color: '#79c0ff',
    },
  };

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          // Custom code block renderer with syntax highlighting
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : 'text';
            
            if (!inline) {
              return (
                <div className="code-block-wrapper relative group">
                  <div className="code-block-header absolute top-0 right-0 px-4 py-2 text-xs text-gray-400 bg-gray-800/80 rounded-bl-lg">
                    <span className="language-label uppercase tracking-wider">{language}</span>
                  </div>
                  <SyntaxHighlighter
                    style={githubDarkTheme}
                    language={language}
                    PreTag="div"
                    showLineNumbers={language !== 'text'}
                    wrapLongLines={true}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              );
            }
            
            return (
              <code className="bg-[#1f2937] px-1 py-0.5 rounded text-sm text-[#79c0ff]" {...props}>
                {children}
              </code>
            );
          },
          
          // Custom headings with anchor links
          h1: ({ children, ...props }) => (
            <h1 className="scroll-mt-20" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="scroll-mt-20" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="scroll-mt-20" {...props}>
              {children}
            </h3>
          ),
          
          // Custom link renderer
          a: ({ node, href, children, ...props }) => (
            <a 
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-blue-500 hover:underline"
              {...props}
            >
              {children}
            </a>
          ),
          
          // Custom blockquote
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic bg-gray-800/30 py-1 rounded-r-md" {...props}>
              {children}
            </blockquote>
          ),
          
          // Tables with better styling
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-8 rounded-md border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-gray-800" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className="divide-y divide-gray-700 bg-gray-900/30" {...props}>
              {children}
            </tbody>
          ),
          th: ({ children, ...props }) => (
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" 
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-4 py-3 text-sm" {...props}>
              {children}
            </td>
          ),
          
          // Better styling for lists
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-6 my-4 space-y-2" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-6 my-4 space-y-2" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="pl-2" {...props}>
              {children}
            </li>
          ),
          
          // Better styling for horizontal rule
          hr: (props) => (
            <hr className="my-8 border-gray-700" {...props} />
          ),
          
          // Better styling for images
          img: ({ src, alt, ...props }) => (
            <div className="my-6">
              <img 
                src={src} 
                alt={alt || ''} 
                className="rounded-md max-w-full mx-auto border border-gray-700"
                loading="lazy"
                {...props}
              />
              {alt && <p className="text-center text-sm text-gray-500 mt-2">{alt}</p>}
            </div>
          ),
          
          // Strong text with better styling
          strong: ({ children, ...props }) => (
            <strong className="font-bold text-blue-300" {...props}>
              {children}
            </strong>
          ),
          
          // Emphasis with better styling
          em: ({ children, ...props }) => (
            <em className="italic text-yellow-300" {...props}>
              {children}
            </em>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer; 