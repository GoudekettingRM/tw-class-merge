# Contributing to @goudekettingrm/merge-classes

We welcome contributions to @goudekettingrm/merge-classes! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/tw-class-merge.git`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b your-feature-name`
5. Make your changes
6. Run tests: `npm test`
7. Commit your changes: `git commit -m "Add some feature"`
8. Push to the branch: `git push origin your-feature-name`
9. Submit a pull request

## Code Style

We use ESLint and Prettier to maintain code style. Please ensure your code passes linting before submitting a pull request:

```bash
npm run lint
npm run format
```

## Testing

Please add tests for any new features or bug fixes. Run the test suite with:

```bash
npm test
```

## Changesets

We use Changesets to manage versions and changelogs. When making a change that needs to be released, please run:

```bash
npm run changeset
```

This will prompt you to describe your changes and will create a new file in the .changeset directory.

## Pull Request Process

- Ensure your code passes all tests and linting
- Update the README.md with details of changes to the interface, if applicable
- Add a changeset if your change should be released
- Your pull request will be reviewed by a maintainer

Thank you for contributing to @goudekettingrm/tw-class-merge!
