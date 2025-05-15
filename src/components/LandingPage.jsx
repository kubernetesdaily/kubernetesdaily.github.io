import React, { useEffect } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import ModelLeaderboard from "./ModelLeaderboard";
import Testimonial from "./Testimonial";

function LandingPage() {
  // Sample featured tools
  const featuredTools = [
    {
      id: 1,
      title: "Kubernetes",
      description: "An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.",
      category: "Orchestration",
      stars: 98400
    },
    {
      id: 2,
      title: "Docker",
      description: "A platform for developing, shipping, and running applications in containers, making it easier to create, deploy, and run applications.",
      category: "Containerization",
      stars: 65700
    },
    {
      id: 3,
      title: "Helm",
      description: "The package manager for Kubernetes that helps you define, install, and upgrade Kubernetes applications.",
      category: "Package Management",
      stars: 23800
    }
  ];

  // Add structured data for SEO
  useEffect(() => {
    // Create JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "KubeDaily",
      "url": "https://kubernetesdaily.github.io/",
      "logo": "https://kubernetesdaily.github.io/images/kubedaily_logo.webp",
      "description": "KubeDaily is dedicated to demystifying the container and orchestration ecosystem through high-quality resources and educational content.",
      "sameAs": [
        "https://github.com/kubernetesdaily"
      ],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://kubernetesdaily.github.io/"
      },
      "keywords": "kubernetes, containers, docker, orchestration, cloud-native, k8s, devops, microservices, helm, istio, service mesh",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://kubernetesdaily.github.io/tools?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    // Add the structured data to the document head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Clean up the script tag when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero Section - Modern design with professional gradient and KubeDaily background */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-950">
        {/* Background image */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div 
            className="w-full h-full bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: "url('/images/kubedaily_logo.webp')" }}
          ></div>
        </div>
        
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 to-slate-100/90 dark:from-slate-900/80 dark:via-blue-950/80 dark:to-slate-950/80"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-repeat opacity-[0.03] dark:opacity-[0.02]"></div>
        
        {/* Animated accent elements - more subtle and professional */}
        <div className="absolute top-40 left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10">
          <div className="flex flex-col items-center gap-8 text-center">
            <Badge variant="outline" className="bg-blue-50/80 dark:bg-blue-900/10 backdrop-blur-sm px-5 py-2 rounded-full border-blue-100 dark:border-blue-800/30">
              <span className="text-blue-700 dark:text-blue-400 text-sm font-medium">Navigating the Container Ecosystem</span>
            </Badge>
            
            <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight tracking-tight">
              Demystifying <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Container and Orchestration</span> Ecosystem
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 text-xl max-w-3xl">
              KubeDaily is dedicated to simplifying Kubernetes, containers, and orchestration technologies 
              through high-quality resources, tutorials, and practical guides.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5 mt-6">
              <Button 
                text={"Explore Tools"} 
                link={"/tools"} 
              />
              <Button 
                text={"Hands-on Labs"} 
                link={"/labs"} 
                variant={"outline"}
              />
              <Link 
                to="#community"
                className="px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-200 flex items-center justify-center group"
              >
                Join Our Community
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
            
            {/* Stats section - refined cards with professional shadow */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 w-full max-w-5xl">
              <Card className="border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-blue-600 dark:text-blue-400 text-3xl lg:text-4xl font-bold mb-2">300+</div>
                  <div className="text-slate-700 dark:text-slate-300 text-sm font-medium">Container Tools</div>
                </CardContent>
              </Card>
              <Card className="border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-cyan-600 dark:text-cyan-400 text-3xl lg:text-4xl font-bold mb-2">40+</div>
                  <div className="text-slate-700 dark:text-slate-300 text-sm font-medium">Tech Partners</div>
                </CardContent>
              </Card>
              <Card className="border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-emerald-600 dark:text-emerald-400 text-3xl lg:text-4xl font-bold mb-2">4+</div>
                  <div className="text-slate-700 dark:text-slate-300 text-sm font-medium">Hands-on Labs</div>
                </CardContent>
              </Card>
              <Card className="border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-amber-600 dark:text-amber-400 text-3xl lg:text-4xl font-bold mb-2">100+</div>
                  <div className="text-slate-700 dark:text-slate-300 text-sm font-medium">Deployment Guides</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Decorative element - refined wave with subtle gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-950">
          <svg className="absolute bottom-0 w-full h-12 text-slate-50 dark:text-slate-950" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0V74H1440V0C1200,40 960,64 720,64C480,64 240,40 0,0Z" />
          </svg>
        </div>
      </div>

      {/* Mission Section - Modern design with improved layout and shadows */}
      <div className="bg-slate-50 dark:bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <span className="inline-block text-blue-600 dark:text-blue-400 font-semibold tracking-wider text-sm uppercase mb-3">Our Mission</span>
              <h2 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-bold mb-6 leading-tight">Simplifying Container Orchestration</h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-6 leading-relaxed">
              We believe that access to high-quality knowledge and resources is essential for successful container adoption. 
              Our mission is to demystify Kubernetes and the container ecosystem while promoting best practices in cloud-native deployments.
            </p>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
              Through collaboration with cloud-native experts, DevOps professionals, and community contributors, we're building 
              a more accessible container ecosystem for everyone from beginners to seasoned practitioners.
            </p>
              <Link to="/about" className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center group transition-colors">
              Learn more about our work
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 mb-10 md:mb-0">
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10 opacity-70 blur-xl"></div>
                <div className="relative bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-xl shadow-xl">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-lg overflow-hidden">
                    <img 
                      src="/images/kubedaily_logo.webp" 
                      alt="KubeDaily Mission" 
                      className="w-full h-full object-contain p-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <Testimonial />

      {/* Featured Tools Section - Modern cards with refined design */}
      <div className="bg-white dark:bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 dark:text-blue-400 font-semibold tracking-wider text-sm uppercase mb-3">Container Ecosystem</span>
            <h2 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-bold mb-6">Essential Kubernetes & Container Tools</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-3xl mx-auto">
              Explore our curated collection of the most valuable tools and resources for container orchestration,
              infrastructure management, and cloud-native development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredTools.map((tool) => (
              <Card key={tool.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">{tool.title}</CardTitle>
                    <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                      {tool.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {tool.description}
                  </p>
                </CardContent>
                <CardFooter className="border-t border-slate-100 dark:border-slate-800 pt-4 pb-3 flex justify-between">
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-500">
                    <svg className="w-4 h-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {tool.stars.toLocaleString()} stars
                  </div>
                  <Link to={`/tools#${tool.title.toLowerCase()}`} className="text-blue-600 dark:text-blue-400 text-xs font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    Learn more
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/tools" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
              View All Container Tools
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Kubernetes Labs Section */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 dark:text-blue-400 font-semibold tracking-wider text-sm uppercase mb-3">Hands-on Learning</span>
            <h2 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-bold mb-6">Interactive Kubernetes Labs</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-3xl mx-auto">
              Master container technologies with our practical hands-on labs. Learn by doing with
              step-by-step tutorials and real-world examples.
            </p>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl mb-12">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-400/10 dark:bg-blue-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full filter blur-3xl"></div>
            
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <Badge variant="outline" className="w-fit mb-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800/30">
                  Featured Lab
                </Badge>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Learn Kubernetes</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  A comprehensive guide to Kubernetes, covering its history, architecture, and practical usage in container orchestration. Master the industry-standard platform for deploying and managing containerized applications.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Kubernetes", "Containers", "Docker", "Orchestration", "K8s"].map((tag, i) => (
                    <Badge key={i} variant="outline" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link 
                  to="/labs/Learn-Kubernetes"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 w-fit"
                >
                  Start Learning Kubernetes
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 p-12 flex items-center justify-center">
                <img 
                  src="/images/kubedaily_logo.webp" 
                  alt="Kubernetes Lab" 
                  className="max-h-64 object-contain"
                />
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Learn Docker</CardTitle>
                  <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                    Containers
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  A comprehensive guide to Docker, covering its history, architecture, and practical usage in container orchestration.
                </p>
                <Link 
                  to="/labs/Learn-Docker"
                  className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center group transition-colors"
                >
                  Go to lab
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Learn ContainerD</CardTitle>
                  <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                    Containers
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  A comprehensive guide to ContainerD, covering its history, architecture, and practical usage in container orchestration.
                </p>
                <Link 
                  to="/labs/Learn-Containerd"
                  className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center group transition-colors"
                >
                  Go to lab
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Learn Helm</CardTitle>
                  <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                    Containers
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  A comprehensive guide to Helm, covering its history, architecture, and practical usage in container orchestration.
                </p>
                <Link 
                  to="/labs/Learn-Helm"
                  className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center group transition-colors"
                >
                  Go to lab
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Explore All Labs</h3>
                <p className="mb-6 opacity-90">
                  Discover our full collection of hands-on Kubernetes and container tutorials.
                </p>
                <Link 
                  to="/labs"
                  className="inline-flex items-center justify-center px-5 py-2 border border-white/30 rounded-md font-medium hover:bg-white/10 transition-colors"
                >
                  View All Labs
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Update the hero section call-to-action buttons to include Labs */}
      <div className="bg-white dark:bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 dark:text-blue-400 font-semibold tracking-wider text-sm uppercase mb-3">Container Ecosystem</span>
            <h2 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-bold mb-6">Essential Kubernetes & Container Tools</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-3xl mx-auto">
              Explore our curated collection of the most valuable tools and resources for container orchestration,
              infrastructure management, and cloud-native development.
            </p>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div id="community" className="bg-gradient-to-br from-slate-900 to-blue-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <span className="inline-block text-blue-300 font-semibold tracking-wider text-sm uppercase mb-3">Join Our Community</span>
              <h2 className="text-4xl font-bold mb-6 leading-tight">Learn Together. Grow Together.</h2>
              <p className="text-lg mb-6 text-blue-100">
                Connect with fellow Kubernetes enthusiasts, container experts, and cloud-native practitioners. 
                Share your knowledge, ask questions, and collaborate on projects.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Discord Community</h3>
                  <p className="text-blue-200 mb-4">Join our active Discord server to chat, collaborate, and get real-time support.</p>
                  <a 
                    href="https://discord.gg/kubernetesdaily" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 flex items-center group hover:text-blue-100 transition-colors"
                  >
                    Join Discord
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">GitHub Collaboration</h3>
                  <p className="text-blue-200 mb-4">Contribute to our open-source projects and hands-on labs on GitHub.</p>
                  <a 
                    href="https://github.com/kubernetesdaily" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 flex items-center group hover:text-blue-100 transition-colors"
                  >
                    Explore GitHub
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Try Our Hands-on Labs</h3>
                    <p className="mb-3">Learn Kubernetes, Docker, ContainerD and more with our step-by-step labs</p>
                    <Link 
                      to="/labs"
                      className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md transition text-sm font-medium"
                    >
                      Get Started with Labs
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col items-center gap-1 bg-white/5 p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-blue-300">20K+</div>
                  <div className="text-sm">Community Members</div>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white/5 p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-cyan-300">150+</div>
                  <div className="text-sm">Discord Channels</div>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white/5 p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-green-300">50+</div>
                  <div className="text-sm">Contributors</div>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white/5 p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-purple-300">24/7</div>
                  <div className="text-sm">Global Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage; 