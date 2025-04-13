# GitHub Dashboard

A modern, comprehensive dashboard for monitoring and managing your GitHub repositories, workflows, and pull requests.

![GitHub Dashboard Preview](_docs/dashboard-preview.png)

## Overview

GitHub Dashboard provides real-time insights into your GitHub activity across organizations and repositories. Track workflow runs, pull requests, and repository metrics in one unified interface.

## Features

- **Repository Overview** - View detailed information about your repositories
- **Workflow Monitoring** - Track GitHub Actions workflow runs and their statuses
- **Pull Request Management** - Review and manage pull requests from a central dashboard
- **Organization Insights** - Access organization-level metrics and activity
- **Real-time Updates** - Stay current with live data synchronization

## Technologies

- Next.js
- React
- TypeScript
- GitHub API

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- GitHub account with personal access token

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/github-dashboard.git
   cd github-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your GitHub token:
   ```
   GITHUB_TOKEN=your_github_personal_access_token
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

You can customize the dashboard by modifying the configuration in `config/settings.js`:

- Change default organization view
- Configure refresh intervals
- Set up custom dashboard layouts
- Specify repositories to highlight

## Usage

After logging in with your GitHub credentials, you'll be presented with your dashboard showing:

- Overview of your repositories
- Recent workflow runs
- Active pull requests
- Organization activity

Navigate through the sidebar to access detailed views of specific repositories, workflows, or pull requests.

## Contributing

We welcome contributions to the GitHub Dashboard project! Here's how you can help:

1. **Fork the repository**

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes** and commit them:
   ```bash
   git commit -m 'Add some amazing feature'
   ```

4. **Push to your branch**:
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Add appropriate comments to your code

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- GitHub API
- Next.js team
- All our contributors
