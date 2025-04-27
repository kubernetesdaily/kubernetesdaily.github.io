import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function ModelLeaderboard() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await fetch('/data/model.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch models: ${response.status}`);
        }
        const data = await response.json();
        setModels(data); // Show all models instead of only top 5
        setLoading(false);
      } catch (err) {
        console.error("Error loading model data:", err);
        setError(err.message);
        setLoading(false);
      }
    }
    
    fetchModels();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-red-500 p-4 rounded bg-red-50 dark:bg-red-900/20 text-center">
        Error loading model data: {error}
      </div>
    );
  }
  
  return (
    <div className="w-full overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 uppercase">
            <tr>
              <th className="px-6 py-3 rounded-l-lg">Rank</th>
              <th className="px-6 py-3">Model</th>
              <th className="px-6 py-3">Maintainer</th>
              <th className="px-6 py-3">Size</th>
              <th className="px-6 py-3">Score</th>
              <th className="px-6 py-3 rounded-r-lg text-right">Downloads</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, index) => (
              <tr 
                key={index} 
                className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 font-medium">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  {model["Model Name"]}
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                  {model.Maintainer}
                </td>
                <td className="px-6 py-4">
                  <span className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded">
                    {model.Size}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-full max-w-24 rounded-full bg-slate-200 dark:bg-slate-700 mr-2">
                      <div 
                        className="h-2.5 rounded-full bg-indigo-600" 
                        style={{ width: `${parseFloat(model.Score) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-600 dark:text-slate-400">{model.Score}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-400">
                  {parseInt(model.Downloads).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ModelLeaderboard; 