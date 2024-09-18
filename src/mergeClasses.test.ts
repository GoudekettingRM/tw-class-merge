import { mergeClasses } from './mergeClasses';

describe('mergeClasses', () => {
  it('should merge classes correctly', () => {
    const baseClasses = 'mt-4 -px-2 py-12 max-w-fit hover:bg-blue-500';
    const passedClasses = 'pl-2 mt-12 mb-6 prose sm:-mt-2 hover:bg-red-500 md:px-4';
    const result = mergeClasses(baseClasses, passedClasses);
    expect(result).toBe(
      '-px-2 py-12 max-w-fit pl-2 mt-12 mb-6 prose sm:-mt-2 hover:bg-red-500 md:px-4'
    );
  });
});
