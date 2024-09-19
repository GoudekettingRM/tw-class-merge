# @goudekettingrm/tw-class-merge

A utility function to merge Tailwind CSS classes, handling conflicts and preserving specificity.

## Rationale

I kept having issues where I had components that optionally needed different styling on a case-by-case basis. However, every time I would pass classes, the specificity that is built into Tailwind CSS would kick in and, for example, a class passed in as `mt-4` would be overshadowed by the `mt-2` that was already on the component itself. To prevent making every class that I pass important, I made a little merge script for the classes.

## Installation

```bash
npm install @goudekettingrm/tw-class-merge
```
or
```bash
yarn add @goudekettingrm/tw-class-merge
```

## Usage

```ts
import { mergeClasses } from '@goudekettingrm/merge-classes';

const baseClasses = 'mt-4 -px-2 py-12 max-w-fit sm:mt-6 hover:bg-blue-500';
const passedClasses = 'pl-2 mt-12 mb-6 prose sm:-mt-2 hover:bg-red-500 md:px-4';

const result = mergeClasses(baseClasses, passedClasses);
console.log(result);
// Output: 'py-12 max-w-fit pl-2 mt-12 mb-6 prose sm:-mt-2 hover:bg-red-500 md:px-4 -px-2'
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
