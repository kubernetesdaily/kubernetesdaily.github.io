import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Helmet } from "react-helmet";
import MarkdownRenderer from "./MarkdownRenderer";
import DebugInfo from "./DebugInfo";
import OpenGraph from "./OpenGraph";

function Blog() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDebug, setShowDebug] = useState(false);

  // Load blog index
  useEffect(() => {
    const fetchBlogIndex = async () => {
      // Try multiple possible locations for the blog index
      const possiblePaths = [
        '/blog/index.json',
        '/blog.json',
        './blog/index.json',
        './blog.json',
        '/data/blog.json',
        './data/blog.json',
      ];
      
      let data = null;
      let fetchError = null;
      
      // Try each path until one works
      for (const path of possiblePaths) {
        try {
          console.log(`Attempting to fetch blog index from: ${path}`);
          const response = await fetch(path, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            cache: 'no-store'
          });
          
          if (response.ok) {
            const jsonData = await response.json();
            // Handle both formats: direct array or { blogs: [...] }
            data = jsonData.blogs || jsonData;
            console.log('Blog posts loaded from:', path, data);
            break; // Exit the loop if successful
          }
        } catch (err) {
          console.error(`Error fetching from ${path}:`, err);
          fetchError = err;
        }
      }
      
      if (data) {
        setBlogPosts(data);
        setLoading(false);
      } else {
        console.error('All fetch attempts failed:', fetchError);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
        
        // Fallback to hardcoded data if all fetch attempts fail
        const fallbackData = [
          {
              "id": "k8sgpt",
              "title": "K8sGPT: ChatGPT-based SRE for Kubernetes",
              "date": "July 12, 2023",
              "excerpt": "K8sGPT is a tool for scanning your Kubernetes clusters, diagnosing and triaging issues in simple English using AI.",
              "author": "Sangam Biradar",
              "file": "/blog/k8sgpt.md",
              "category": "Kubernetes",
              "tags": ["kubernetes", "ChatGPT", "AI", "SRE", "troubleshooting"]
          }
        ]
        
        console.log('Using fallback blog data');
        setBlogPosts(fallbackData);
        // Clear the error state after setting fallback data
        setError(null);
      }
    };

    fetchBlogIndex();
  }, []);

  // Add structured data for the blog list
  useEffect(() => {
    if (!blogPosts.length || postId) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Kubernetes Daily Blog",
      "url": "https://kubernetesdaily.github.io/blog",
      "description": "Stay updated with the latest Kubernetes tools, best practices, and community insights.",
      "publisher": {
        "@type": "Organization",
        "name": "Kubernetes Daily",
        "logo": {
          "@type": "ImageObject",
          "url": "https://kubernetesdaily.github.io/logos/kubedaily.svg"
        }
      },
      "blogPost": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": new Date(post.date).toISOString(),
        "author": {
          "@type": "Person",
          "name": post.author || "Kubernetes Daily"
        },
        "url": `https://kubernetesdaily.github.io/blog/${post.id}`
      }))
    };

    // Add structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [blogPosts, postId]);

  // Add structured data for individual blog post
  useEffect(() => {
    if (!currentPost) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": currentPost.title,
      "description": currentPost.excerpt,
      "image": "https://kubernetesdaily.github.io/og-image.png",
      "datePublished": new Date(currentPost.date).toISOString(),
      "dateModified": new Date(currentPost.date).toISOString(),
      "author": {
        "@type": "Person",
        "name": currentPost.author || "Kubernetes Daily"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Kubernetes Daily",
        "logo": {
          "@type": "ImageObject",
          "url": "https://kubernetesdaily.github.io/logos/kubedaily.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://kubernetesdaily.github.io/blog/${currentPost.id}`
      },
      "keywords": "Kubernetes, cloud native, containers, Docker, DevOps, GitOps, cloud computing"
    };

    // Add structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [currentPost]);

  // Load individual blog post when postId changes
  useEffect(() => {
    if (!postId || !blogPosts.length) return;

    const fetchBlogPost = async () => {
      setLoading(true);
      const post = blogPosts.find(p => p.id === postId);
      
      if (!post) {
        setError('Blog post not found');
        setLoading(false);
        setTimeout(() => navigate("/blog"), 1000);
        return;
      }

      // Get the file path from post (may be in "file" or "path" field)
      const postPath = post.path || post.file;
      
      if (!postPath) {
        console.error('Post has no file or path:', post);
        setError('Post has invalid configuration');
        setLoading(false);
        return;
      }

      // Try multiple possible paths for the blog post markdown file
      // Handle both relative and absolute paths
      const possiblePaths = [
        postPath,
        postPath.startsWith('/') ? postPath.substring(1) : postPath,
        `./public${postPath}`,
        `.${postPath}`,
      ];
      
      console.log('Trying paths:', possiblePaths);
      
      let content = null;
      let fetchError = null;
      
      // Try each path until one works
      for (const path of possiblePaths) {
        try {
          console.log(`Attempting to fetch blog post from: ${path}`);
          const response = await fetch(path, {
            headers: {
              'Accept': 'text/plain, text/markdown'
            },
            cache: 'no-store'
          });
          
          if (response.ok) {
            content = await response.text();
            console.log('Blog post content loaded successfully from:', path);
            break; // Exit the loop if successful
          }
        } catch (err) {
          console.error(`Error fetching from ${path}:`, err);
          fetchError = err;
        }
      }
      
      if (content) {
        // Extract frontmatter and content
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (frontmatterMatch) {
          const frontmatterText = frontmatterMatch[1];
          const markdown = frontmatterMatch[2];
          
          // Parse frontmatter into object (simple version)
          const frontmatter = {};
          frontmatterText.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
              const value = valueParts.join(':').trim();
              frontmatter[key.trim()] = value.replace(/^"(.*)"$/, '$1');
            }
          });
          
          setCurrentPost({
            ...post,
            content: markdown
          });
        } else {
          setCurrentPost({
            ...post,
            content: content
          });
        }
      } else {
        console.error('All fetch attempts failed:', fetchError);
        setError('Failed to load blog post content. Using fallback display.');
        
        // Fallback content for demonstration if all fetch attempts fail
        setCurrentPost({
          ...post,
          content: `# ${post.title}\n\n${post.excerpt}\n\nThis content is being displayed as a fallback.`
        });
        
        // Clear the error state after setting fallback content
        setTimeout(() => setError(null), 100);
      }
      
      setLoading(false);
    };

    fetchBlogPost();
  }, [postId, blogPosts, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-8 text-center">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-xl mb-4">
          <p>{error}</p>
        </div>
        <Button 
          onClick={() => navigate("/blog")}
          className="mt-4"
        >
          Back to Blog
        </Button>
      </div>
    );
  }

  // If postId is provided, show the individual blog post
  if (postId && currentPost) {
    return (
      <div className="w-full mx-auto px-4 py-8 blog-content-container">
        <BlogPostDetail post={currentPost} />
      </div>
    );
  }

  // Show blog list
  return (
    <div className="w-full mx-auto px-4 py-8 blog-content-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-2">Kubernetes Daily Blog</h1>
        <p className="text-grayFill text-center max-w-[800px] mx-auto">
          Stay updated with the latest Kubernetes tools, best practices, and community insights.
        </p>
        
        {/* Debug toggle button */}
        <div className="flex justify-center mt-2">
          <button 
            onClick={() => setShowDebug(!showDebug)}
            className="text-xs text-gray-500 hover:text-gray-400 px-2 py-1 rounded"
          >
            {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
          </button>
        </div>
      </div>
      
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary">Latest Posts</h2>
          <Button 
            variant="outline" 
            onClick={() => window.open('https://github.com/kubernetesdaily/kubernetesdaily.github.io/tree/main/public/blog', '_blank')}
            className="text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Contribute a Post
          </Button>
        </div>
        
        <BlogList blogPosts={blogPosts} />
      </div>
      
      {/* Debug information panel */}
      <DebugInfo show={showDebug} />
      
      <div className="bg-bgGray rounded-xl p-8 border border-gray-800">
        <h2 className="text-xl font-semibold text-primary mb-4">Want to Contribute?</h2>
        <p className="text-grayFill mb-6">
          We welcome blog post contributions from the community. Share your knowledge, insights, and experiences related to Kubernetes, containers, and cloud native technologies.
        </p>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-blue-500/20 text-blue-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">1</div>
            <div>
              <h3 className="font-medium text-primary">Fork the Repository</h3>
              <p className="text-sm text-grayFill">Start by forking our GitHub repository to your account.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-500/20 text-blue-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">2</div>
            <div>
              <h3 className="font-medium text-primary">Create a Markdown File</h3>
              <p className="text-sm text-grayFill">Add a new markdown file in the <code className="bg-bgPrimary px-1 py-0.5 rounded text-xs">public/blog</code> directory with proper frontmatter.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-500/20 text-blue-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">3</div>
            <div>
              <h3 className="font-medium text-primary">Update the Index</h3>
              <p className="text-sm text-grayFill">Add your post entry to <code className="bg-bgPrimary px-1 py-0.5 rounded text-xs">public/data/blog.json</code>.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-500/20 text-blue-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">4</div>
            <div>
              <h3 className="font-medium text-primary">Submit a Pull Request</h3>
              <p className="text-sm text-grayFill">Create a pull request with your changes for review.</p>
            </div>
          </div>
        </div>
        <Button 
          onClick={() => window.open('https://github.com/kubernetesdaily/kubernetesdaily.github.io', '_blank')}
          className="mt-6"
        >
          View GitHub Repository
        </Button>
      </div>
    </div>
  );
}

// Blog post detail component
function BlogPostDetail({ post }) {
  const navigate = useNavigate();
  
  // If post has no content, show a message
  const hasContent = post.content && post.content.trim().length > 0;
  
  return (
    <div className="bg-slate-50/50 dark:bg-slate-900 p-8 rounded-xl shadow-md w-full">
      <OpenGraph
        title={`${post.title} | Kubernetes Daily Blog`}
        description={post.excerpt}
        url={`/blog/${post.id}`}
        image={post.image || "/og-image.png"}
        type="article"
        tags={post.tags || []}
      />
      
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate("/blog")}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to All Posts
      </Button>
    
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-indigo-500">{post.date}</span>
        {post.author && (
          <span className="text-sm text-slate-500 dark:text-slate-400">by {post.author}</span>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{post.title}</h2>
      
      <div className="w-full">
        {hasContent ? (
          <MarkdownRenderer className="w-full">
            {post.content}
          </MarkdownRenderer>
        ) : (
          <div className="text-slate-500 dark:text-slate-400">
            <p>{post.excerpt}</p>
            <div className="mt-8 p-4 border border-slate-200 dark:border-slate-700 rounded-md bg-slate-100 dark:bg-slate-800/50">
              <p className="text-yellow-400 mb-2">⚠️ Content loading issue</p>
              <p>The content for this post could not be loaded. Please try again later or visit our GitHub repository to view the source markdown.</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-500 dark:text-slate-400">Share:</span>
            <button className="text-slate-500 dark:text-slate-400 hover:text-indigo-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </button>
            <button className="text-slate-500 dark:text-slate-400 hover:text-indigo-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </button>
            <button className="text-slate-500 dark:text-slate-400 hover:text-indigo-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </button>
          </div>
          <a 
            href={`https://github.com/kubernetesdaily/kubernetesdaily.github.io/edit/main/public${(post.path || post.file)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-indigo-500 hover:underline flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit this page
          </a>
        </div>
      </div>
    </div>
  );
}

// Blog list component
function BlogList({ blogPosts }) {
  const navigate = useNavigate();
  const [jsonView, setJsonView] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  // Get unique categories
  const categories = ['All', ...new Set(blogPosts.map(post => post.category).filter(Boolean))];
  
  // Filter posts by active category
  const filteredPosts = activeCategory === 'All' 
    ? sortedPosts 
    : sortedPosts.filter(post => post.category === activeCategory);
  
  return (
    <div>
      {/* Category filter and JSON view toggle */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setJsonView(!jsonView)}
          className="text-xs text-indigo-500 hover:text-indigo-400 px-2 py-1 rounded border border-indigo-500/20"
        >
          {jsonView ? 'Card View' : 'JSON View'}
        </button>
      </div>
      
      {jsonView ? (
        <div className="bg-slate-900 p-4 rounded-lg shadow-inner">
          <pre className="text-xs text-slate-300 overflow-auto max-h-[500px]">
            {JSON.stringify(filteredPosts, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div 
              key={post.id} 
              className="bg-slate-50/50 dark:bg-slate-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-indigo-500/30 hover:translate-y-[-2px] flex flex-col h-full border border-slate-200 dark:border-slate-800"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium text-indigo-500 bg-indigo-500/10 py-1 px-2 rounded-full">{post.date}</span>
                  {post.category && (
                    <span className="text-xs font-medium text-cyan-500 bg-cyan-500/10 py-1 px-2 rounded-full">
                      {post.category}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white leading-tight">{post.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag} 
                        className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-[10px] text-slate-500 px-1">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/50 mt-auto">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {post.author && `By ${post.author}`}
                  </div>
                  <button 
                    onClick={() => navigate(`/blog/${post.id}`)} 
                    className="text-indigo-500 text-sm font-medium hover:text-indigo-400 transition-colors flex items-center"
                  >
                    Read More
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {filteredPosts.length === 0 && (
        <div className="bg-slate-100/50 dark:bg-slate-800/50 rounded-lg p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">No blog posts found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default Blog; 