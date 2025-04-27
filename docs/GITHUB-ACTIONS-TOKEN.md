# Using GitHub Tokens Securely in GitHub Actions

This guide explains how GitHub tokens are used securely in our GitHub Actions workflows for the AI Data Foundation website.

## How It Works

The GitHub GraphQL API integration for star counts is automatically configured when deploying through GitHub Actions. This provides several benefits:

1. **No manual token management**: You don't need to create or manage personal access tokens
2. **Automatic security**: Tokens are securely handled by GitHub Actions
3. **Proper scoping**: The token has only the permissions it needs
4. **No exposure**: The token is never committed to the repository or exposed in logs

## Workflow Configuration

In our GitHub Actions workflow (`.github/workflows/node.yml`), we do the following:

1. Use the built-in `GITHUB_TOKEN` secret provided by GitHub Actions
2. Create a temporary `.env` file during the build process
3. Set the `VITE_GITHUB_TOKEN` environment variable for the build command
4. The token is available during build time but never stored in the repository

```yaml
# Create .env file with GitHub token
- name: Create environment file
  run: |
    echo "VITE_GITHUB_TOKEN=${{ secrets.GITHUB_TOKEN }}" > .env
  shell: bash

# Build the project with GitHub token
- name: Build the project
  run: npm run build
  env:
    VITE_GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Token Permissions

The default `GITHUB_TOKEN` provided by GitHub Actions has the necessary permissions to:

- Read public repository information (including star counts)
- Query the GitHub GraphQL API with the appropriate scopes

## For Local Development

When developing locally, you still need to set up a personal access token as described in the [GitHub API Setup](../GITHUB-API-SETUP.md) guide.

## Troubleshooting

If you encounter issues with the GitHub token in GitHub Actions:

1. Check the GitHub Actions logs for any token-related errors
2. Verify that the repository has the correct workflow permissions
3. Ensure the GraphQL queries are correctly formatted and requesting only accessible data

## Security Best Practices

- Never print or log the token value in your code or build scripts
- Don't modify the token handling in the workflow without understanding the security implications
- If using a custom token, store it as a repository secret, not in code

For more information on GitHub Actions security, see the [GitHub Actions documentation](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions). 