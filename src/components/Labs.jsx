import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useParams, Link, useNavigate } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";
import OpenGraph from "./OpenGraph";

// Fallback data in case the fetch fails
const fallbackLabsData = [
 
  {
    id: "Learn-Containerd",
    title: "Learn ContainerD",
    description: "A comprehensive guide to ContainerD, covering its history, architecture, and practical usage in container orchestration.",
    category : "Containers",
    path: "/labs/Learn-Containerd.md",
    contributors: ["Sangam Biradar"],
    tags: ["ContainerD", "Kubernetes", "Containers", "Docker", "runc"],
    image: "/images/kubedaily_logo.webp"
  },
  {
    id: "Learn-Docker",
    title: "Learn Docker",
    description: "A comprehensive guide to Docker, covering its history, architecture, and practical usage in container orchestration.",
    category: "Containers",
    path: "/labs/Learn-Docker.md",
    contributors: ["Sangam Biradar"],
    tags: ["Docker", "Containers", "Docker", "runc"],
    image: "/images/kubedaily_logo.webp"
  }, 
  {
    id: "Learn-Helm",
    title: "Learn Helm",
    description: "A comprehensive guide to Helm, covering its history, architecture, and practical usage in container orchestration.",
    category : "Containers",
    path: "/labs/Learn-Helm.md",
    contributors: ["Sangam Biradar"],
    tags: ["Helm", "Containers", "Docker", "runc"],
    image: "/images/kubedaily_logo.webp"
  }
];

// Lab list component
function LabsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [labsData, setLabsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch labs data from the JSON file
    const fetchLabsData = async () => {
      try {
        setLoading(true);
        
        // Try multiple potential locations for the data
        const potentialUrls = [
          '/data/labs.json',
          '/labs/index.json', // Original location
          `${window.location.origin}/data/labs.json`,
          `${window.location.origin}/labs/index.json`
        ];
        
        let fetchSuccess = false;
        
        // Try each URL in sequence
        for (const url of potentialUrls) {
          try {
            const response = await fetch(url);
            if (response.ok) {
              const data = await response.json();
              setLabsData(data.labs || []);
              fetchSuccess = true;
              break;
            }
          } catch (err) {
            console.log(`Failed to fetch from ${url}:`, err);
            // Continue to next URL
          }
        }
        
        // If all fetches fail, use the fallback data
        if (!fetchSuccess) {
          console.warn("All fetch attempts failed, using fallback data");
          setLabsData(fallbackLabsData);
        }
      } catch (error) {
        console.error("Error fetching labs data:", error);
        setLabsData(fallbackLabsData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLabsData();
  }, []);
  
  // Get all unique categories
  const categories = ["all", ...new Set(labsData.map(lab => lab.category))];

  // Filter labs based on search query and active category
  const filteredLabs = labsData.filter(lab => {
    const matchesSearch = 
      searchQuery === "" || 
      lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lab.tags && lab.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = activeCategory === "all" || lab.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveCategory}>
            <TabsList className="mb-4 md:mb-0 grid grid-cols-2 sm:grid-cols-3 md:flex">
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="w-full md:w-64">
            <Input
              type="text"
              placeholder="Search labs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Hands-on Kubernetes Labs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.length === 0 ? (
            <div className="col-span-full text-center py-12 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
              <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-slate-500 dark:text-slate-400 text-lg">No labs found matching your criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            filteredLabs.map((lab) => (
              <Card 
                key={lab.id} 
                className="hover:shadow-lg transition duration-300 hover:border-indigo-500/30 cursor-pointer overflow-hidden flex flex-col"
                onClick={() => navigate(`/labs/${lab.id}`)}
              >
                <CardHeader className="pb-2 relative">
                  <div className="absolute top-4 right-4">
                    <Badge variant={getCategoryVariant(lab.category)}>
                      {lab.category}
                    </Badge>
                  </div>
                  {lab.image && (
                    <div className="mb-4 -mx-6 -mt-6">
                      <img 
                        src={lab.image} 
                        alt={`${lab.title} preview`} 
                        className="w-full h-40 object-contain bg-white p-4 rounded-t-lg"
                      />
                    </div>
                  )}
                  <CardTitle className="pr-24 mb-2">{lab.title}</CardTitle>
                </CardHeader>
                <CardContent className="py-2 flex-grow">
                  <CardDescription className="mb-4 text-sm line-clamp-3">{lab.description}</CardDescription>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {lab.tags && lab.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-slate-900/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2 border-t border-slate-700 bg-slate-900/30 flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {lab.contributors && lab.contributors.map((contributor, index) => (
                      <Badge key={index} variant="outline" className="bg-slate-900/50 text-xs">
                        @{contributor}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" className="text-indigo-500 p-0 hover:text-indigo-400 text-xs">
                    Explore
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>

      <div className="mb-16 border border-dashed border-slate-700 rounded-lg p-8 hover:border-indigo-500/30 transition duration-300">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-6 md:mb-0 md:mr-8">
            <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
          </div>
          <div className="text-center md:text-left flex-grow">
            <h3 className="text-xl font-semibold mb-2">Propose a New Kubernetes Lab</h3>
            <p className="text-slate-400 mb-6 max-w-2xl">
              Have an idea for a new Kubernetes tutorial or container technology lab? Propose a new lab and help others learn containerization and orchestration concepts.
            </p>
          </div>
          <div>
            <a 
              href="https://github.com/kubernetesdaily/kubernetesdaily.github.io/issues/new?labels=new-lab&template=new-lab-proposal.md&title=Lab Proposal: [Your Lab Title]" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Propose a Lab
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-slate-900 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">How to Contribute</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-slate-900/50">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-semibold text-lg">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fork the Repository</h3>
              <p className="text-slate-400">
                Start by forking our GitHub repository to create your own copy where you can make changes.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-semibold text-lg">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Create or Edit Markdown</h3>
              <p className="text-slate-400">
                Add your Kubernetes tutorial content in markdown format following our templates and guidelines.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-semibold text-lg">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Submit a Pull Request</h3>
              <p className="text-slate-400">
                Submit your changes for review, and our team will review and merge your contribution.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 p-6 border border-indigo-500/30 rounded-lg bg-indigo-500/10">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            Markdown Format
          </h3>
          <p className="text-slate-400 mb-4">
            Each lab project uses markdown files to store content. Here's our basic structure:
          </p>
          <pre className="bg-slate-950 p-4 rounded-md overflow-x-auto text-sm">
            <code>{
`# Lab Title

## Overview
Brief description of the Kubernetes lab

## Prerequisites
- Kubernetes cluster
- kubectl installed
- Other tools needed

## Step 1: Setup
Detailed steps...

## Step 2: Implementation
Hands-on exercises...

## Troubleshooting
Common issues and solutions...

## Additional Resources
Links to official documentation...`
            }</code>
          </pre>
          
          <div className="mt-6">
            <a 
              href="/labs/CONTRIBUTING.md" 
              target="_blank"
              className="text-indigo-400 hover:text-indigo-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
              </svg>
              View Full Contributing Guidelines
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// Lab detail component
function LabDetail() {
  const { labId } = useParams();
  const [content, setContent] = useState("");
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch labs data and find the selected lab
    const fetchLabData = async () => {
      try {
        setLoading(true);
        
        // Try to get lab data from either the JSON file or use fallback
        let labsData = [];
        let fetchSuccess = false;
        
        // Try multiple potential locations for the data
        const potentialUrls = [
          '/data/labs.json',
          '/labs/index.json',
          `${window.location.origin}/data/labs.json`,
          `${window.location.origin}/labs/index.json`
        ];
        
        // Try each URL in sequence
        for (const url of potentialUrls) {
          try {
            const response = await fetch(url);
            if (response.ok) {
              const data = await response.json();
              labsData = data.labs || [];
              fetchSuccess = true;
              break;
            }
          } catch (err) {
            console.log(`Failed to fetch from ${url}:`, err);
            // Continue to next URL
          }
        }
        
        // If all fetches fail, use the fallback data
        if (!fetchSuccess) {
          console.warn("All fetch attempts failed, using fallback data");
          labsData = fallbackLabsData;
        }
        
        const selectedLab = labsData.find(lab => lab.id === labId);
        
        if (!selectedLab) {
          navigate("/labs");
          return;
        }
        
        setLab(selectedLab);
        
        // Fetch the markdown content
        try {
          const markdownResponse = await fetch(selectedLab.path);
          
          if (markdownResponse.ok) {
            const text = await markdownResponse.text();
            setContent(text);
          } else {
            // If the file doesn't exist yet, show a placeholder
            setContent(`# ${selectedLab.title}
            
## Overview

${selectedLab.description}

## Prerequisites

- Kubernetes cluster
- kubectl installed
- Docker or other container runtime

## Steps

This lab is still being developed. Check back soon for the complete tutorial!

## Contributors

${selectedLab.contributors.join(', ')}
`);
          }
        } catch (markdownError) {
          console.error("Error fetching markdown:", markdownError);
          // Use placeholder content
          setContent(`# ${selectedLab.title}
          
## Overview

${selectedLab.description}

## Prerequisites

- Kubernetes cluster
- kubectl installed
- Docker or other container runtime

## Steps

This lab is still being developed. Check back soon for the complete tutorial!

## Contributors

${selectedLab.contributors.join(', ')}
`);
        }
      } catch (error) {
        console.error("Error fetching lab data:", error);
        setContent("# Error loading content\n\nPlease try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchLabData();
  }, [labId, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!lab) {
    return <div>Loading...</div>;
  }

  const siteUrl = "https://kubernetesdaily.github.io";
  const imageUrl = lab.image ? `${siteUrl}${lab.image}` : `${siteUrl}/images/kubedaily_logo.webp`;

  return (
    <div className="bg-slate-900 p-8 rounded-xl shadow-md w-full">
      <OpenGraph
        title={`${lab.title} | Kubernetes Labs`}
        description={lab.description}
        url={`/labs/${lab.id}`}
        image={imageUrl}
        type="article"
        tags={lab.tags || []}
      />
      
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate("/labs")}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to All Labs
      </Button>
      
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Badge variant={getCategoryVariant(lab.category)} className="text-sm">
          {lab.category}
        </Badge>
        {lab.tags && lab.tags.map((tag, index) => (
          <Badge key={index} variant="outline" className="text-xs bg-slate-900/30">
            {tag}
          </Badge>
        ))}
        <div className="text-slate-400 text-sm ml-auto">
          {lab.contributors && lab.contributors.length > 0 && (
            <span>Contributors: {lab.contributors.join(', ')}</span>
          )}
        </div>
      </div>
      
      <div className="w-full">
        {lab.image && (
          <div className="mb-6">
            <img 
              src={lab.image} 
              alt={`${lab.title} cover image`} 
              className="w-full max-h-[400px] object-contain bg-white p-6 rounded-lg"
            />
          </div>
        )}
        <MarkdownRenderer className="w-full">
          {content}
        </MarkdownRenderer>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-700">
        <h3 className="text-xl font-semibold mb-4">Want to contribute to this lab?</h3>
        <div className="flex flex-wrap gap-4">
          <a 
            href={`https://github.com/kubernetesdaily/kubernetesdaily.github.io/edit/main${lab.path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
            Edit this page
          </a>
          <a 
            href={`https://github.com/kubernetesdaily/kubernetesdaily.github.io/issues/new?title=Feedback on lab: ${lab.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-indigo-600/70 hover:bg-indigo-700 text-white rounded-md transition"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            Provide Feedback
          </a>
          <a 
            href="https://github.com/kubernetesdaily/kubernetesdaily.github.io/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-md transition"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            View contribution guidelines
          </a>
        </div>
      </div>
    </div>
  );
}

// Helper function to get badge variant based on category
const getCategoryVariant = (category) => {
  const categoryMap = {
    "Containers": "containers",
    "Kubernetes": "kubernetes",
    "Docker": "docker",
    "Orchestration": "orchestration",
    "Cloud Native": "cloudNative",
    "Networking": "networking",
    "Security": "security",
    "Storage": "storage",
    "Monitoring": "monitoring",
    "CI/CD": "cicd",
  };
  
  return categoryMap[category] || "default";
};

// Main Labs component
function Labs() {
  const { labId } = useParams();
  const siteUrl = "https://kubernetesdaily.github.io";

  return (
    <div className="text-white w-full mx-auto px-4 py-8 lab-content-container">
      {!labId && (
        <Helmet>
          <title>Kubernetes Labs | KubeDaily</title>
          <meta name="description" content="Interactive Kubernetes labs and hands-on tutorials showcasing container orchestration techniques and best practices." />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${siteUrl}/labs`} />
          <meta property="og:title" content="Kubernetes Labs | KubeDaily" />
          <meta property="og:description" content="Interactive Kubernetes labs and hands-on tutorials showcasing container orchestration techniques and best practices." />
          <meta property="og:image" content={`${siteUrl}/images/kubedaily_logo.webp`} />
          
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={`${siteUrl}/labs`} />
          <meta property="twitter:title" content="Kubernetes Labs | KubeDaily" />
          <meta property="twitter:description" content="Interactive Kubernetes labs and hands-on tutorials showcasing container orchestration techniques and best practices." />
          <meta property="twitter:image" content={`${siteUrl}/images/kubedaily_logo.webp`} />
        </Helmet>
      )}

      <h1 className="text-3xl font-bold mb-4 text-center">Kubernetes Labs</h1>
      <p className="text-slate-400 text-lg mb-8 text-center max-w-3xl mx-auto">
        Interactive hands-on labs and tutorials for learning Kubernetes and container technologies.
        Master container orchestration through practical exercises.
      </p>
      
      <div className="mb-8 text-center">
        <a 
          href="https://github.com/kubernetesdaily/kubernetesdaily.github.io" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
          </svg>
          Contribute on GitHub
        </a>
      </div>
      
      {/* Check if we have a labId parameter to determine which component to render */}
      {!labId ? <LabsList /> : <LabDetail />}
    </div>
  );
}

export default Labs; 