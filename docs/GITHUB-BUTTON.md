# GitHub Button Integration

This document explains how we display GitHub repository information in the AI Data Foundation website.

## Overview

We use the `react-github-btn` package to display GitHub star counts and repository information. This approach provides several advantages:

1. **No API Token Required**: The buttons use GitHub's official widget system, which doesn't require authentication tokens
2. **Always Up-to-Date**: Star counts are always current as they're loaded directly from GitHub
3. **Simplified Implementation**: No need to maintain complex GraphQL queries or API handlers
4. **Better Reliability**: No issues with rate limiting or API changes
5. **Consistent UI**: Uses GitHub's official button styling and behavior

## Implementation

### Installation

```bash
npm install react-github-btn
```

### Usage in ToolCard Component

The GitHub button is implemented in the `ToolCard.jsx` component:

```jsx
import GitHubButton from 'react-github-btn';

// Inside the component
<div className="h-[36px] flex items-center">
  <GitHubButton 
    href={`https://github.com/${github}`} 
    data-size="large"
    data-show-count="true" 
    aria-label={`Star ${github} on GitHub`}
  >
    Star
  </GitHubButton>
</div>
```

### Available Options

The GitHub button component supports several configuration options:

- **href**: The GitHub repository URL
- **data-size**: Button size (`"large"` or standard)
- **data-show-count**: Whether to display the star count
- **data-icon**: Icon to display (default is star)
- **aria-label**: Accessibility label

## How It Works

The button works by embedding an iframe from GitHub's official button API. This means:

1. GitHub handles the authentication and star count retrieval
2. The star count is always current
3. The UI remains consistent with GitHub's branding

## Format for GitHub Repository Links

For GitHub repository links in the entries data, follow this format:

```js
{
  // Other entry properties...
  github: "owner/repo" // For example: "langchain-ai/langchain"
}
```

The GitHub button requires the full repository path in the format `owner/repo`.

## Benefits Over Previous Implementation

Our previous implementation used GitHub's GraphQL API, which required:

1. Creating and managing a GitHub Personal Access Token
2. Implementing complex GraphQL queries
3. Handling rate limiting and error scenarios
4. Setting up secure token storage in GitHub Actions

The new implementation eliminates these requirements while providing a more reliable solution. 