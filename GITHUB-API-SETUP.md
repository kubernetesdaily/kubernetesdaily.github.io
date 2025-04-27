# GitHub API Setup for Star Counts

This project uses GitHub's GraphQL API to fetch star counts for repositories. To make this work correctly, you need to set up a GitHub personal access token.

## Automated Setup with GitHub Actions

If you're deploying using GitHub Actions, the token is **automatically handled** by our workflow. You don't need to do anything manually. See [GitHub Actions Token Guide](docs/GITHUB-ACTIONS-TOKEN.md) for details.

## Manual Setup for Local Development

For local development or manual deployments, follow these steps to set up your GitHub token:

### Setting Up Your GitHub Token

1. Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens) page
2. Click "Generate new token" > "Generate new token (classic)"
3. Give it a descriptive name like "AI Data Foundation Star Count"
4. Select the following scopes:
   - `read:user`
   - `public_repo`
5. Click "Generate token"
6. Copy the generated token (you'll only see it once!)

### Adding Your Token to the Project

There are two ways to add your token for local development:

#### Method 1: Environment Variable File (Development)

Create a `.env.local` file in the root of the project:

```
VITE_GITHUB_TOKEN=your_github_token_here
```

Replace `your_github_token_here` with the token you generated.

#### Method 2: Environment Variables in Deployment

If you're deploying this site on a platform like Vercel or Netlify, add the environment variable `VITE_GITHUB_TOKEN` in your deployment settings.

## Security Considerations

- **Never commit your token to the repository**
- The token only needs read access to public repositories
- If you accidentally expose your token, revoke it immediately and generate a new one

## Troubleshooting

If you see GitHub API errors in the console:

1. Check that your token is correctly set up
2. Verify that the token has the correct permissions
3. Check if you've hit GitHub's API rate limits

For more information, see [GitHub's GraphQL API documentation](https://docs.github.com/en/graphql). 