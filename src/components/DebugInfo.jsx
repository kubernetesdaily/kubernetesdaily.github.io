import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';

function DebugInfo({ show = false }) {
  const [fetchResults, setFetchResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [timestamp, setTimestamp] = useState(new Date().toISOString());

  // Test paths to check
  const testPaths = [
    '/blog/index.json',
    '/blog.json',
    './blog/index.json',
    './blog.json',
    '/blog/1-cloud-native-tools-collection.md',
    '/data/labs.json'
  ];

  useEffect(() => {
    if (!show) return;

    const checkPaths = async () => {
      setIsLoading(true);
      const results = {};

      for (const path of testPaths) {
        try {
          const response = await fetch(path, { cache: 'no-store' });
          results[path] = {
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            type: response.type
          };

          // Try to read the content
          try {
            if (path.endsWith('.json')) {
              const data = await response.clone().json();
              results[path].content = JSON.stringify(data).substring(0, 100) + '...';
            } else {
              const text = await response.clone().text();
              results[path].content = text.substring(0, 100) + '...';
            }
          } catch (contentError) {
            results[path].contentError = contentError.message;
          }
        } catch (err) {
          results[path] = {
            error: err.message,
            stack: err.stack
          };
        }
      }

      setFetchResults(results);
      setIsLoading(false);
    };

    checkPaths();
  }, [show, timestamp]);

  if (!show) return null;

  return (
    <Card className="p-6 mt-8 bg-red-900/20 border-red-900">
      <h2 className="text-xl font-bold mb-4 text-red-400">Debug Information</h2>
      
      <div className="mb-4">
        <button 
          onClick={() => {
            setTimestamp(new Date().toISOString());
            setIsLoading(true);
          }}
          className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700 text-sm"
        >
          Refresh Tests
        </button>
      </div>

      {isLoading ? (
        <div className="animate-pulse text-gray-400">Testing paths...</div>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-red-300">Environment Info:</h3>
            <div className="bg-black/30 p-2 rounded text-xs font-mono overflow-auto max-h-20">
              <p>URL: {window.location.href}</p>
              <p>Base URL: {window.location.origin}</p>
              <p>Pathname: {window.location.pathname}</p>
              <p>Timestamp: {timestamp}</p>
            </div>
          </div>

          {testPaths.map(path => (
            <div key={path} className="border border-red-800/50 rounded p-3">
              <h3 className="font-mono text-sm mb-1 text-red-300">{path}</h3>
              {fetchResults[path] ? (
                fetchResults[path].error ? (
                  <div className="bg-red-950 p-2 rounded text-xs font-mono text-red-300 overflow-auto max-h-24">
                    Error: {fetchResults[path].error}
                  </div>
                ) : (
                  <div className="bg-black/30 p-2 rounded text-xs font-mono overflow-auto max-h-32">
                    <p>Status: {fetchResults[path].status} {fetchResults[path].statusText}</p>
                    <p>Success: {fetchResults[path].ok ? 'Yes' : 'No'}</p>
                    <p>Type: {fetchResults[path].type}</p>
                    {fetchResults[path].content && (
                      <div>
                        <p className="mt-2 text-gray-400">Preview:</p>
                        <p className="text-green-400 whitespace-pre-wrap">{fetchResults[path].content}</p>
                      </div>
                    )}
                    {fetchResults[path].contentError && (
                      <p className="text-red-400">Content Error: {fetchResults[path].contentError}</p>
                    )}
                  </div>
                )
              ) : (
                <div className="text-gray-400 text-xs">No data</div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-xs text-red-400">
        <p>This debug panel is only visible during development and troubleshooting.</p>
      </div>
    </Card>
  );
}

export default DebugInfo; 