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

  it('should handle empty strings', () => {
    expect(mergeClasses('', '')).toBe('');
    expect(mergeClasses('mt-4', '')).toBe('mt-4');
    expect(mergeClasses('', 'mt-4')).toBe('mt-4');
  });

  it('should handle different responsive prefixes', () => {
    const base = 'sm:mt-4 md:mt-6 lg:mt-8';
    const passed = 'sm:mt-2 lg:mt-10 xl:mt-12';
    expect(mergeClasses(base, passed)).toBe('md:mt-6 sm:mt-2 lg:mt-10 xl:mt-12');
  });

  it('should handle negative values correctly', () => {
    const base = 'mt-4 -mx-2';
    const passed = '-mt-2 mx-4';
    expect(mergeClasses(base, passed)).toBe('mt-4 -mt-2 mx-4');
  });

  it('should handle pseudo-class variants', () => {
    const base = 'hover:bg-blue-500 focus:outline-none';
    const passed = 'hover:bg-red-500 active:bg-green-500';
    expect(mergeClasses(base, passed)).toBe(
      'focus:outline-none hover:bg-red-500 active:bg-green-500'
    );
  });
});
