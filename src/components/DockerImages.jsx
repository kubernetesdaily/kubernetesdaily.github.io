import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DockerImages = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const imagesPerPage = 30;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/data/most-popular-dockerhub-images.csv');
        const csvText = await response.text();
        
        // Parse CSV (skip header row)
        const rows = csvText.split('\n').slice(1);
        const parsedImages = rows
          .filter(row => row.trim()) // Filter out empty rows
          .map(row => {
            const [name, pullCount] = row.split(',');
            
            // Extract organization and image name
            const nameParts = name.split('/');
            const imageName = nameParts[nameParts.length - 1];
            const organization = nameParts.length > 1 ? nameParts[0] : null;

            // Categorize images based on their names
            let category = 'Other';
            if (imageName.match(/nginx|httpd|apache|traefik/i)) {
              category = 'Web Servers';
            } else if (imageName.match(/mysql|postgres|mongo|redis|mariadb|database/i)) {
              category = 'Databases';
            } else if (imageName.match(/node|python|java|ruby|golang|php/i)) {
              category = 'Programming Languages';
            } else if (imageName.match(/ubuntu|alpine|debian|centos|fedora/i)) {
              category = 'Operating Systems';
            } else if (imageName.match(/prometheus|grafana|telegraf|monitoring/i)) {
              category = 'Monitoring';
            } else if (imageName.match(/kafka|rabbitmq|zookeeper|queue/i)) {
              category = 'Message Queues';
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

            const pullCommand = `docker pull ${name}`;

            return {
              name,
              displayName: imageName,
              organization,
              pulls: formattedPulls,
              pullCount: count,
              category,
              official: !organization || organization === imageName,
              description: `${organization ? `${organization}'s ` : 'Official '}Docker image for ${imageName}`,
              pullCommand,
            };
          })
          .sort((a, b) => b.pullCount - a.pullCount);

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

  const handleCopyCommand = (command, index) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(index);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const categories = ['all', ...new Set(images.map(img => img.category))].sort();
  
  // Filter images based on category and search term
  const filteredImages = images
    .filter(img => filter === 'all' || img.category === filter)
    .filter(img => 
      img.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Prepare data for the trend graph
  const chartData = {
    labels: categories.filter(cat => cat !== 'all'),
    datasets: [
      {
        label: 'Total Pull Count by Category',
        data: categories
          .filter(cat => cat !== 'all')
          .map(category => 
            images
              .filter(img => img.category === category)
              .reduce((sum, img) => sum + img.pullCount, 0)
          ),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(156, 163, 175)',
        },
      },
      title: {
        display: true,
        text: 'Pull Count Distribution by Category',
        color: 'rgb(156, 163, 175)',
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'rgb(156, 163, 175)',
          callback: (value) => {
            if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
            if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
            if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
            return value;
          },
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
    },
  };

  // Pagination
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      {/* Search and Count Display */}
      <div className="flex flex-col items-center mb-6 space-y-4">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <p className="text-gray-300">
          Showing <span className="font-bold text-primary">{filteredImages.length}</span> 
          {filter !== 'all' && (
            <span> {filter}</span>
          )} images
          {filter !== 'all' && (
            <span> out of <span className="font-bold text-primary">{images.length}</span> total</span>
          )}
        </p>
        <p className="text-gray-400 text-sm">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Trend Graph */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Filter Section */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setFilter(category);
                setCurrentPage(1);
              }}
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
        {currentImages.map((image, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {image.name}
                </h3>
              </div>
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
            {/* Docker Pull Command */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 mb-4 group relative">
              <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                {image.pullCommand}
              </code>
              <button
                onClick={() => handleCopyCommand(image.pullCommand, index)}
                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {copiedCommand === index ? (
                  <span className="text-green-500 text-sm">Copied!</span>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
            </div>
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

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
        >
          First
        </button>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
        >
          Previous
        </button>
        <div className="flex items-center px-4">
          <span className="text-gray-300">
            {currentPage} of {totalPages}
          </span>
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
        >
          Next
        </button>
        <button
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default DockerImages; 