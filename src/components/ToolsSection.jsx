import React, { useState, useEffect } from "react";
import { entries } from "../data/entries";
import ToolCard from "./ToolCard";

function ToolsSection() {
  const [search, setSearch] = useState("");
  const [selectVal, setSelectVal] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showContributeModal, setShowContributeModal] = useState(false);

  // Extract unique tags from entries
  let allTags = Array.from(new Set(entries.map((entry) => entry.tag))).sort();

  // Function to sort tools based on selected criteria
  const sortTools = (filteredEntries) => {
    switch (sortBy) {
      case 'az':
        return [...filteredEntries].sort((a, b) => 
          a.title.localeCompare(b.title)
        );
      case 'za':
        return [...filteredEntries].sort((a, b) => 
          b.title.localeCompare(a.title)
        );
      default:
        return filteredEntries;
    }
  };

  // Filter entries based on search and tag selection
  const filteredEntries = entries.filter((entry) => {
    const searchTerm = search.toLowerCase();
    const selectedTag = selectVal.toLowerCase();
    const titleMatches = entry.title.toLowerCase().includes(searchTerm);
    const descriptionMatches = entry.description && entry.description.toLowerCase().includes(searchTerm);
    const tagMatches = selectedTag === "" || entry.tag.toLowerCase().includes(selectedTag);
    
    return (titleMatches || descriptionMatches) && tagMatches;
  });

  // Sort the filtered entries
  const sortedEntries = sortTools(filteredEntries);

  // Sample entry for contribution example
  const sampleEntry = {
    title: "Your Tool Name",
    link: "https://your-tool-website.com",
    description: "A brief description of your tool and what it does",
    github: "yourusername/repo-name",
    tag: "Cluster Management"
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 w-full px-6 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col w-full justify-center items-center gap-6 mx-auto rounded-xl">
        <div className="w-full flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">
            Kubernetes Tools Collection
          </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl text-center md:text-left mb-6">
            Discover and explore the best tools for Kubernetes, containers, and cloud-native infrastructure
          </p>
          </div>
          <button
            onClick={() => setShowContributeModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 transition-colors mt-4 md:mt-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Contribute a Tool
          </button>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="search"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 placeholder-slate-500 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row w-full md:w-1/2 gap-4">
            {/* Category Dropdown */}
            <div className="w-full sm:w-2/3">
              <select
                className="w-full py-3 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectVal}
                onChange={(e) => setSelectVal(e.target.value)}
              >
                <option value="">All Categories</option>
                {allTags.map((tag, index) => (
                  <option key={index} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            
            {/* Sort Dropdown */}
            <div className="w-full sm:w-1/3">
              <select
                className="w-full py-3 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort by</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="w-full text-left text-slate-500 dark:text-slate-300 pb-4">
          Found {sortedEntries.length} tools
        </div>
        
        {/* Display message if no results */}
        {sortedEntries.length === 0 && (
          <div className="w-full flex flex-col items-center py-10 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700 p-8">
            <svg className="w-16 h-16 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-slate-700 dark:text-slate-300 text-xl font-medium">No results found</p>
            <p className="text-slate-500 text-base text-center mt-2">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
        
        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {sortedEntries.map((entry, index) => (
            <ToolCard 
              key={index} 
              title={entry.title} 
              link={entry.link} 
              description={entry.description} 
              github={entry.github} 
              tag={entry.tag}
            />
          ))}
        </div>
      </div>

      {/* Contribute Modal */}
      {showContributeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Contribute a Tool
              </h3>
              <button 
                onClick={() => setShowContributeModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">How to Contribute</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You can contribute to our tools collection by submitting a pull request to our GitHub repository. 
                  Follow these steps to add your tool:
                </p>
                <ol className="list-decimal pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Fork the <a href="https://github.com/kubernetesdaily/kubernetesdaily.github.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">repository</a></li>
                  <li>Edit the entries file in <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">src/data/entries.js</code></li>
                  <li>Add your tool entry in the appropriate section following the format below</li>
                  <li>Submit a pull request</li>
                </ol>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Entry Format</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Each tool entry should follow this format:
                </p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto mb-4">
                  <pre className="text-sm font-mono text-gray-800 dark:text-gray-200">{`{
  title: "Tool Name",
  link: "https://tool-website.com",
  description: "Brief description of the tool",
  github: "username/repo",  // or just "username" if the repo matches the username
  tag: "Category Name"
}`}</pre>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <span className="font-medium">All available categories:</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {allTags.map((tag, index) => (
                    <div key={index} className="bg-gray-100 dark:bg-gray-700 py-1 px-2 rounded-md text-sm text-gray-800 dark:text-gray-200">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Example Entry</h4>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm font-mono text-gray-800 dark:text-gray-200">{JSON.stringify(sampleEntry, null, 2)}</pre>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <a 
                  href="https://github.com/kubernetesdaily/kubernetesdaily.github.io/blob/main/CONTRIBUTING.md" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                  </svg>
                  View full contribution guidelines
                </a>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowContributeModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Close
                  </button>
                  <a 
                    href="https://github.com/kubernetesdaily/kubernetesdaily.github.io/tree/main/src/data" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    View Data Files
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToolsSection;
