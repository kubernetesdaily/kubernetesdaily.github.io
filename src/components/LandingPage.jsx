import React, { useEffect } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import ModelLeaderboard from "./ModelLeaderboard";

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
                  <div className="text-emerald-600 dark:text-emerald-400 text-3xl lg:text-4xl font-bold mb-2">20K+</div>
                  <div className="text-slate-700 dark:text-slate-300 text-sm font-medium">Community Members</div>
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
                    <div className="flex items-center justify-center p-6">
                      <svg className="w-32 h-32 sm:w-48 sm:h-48 text-blue-500/80 dark:text-blue-400/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor"/>
                        <path d="M13 7L13 13L11 13L11 7L13 7Z" fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="currentColor"/>
              </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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

      {/* Featured content continues... */}
    
    </div>
  );
}

export default LandingPage; 