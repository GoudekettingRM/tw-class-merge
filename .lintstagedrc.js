const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const tscLintCommand = (filenames) => 'tsc -p tsconfig.json';

module.exports = {
  'network/backendApiRoutes.json': ['node bin/sortRoutes.js'],
  '*': ['prettier --write'],
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{ts,tsx,d.ts}': [tscLintCommand],
};
