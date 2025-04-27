import React, { useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import GitHubButton from 'react-github-btn';

function ToolCard({ title, link, description, github, tag }) {
  // Helper function to get a badge variant based on the tag
  const getBadgeVariant = (tag) => {
    // Kubernetes related categories
    if (tag.includes("Cluster Management")) {
      return "clusterManagement";
    } else if (tag.includes("Pods Management")) {
      return "podsManagement";
    } else if (tag.includes("Debugging & Troubleshooting")) {
      return "debugging";
    } else if (tag.includes("Security Tools")) {
      return "security";
    } else if (tag.includes("Monitoring & Observability")) {
      return "monitoring";
    } else if (tag.includes("Auto Scaling")) {
      return "autoScaling";
    } else if (tag.includes("Development Tools")) {
      return "development";
    } else if (tag.includes("CI/CD Tools")) {
      return "cicd";
    } 
    // AI and ML related categories
    else if (tag.includes("Machine Learning") || tag.includes("Deep Learning")) {
      return "ml";
    } else if (tag.includes("Data")) {
      return "data";
    } else if (tag.includes("Reinforcement")) {
      return "reinforcement";
    } else if (tag === "Programming") {
      return "programming";
    } else if (tag.includes("Artificial Intelligence")) {
      return "ai";
    } else if (tag.includes("LLM Framework")) {
      return "llmFramework";
    } else if (tag.includes("LLM Model")) {
      return "llmModel";
    } else if (tag.includes("LLM Vector Database")) {
      return "llmVector";
    } else if (tag.includes("LLM Tool")) {
      return "llmTool";
    } else if (tag.includes("MCP Core")) {
      return "mcpCore";
    } else if (tag.includes("MCP Database")) {
      return "mcpDatabase";
    } else if (tag.includes("MCP Finance")) {
      return "mcpFinance";
    } else if (tag.includes("MCP Web")) {
      return "mcpWeb";
    } else if (tag.includes("MCP Developer")) {
      return "mcpDeveloper";
    } else if (tag.includes("MCP AI")) {
      return "mcpAI";
    } else if (tag.includes("MCP Productivity")) {
      return "mcpProductivity";
    } else {
      return "default";
    }
  };

  // Extract repository information from GitHub URL or link
  const getGitHubInfo = () => {
    // First try to extract from link if it's a GitHub URL
    if (link && link.includes('github.com')) {
      try {
        const url = new URL(link);
        if (url.hostname === 'github.com') {
          // Extract the path after github.com
          const pathParts = url.pathname.split('/').filter(part => part);
          if (pathParts.length >= 2) {
            return {
              owner: pathParts[0],
              repo: pathParts[1],
              fullPath: `${pathParts[0]}/${pathParts[1]}`
            };
          }
        }
      } catch (e) {
        // If URL parsing fails, continue with fallback
      }
    }
    
    // Fallback to using the github parameter
    if (github) {
      if (github.includes('/')) {
        const [owner, repo] = github.split('/');
        return {
          owner,
          repo,
          fullPath: github
        };
      } else {
        // Try to extract repo name from title or use username as repo
        // This is imperfect but better than nothing
        let repoName = github;
        
        // Try to extract a reasonable repo name from the title
        if (title) {
          // Convert title to kebab-case for a more likely repo name
          repoName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        
        return {
          owner: github,
          repo: repoName,
          fullPath: `${github}/${repoName}`
        };
      }
    }
    
    return null;
  };

  const githubInfo = getGitHubInfo();

  return (
    <Card className="w-full h-full flex flex-col bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between pt-6 pb-4 px-6 border-b border-gray-100 dark:border-gray-700">
        <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</CardTitle>
        <Badge variant={getBadgeVariant(tag)} className="ml-3 whitespace-nowrap text-xs py-1">{tag}</Badge>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardDescription className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2 mt-auto p-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-gray-700">
        <Button 
          asChild
          className="h-[36px] bg-blue-600 hover:bg-blue-700 hover:shadow-md font-medium text-white"
        >
          <a
            href={link !== "" ? link : "/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
            Learn
          </a>
        </Button>
        
          {github && (
          <>
          <Button
            asChild
            variant="secondary"
              className="h-[36px] bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 hover:shadow-md font-medium"
          >
            <a
                href={`https://github.com/${github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
              GitHub
            </a>
          </Button>
            
            {githubInfo && (
              <div className="h-[36px] flex items-center ml-1 github-btn-container">
                <GitHubButton 
                  href={`https://github.com/${githubInfo.fullPath}`}
                  data-icon="octicon-star" 
                  data-size="large"
                  data-show-count="true"
                  data-color-scheme="no-preference: light_high_contrast; light: light_high_contrast; dark: dark_dimmed;"
                  aria-label={`Star ${githubInfo.fullPath} on GitHub`}
                >
                  Star
                </GitHubButton>
              </div>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default ToolCard;
