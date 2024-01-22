# chameleon - README

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **Crafted with [Nx](https://nx.dev): a smart, fast, and extensible build system.** ✨

Welcome to the chameleon project, a full-stack application that embodies adaptability and modern web development practices.

## Getting Started 🚀

This section will guide you through setting up your local development environment for chameleon.

### Prerequisites

Before you begin, ensure that you have the following installed:

&#x2705; Node.js (v18.19.0)

### Cloning the Repository

To start contributing to chameleon, clone the repository using the following command:

```sh
git clone https://github.com/Ionia-Devs/chameleon.git
```

Once cloned, navigate to the chameleon directory:

```sh
cd chameleon
```

### Environment Setup 🌐

1. **Create an `.env` file** from the `.env.example` template:

   ```sh
   cp .env.example .env
   ```

2. **Fill in the `.env` file** with the necessary environment variables provided by your teammate.

### Installing pnpm 📥

**pnpm** is our package manager of choice. To install pnpm, use one of the following methods:

- With Homebrew:

  ```sh
  brew install pnpm
  ```

- With npm:

  ```sh
  npm install -g pnpm
  ```

After installing pnpm, install the project dependencies:

```sh
pnpm i
```

### Nx Console Plugin 🖥️

Leverage the Nx Console VSCode Extension for a GUI that aids in command execution and component generation.

- **Name**: Nx Console
- **Marketplace**: [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)

### Running the Application 🏃‍♂️

#### Using Nx Console

Locate and execute the `dev` command within the chameleon workspace commands.

![NX Console](https://i.imgur.com/jiVGAk2.png)

#### Using the Command Line

Alternatively, you can start the application with:

```sh
pnpm exec nx run chameleon:dev
```

#### Access Points 🌐

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:9991/graphql`

## Development Tools and Resources 🧰

- **Shadcn UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **GraphQL with WunderGraph**: [WunderGraph Docs](https://docs.wundergraph.com/)
- **TailwindCSS**: [TailwindCSS Docs](https://v2.tailwindcss.com/docs)
- **Radix UI Components**: [Radix UI Docs](https://www.radix-ui.com/primitives/docs/overview/introduction) and [Radix Icons](https://www.radix-ui.com/icons)

## Branching and Pull Requests

We use feature branches for development:

1. **Create a new branch** for your feature or fix. The branch name should start with the number of the ticket you are working on, followed by a descriptive name in kebab-case. For example, `32-example-branch-name`.
2. **Make your changes** and commit them with clear messages.
3. **Push your branch** to the main repository.
4. **Open a pull request** (PR) against the `main` branch in the GitHub repository.

For a step-by-step guide, GitHub's documentation on [creating a pull request from a branch](https://docs.github.com/en/pull-requests) is a great resource.

## Linking Pull Requests to Issues

For enhanced project tracking, ensure you link your pull requests to their corresponding issues:

1. **Reference the issue** in your pull request description using keywords like `closes`, `fixes`, or `resolves` followed by the issue number.
2. **Use the sidebar in the pull request or issue** to manually link to the relevant issue under the 'Development' section.
3. **Check your work**: When the PR is merged, the linked issues will close automatically, indicating the associated tasks are completed.

For more on linking PRs to issues, visit the [GitHub Guide](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).

## GitHub Projects Board

Stay updated with our progress and keep track of tasks on our [GitHub Projects Board](https://github.com/orgs/Ionia-Devs/projects/2).

## Production Environments 🌍

The project is live and accessible to users. Here's where you can find the production environments:

- **Frontend**: The user interface is available at [chameleon-sandy.vercel.app](https://chameleon-sandy.vercel.app/).
- **Backend**: Our server-side operations can be accessed at [chameleon-production.up.railway.app](https://chameleon-production.up.railway.app/).

## Support

If you encounter issues, please file a ticket in the issue tracker or contact one of the project maintainers.

## Stay Connected 🌟

Join the conversation and follow along with project updates in the discord!
