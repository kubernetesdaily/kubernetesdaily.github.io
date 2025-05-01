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
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  // Filter images based on search term and category
  const filteredImages = images
    .filter(img => 
      img.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || img.category === selectedCategory)
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
    const categories = ['all', ...new Set(images.map(img => img.category))].sort();
    
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

  // Get unique categories for filter
  const categories = ['all', ...new Set(images.map(img => img.category))].sort();

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
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Explore Docker Images</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Browse and search popular Docker images with detailed information about their pull counts, 
          SBOM data, and more.
        </p>
      </div>

      {/* Chart Section */}
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Tool Coverage</h3>
            <div className="h-64">
              <Pie data={toolCoverageData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl">
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
      <div className="mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Most Popular Docker Images</h3>
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
      <div className="mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Most Popular Docker Images by Category</h3>
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

      {/* Search Bar with Category Filter */}
      <div className="mb-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-2/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Docker images..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-5 py-3 pl-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none px-5 py-3 pl-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
        Showing {currentImages.length} of {filteredImages.length} Docker images
        {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
        {selectedCategory !== 'all' && <span> in <strong>{selectedCategory}</strong> category</span>}
      </p>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentImages.map((image, index) => {
          const isExpanded = expandedImages.includes(image.name);
          return (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]"
            >
              <div 
                className="p-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 flex flex-col flex-grow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="max-w-[75%]">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                      {image.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {image.pulls} pulls
                    </p>
                  </div>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {image.official && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Official
                      </span>
                    )}
                    {image.sbomData.syft.hasData && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
                        Syft
                      </span>
                    )}
                    {image.sbomData.trivy.hasData && (
                      <span className="px-2 py-1 text-xs bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100 rounded-full">
                        Trivy
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 mb-4 flex-grow">
                  {image.description}
                </p>

                <div className="mt-auto">
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 mb-4 group relative">
                    <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                      {image.pullCommand}
                    </code>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCommand(image.pullCommand, index);
                      }}
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedCommand === index ? (
                        <span className="text-green-500 text-sm flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied
                        </span>
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
                  
                  <button
                    onClick={() => toggleImageExpand(image)}
                    className="w-full flex justify-center items-center text-primary hover:text-primary-dark py-2 transition-colors duration-300"
                    aria-label={isExpanded ? "Show less" : "Show more"}
                  >
                    <span className="mr-1">{isExpanded ? "Hide SBOM Data" : "Show SBOM Data"}</span>
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
                <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Software Bill of Materials</h4>

                  {/* SBOM Data Display */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {image.sbomData.syft.hasData && (
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
                        <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                          </svg>
                          Syft SBOM
                        </h4>
                        <ul className="space-y-2">
                          <li className="text-gray-600 dark:text-gray-300 flex justify-between">
                            <span className="font-medium">Packages:</span> 
                            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs font-medium">
                              {image.sbomData.syft.packageCount}
                            </span>
                          </li>
                          <li className="text-gray-600 dark:text-gray-300 flex justify-between">
                            <span className="font-medium">Licenses:</span> 
                            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full text-xs font-medium">
                              {image.sbomData.syft.licenseCount}
                            </span>
                          </li>
                          <li className="text-gray-600 dark:text-gray-300 flex justify-between">
                            <span className="font-medium">Vulnerabilities:</span> 
                            <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-0.5 rounded-full text-xs font-medium">
                              {image.sbomData.syft.vulnerabilityCount}
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    {image.sbomData.trivy.hasData && (
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
                        <h4 className="font-medium text-pink-600 dark:text-pink-400 mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Trivy SBOM
                        </h4>
                        <ul className="space-y-2">
                          <li className="text-gray-600 dark:text-gray-300 flex justify-between">
                            <span className="font-medium">Packages:</span> 
                            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs font-medium">
                              {image.sbomData.trivy.packageCount}
                            </span>
                          </li>
                          <li className="text-gray-600 dark:text-gray-300 flex justify-between">
                            <span className="font-medium">Licenses:</span> 
                            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full text-xs font-medium">
                              {image.sbomData.trivy.licenseCount}
                            </span>
                          </li>
                          <li className="text-gray-600 dark:text-gray-300 flex justify-between">
                            <span className="font-medium">Vulnerabilities:</span> 
                            <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-0.5 rounded-full text-xs font-medium">
                              {image.sbomData.trivy.vulnerabilityCount}
                            </span>
                          </li>
                        </ul>
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
        <div className="flex justify-center mt-8 gap-3 mb-10">
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg flex items-center ${
              currentPage === 1
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400'
                : 'bg-primary text-white hover:bg-primary/90 transition-colors'
            }`}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            First
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg flex items-center ${
              currentPage === 1
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400'
                : 'bg-primary text-white hover:bg-primary/90 transition-colors'
            }`}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <div className="flex items-center px-4 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-700 dark:text-gray-300">
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg flex items-center ${
              currentPage === totalPages
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400'
                : 'bg-primary text-white hover:bg-primary/90 transition-colors'
            }`}
          >
            Next
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg flex items-center ${
              currentPage === totalPages
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400'
                : 'bg-primary text-white hover:bg-primary/90 transition-colors'
            }`}
          >
            Last
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default DockerImages;