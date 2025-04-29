import React, { useState, useEffect } from 'react';

const DockerImages = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/data/popular_docker_images.csv');
        const csvText = await response.text();
        
        // Parse CSV (skip header row)
        const rows = csvText.split('\n').slice(1);
        const parsedImages = rows
          .filter(row => row.trim()) // Filter out empty rows
          .map(row => {
            const [name, pullCount] = row.split(',');
            // Categorize images based on their names
            let category = 'Other';
            if (name.includes('nginx') || name.includes('httpd') || name.includes('apache')) {
              category = 'Web Servers';
            } else if (name.includes('mysql') || name.includes('postgres') || name.includes('mongo') || name.includes('redis') || name.includes('mariadb')) {
              category = 'Databases';
            } else if (name.includes('node') || name.includes('python') || name.includes('java') || name.includes('ruby') || name.includes('golang')) {
              category = 'Programming Languages';
            } else if (name.includes('ubuntu') || name.includes('alpine') || name.includes('debian') || name.includes('centos') || name.includes('fedora')) {
              category = 'Operating Systems';
            }

            // Format pull count
            const count = parseInt(pullCount);
            let formattedPulls;
            if (count >= 1e9) {
              formattedPulls = `${(count / 1e9).toFixed(1)}B+`;
            } else if (count >= 1e6) {
              formattedPulls = `${(count / 1e6).toFixed(1)}M+`;
            } else if (count >= 1e3) {
              formattedPulls = `${(count / 1e3).toFixed(1)}K+`;
            } else {
              formattedPulls = count.toString();
            }

            return {
              name,
              pulls: formattedPulls,
              pullCount: count, // Keep original count for sorting
              category,
              official: !name.includes('/'), // Official images don't have a namespace
              description: `Official Docker image for ${name}`,
            };
          })
          .sort((a, b) => b.pullCount - a.pullCount) // Sort by pull count
          .slice(0, 100); // Take top 100 images

        setImages(parsedImages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching docker images:', err);
        setError('Failed to load Docker images data');
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const categories = ['all', ...new Set(images.map(img => img.category))].sort();
  const filteredImages = images.filter(img => filter === 'all' || img.category === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Count Display */}
      <div className="text-center mb-6">
        <p className="text-gray-300">
          Showing <span className="font-bold text-primary">{filteredImages.length}</span> 
          {filter !== 'all' && (
            <span> {filter}</span>
          )} images
          {filter !== 'all' && (
            <span> out of <span className="font-bold text-primary">{images.length}</span> total</span>
          )}
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              <span className="ml-2 text-sm opacity-75">
                ({images.filter(img => category === 'all' ? true : img.category === category).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {image.name}
              </h3>
              <div className="flex gap-2">
                {image.official && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded">
                    Official
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {image.description}
            </p>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  />
                </svg>
                <span className="text-gray-600 dark:text-gray-300">{image.pulls}</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                {image.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DockerImages; 