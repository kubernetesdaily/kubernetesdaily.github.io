import React, { useState, useEffect } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DockerImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedImages, setExpandedImages] = useState([]);
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

            // Mock SBOM data
            const sbomData = {
              syft: {
                packageCount: Math.floor(Math.random() * 300) + 50,
                licenseCount: Math.floor(Math.random() * 20) + 5,
                vulnerabilityCount: Math.floor(Math.random() * 50),
                hasData: Math.random() > 0.2 // 80% chance of having data
              },
              trivy: {
                packageCount: Math.floor(Math.random() * 300) + 50,
                licenseCount: Math.floor(Math.random() * 20) + 5,
                vulnerabilityCount: Math.floor(Math.random() * 50),
                hasData: Math.random() > 0.3 // 70% chance of having data
              }
            };

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
              sbomData
            };
          })
          .sort((a, b) => b.pullCount - a.pullCount);

        setImages(parsedImages);
        // Set all images as expanded initially
        setExpandedImages(parsedImages.map(img => img.name));
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

  const toggleImageExpand = (image) => {
    if (expandedImages.includes(image.name)) {
      setExpandedImages(expandedImages.filter(name => name !== image.name));
    } else {
      setExpandedImages([...expandedImages, image.name]);
    }
  };

  // Filter images based on search term
  const filteredImages = images
    .filter(img => 
      img.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Pagination
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);

  // Chart data for tool coverage
  const toolCoverageData = {
    labels: ['Syft', 'Trivy', 'Both', 'None'],
    datasets: [
      {
        data: [
          images.filter(item => item.sbomData.syft.hasData && !item.sbomData.trivy.hasData).length,
          images.filter(item => !item.sbomData.syft.hasData && item.sbomData.trivy.hasData).length,
          images.filter(item => item.sbomData.syft.hasData && item.sbomData.trivy.hasData).length,
          images.filter(item => !item.sbomData.syft.hasData && !item.sbomData.trivy.hasData).length,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(201, 203, 207, 0.6)',
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for popular Docker images chart
  const popularImagesData = {
    labels: images.slice(0, 10).map(img => img.displayName),
    datasets: [
      {
        label: 'Pull Count (in millions)',
        data: images.slice(0, 10).map(img => img.pullCount / 1000000), // Convert to millions for better readability
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for popular Docker images by category
  const categoryData = () => {
    // Get unique categories and sort them
    const categories = [...new Set(images.map(img => img.category))].sort();
    
    // Create a dataset for each top image in a category (instead of one dataset per category)
    const topImagesByCategory = {};
    const colors = [
      'rgba(75, 192, 192, 0.6)', // teal
      'rgba(54, 162, 235, 0.6)', // blue
      'rgba(255, 99, 132, 0.6)', // red
      'rgba(255, 206, 86, 0.6)', // yellow
      'rgba(153, 102, 255, 0.6)', // purple
    ];
    
    // For each category, find the top 5 images
    categories.forEach(category => {
      const categoryImages = images
        .filter(img => img.category === category)
        .sort((a, b) => b.pullCount - a.pullCount)
        .slice(0, 5); // Show top 5 images per category
      
      topImagesByCategory[category] = categoryImages;
    });
    
    // Create datasets - one for each position (1st most popular, 2nd most popular, etc.)
    const datasets = [];
    for (let i = 0; i < 5; i++) { // For each position (up to 5)
      const dataset = {
        label: `#${i+1} Most Popular`,
        data: categories.map(category => {
          const images = topImagesByCategory[category];
          return images[i] ? images[i].pullCount / 1000000 : 0;
        }),
        backgroundColor: colors[i % colors.length],
        borderColor: colors[i % colors.length].replace('0.6', '1'),
        borderWidth: 1,
      };
      datasets.push(dataset);
    }
    
    return {
      labels: categories,
      datasets: datasets,
    };
  };

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
      {/* Chart Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Tool Coverage</h3>
            <div className="h-64">
              <Pie data={toolCoverageData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Dataset Overview</h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Total Images:</span> {images.length}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Images with Syft SBOMs:</span> {images.filter(item => item.sbomData.syft.hasData).length}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Images with Trivy SBOMs:</span> {images.filter(item => item.sbomData.trivy.hasData).length}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Average Packages per Image:</span> {
                  Math.round(
                    images.reduce((acc, item) => acc + item.sbomData.syft.packageCount, 0) / 
                    images.filter(item => item.sbomData.syft.hasData).length
                  )
                }
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Average Licenses per Image:</span> {
                  Math.round(
                    images.reduce((acc, item) => acc + item.sbomData.syft.licenseCount, 0) / 
                    images.filter(item => item.sbomData.syft.hasData).length
                  )
                }
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Average Vulnerabilities per Image:</span> {
                  Math.round(
                    images.reduce((acc, item) => acc + item.sbomData.syft.vulnerabilityCount, 0) / 
                    images.filter(item => item.sbomData.syft.hasData).length
                  )
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Docker Images Chart */}
      <div className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Most Popular Docker Images</h3>
          <div className="h-80">
            <Bar 
              data={popularImagesData} 
              options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Pulls (in millions)'
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `Pulls: ${(context.raw * 1000000).toLocaleString()}`;
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Popular Docker Images by Category Chart */}
      <div className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Most Popular Docker Images by Category</h3>
          <div className="h-96">
            <Bar 
              data={categoryData()} 
              options={{
                maintainAspectRatio: false,
                scales: {
                  x: {
                    stacked: false,
                    title: {
                      display: true,
                      text: 'Categories'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Pulls (in millions)'
                    },
                    stacked: false
                  }
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const categoryName = context.label;
                        const position = context.datasetIndex;
                        
                        const categoryImages = images
                          .filter(img => img.category === categoryName)
                          .sort((a, b) => b.pullCount - a.pullCount)
                          .slice(0, 5);
                        
                        if (position < categoryImages.length) {
                          const image = categoryImages[position];
                          return `${image.name}: ${(image.pullCount).toLocaleString()} pulls`;
                        }
                        return '';
                      }
                    }
                  },
                  legend: {
                    position: 'top',
                    labels: {
                      usePointStyle: true,
                      padding: 20
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search Docker images..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-5 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-gray-500 dark:text-gray-400 mb-4 text-center">
        Showing {currentImages.length} of {filteredImages.length} images
      </p>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentImages.map((image, index) => {
          const isExpanded = expandedImages.includes(image.name);
          return (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
            >
              <div 
                onClick={() => toggleImageExpand(image)}
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 flex flex-col flex-grow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                      {image.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      Pull Count: {image.pulls}
                    </p>
                  </div>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {image.official && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded">
                        Official
                      </span>
                    )}
                    {image.sbomData.syft.hasData && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded">
                        Syft
                      </span>
                    )}
                    {image.sbomData.trivy.hasData && (
                      <span className="px-2 py-1 text-xs bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100 rounded">
                        Trivy
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {image.description}
                </p>
                
                <div className="mt-4 flex justify-center">
                  <button
                    className="flex items-center text-primary hover:text-primary-dark"
                    aria-label={isExpanded ? "Show less" : "Show more"}
                  >
                    <span className="mr-1">{isExpanded ? "Show less" : "Show more"}</span>
                    <svg 
                      className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
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

                  {/* SBOM Data Display */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {image.sbomData.syft.hasData && (
                      <div className="border border-gray-200 dark:border-gray-700 rounded p-4">
                        <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Syft SBOM</h4>
                        <ul className="space-y-2">
                          <li className="text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Packages:</span> {image.sbomData.syft.packageCount}
                          </li>
                          <li className="text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Licenses:</span> {image.sbomData.syft.licenseCount}
                          </li>
                          <li className="text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Vulnerabilities:</span> {image.sbomData.syft.vulnerabilityCount}
                          </li>
                        </ul>
                        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                          Download SBOM
                        </button>
                      </div>
                    )}
                    
                    {image.sbomData.trivy.hasData && (
                      <div className="border border-gray-200 dark:border-gray-700 rounded p-4">
                        <h4 className="font-medium text-pink-600 dark:text-pink-400 mb-2">Trivy SBOM</h4>
                        <ul className="space-y-2">
                          <li className="text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Packages:</span> {image.sbomData.trivy.packageCount}
                          </li>
                          <li className="text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Licenses:</span> {image.sbomData.trivy.licenseCount}
                          </li>
                          <li className="text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Vulnerabilities:</span> {image.sbomData.trivy.vulnerabilityCount}
                          </li>
                        </ul>
                        <button className="mt-3 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors">
                          Download SBOM
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default DockerImages;