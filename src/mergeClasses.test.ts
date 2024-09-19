import { mergeClasses } from './mergeClasses';

describe('mergeClasses', () => {
  const sortClasses = (classes: string) => classes.split(' ').sort().join(' ');

  it('should merge classes correctly', () => {
    const baseClasses = 'mt-4 -px-2 py-12 max-w-fit hover:bg-blue-500';
    const passedClasses = 'pl-2 mt-12 mb-6 prose sm:-mt-2 hover:bg-red-500 md:px-4';
    const result = mergeClasses(baseClasses, passedClasses);
    expect(sortClasses(result)).toBe(
      sortClasses('-px-2 py-12 max-w-fit pl-2 mt-12 mb-6 prose sm:-mt-2 hover:bg-red-500 md:px-4')
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
    expect(sortClasses(mergeClasses(base, passed))).toBe(
      sortClasses('md:mt-6 sm:mt-2 lg:mt-10 xl:mt-12')
    );
  });

  it('should handle pseudo-class variants', () => {
    const base = 'hover:bg-blue-500 focus:outline-none';
    const passed = 'hover:bg-red-500 active:bg-green-500';
    expect(sortClasses(mergeClasses(base, passed))).toBe(
      sortClasses('focus:outline-none hover:bg-red-500 active:bg-green-500')
    );
  });

  it('should handle whitespace correctly', () => {
    expect(sortClasses(mergeClasses('  mt-4      mb-6  ', ' mt-8   '))).toBe('mb-6 mt-8');
  });

  it('should handle classes with more than one hyphen', () => {
    expect(mergeClasses('col-span-3', 'col-span-6')).toBe('col-span-6');
  });

  it('should handle conflicting classes with different units', () => {
    expect(mergeClasses('m-4', 'm-[10px]')).toBe('m-[10px]');
    expect(mergeClasses('w-1/2', 'w-[50%]')).toBe('w-[50%]');
  });

  it('should handle important classes', () => {
    expect(mergeClasses('!mt-4', 'mt-6')).toBe('mt-6');
    expect(mergeClasses('mt-4', '!mt-6')).toBe('!mt-6');
    expect(mergeClasses('!mt-4', '!mt-6')).toBe('!mt-6');
  });

  it('should handle group and peer variants like other modifiers', () => {
    expect(sortClasses(mergeClasses('group-hover:mt-4', 'peer-focus:mt-6'))).toBe(
      sortClasses('group-hover:mt-4 peer-focus:mt-6')
    );
    expect(mergeClasses('group-hover:mt-4', 'group-hover:mt-6')).toBe('group-hover:mt-6');
  });

  it('should handle arbitrary properties', () => {
    expect(mergeClasses('[&>*]:mt-4', '[&>*]:mt-6')).toBe('[&>*]:mt-6');
    expect(mergeClasses('[mask-type:alpha]', '[mask-type:luminance]')).toBe(
      '[mask-type:luminance]'
    );
    expect(sortClasses(mergeClasses('[mask-type:alpha]', '[transform:rotate(45deg)]'))).toBe(
      sortClasses('[mask-type:alpha] [transform:rotate(45deg)]')
    );
  });

  it('should handle negative values', () => {
    expect(sortClasses(mergeClasses('mt-4 -mx-2', '-mt-2 mx-4'))).toBe(sortClasses('-mt-2 mx-4'));
  });

  it('should handle dark mode classes like other modifiers', () => {
    expect(sortClasses(mergeClasses('dark:mt-4', 'mt-6 dark:mt-8'))).toBe(
      sortClasses('mt-6 dark:mt-8')
    );
    expect(sortClasses(mergeClasses('dark:hover:mt-4', 'dark:focus:mt-6'))).toBe(
      sortClasses('dark:hover:mt-4 dark:focus:mt-6')
    );
    expect(mergeClasses('dark:hover:mt-4', 'dark:hover:mt-6')).toBe('dark:hover:mt-6');
  });

  it('should handle complex combinations of modifiers', () => {
    expect(
      sortClasses(
        mergeClasses('sm:hover:mt-4 md:focus:mt-6', 'lg:group-hover:mt-8 xl:peer-focus:mt-10')
      )
    ).toBe(sortClasses('sm:hover:mt-4 md:focus:mt-6 lg:group-hover:mt-8 xl:peer-focus:mt-10'));
    expect(
      sortClasses(mergeClasses('sm:hover:mt-4 md:focus:mt-6', 'sm:hover:mt-8 md:focus:mt-10'))
    ).toBe(sortClasses('sm:hover:mt-8 md:focus:mt-10'));
  });

  it('should always prioritize passed classes over base classes', () => {
    expect(sortClasses(mergeClasses('mt-4 px-2 py-1', 'mt-6 px-4'))).toBe(
      sortClasses('py-1 mt-6 px-4')
    );
    expect(sortClasses(mergeClasses('sm:mt-4 md:px-2 lg:py-1', 'sm:mt-6 md:px-4'))).toBe(
      sortClasses('lg:py-1 sm:mt-6 md:px-4')
    );
    expect(
      sortClasses(mergeClasses('hover:bg-blue-500 focus:outline-none', 'hover:bg-red-500'))
    ).toBe(sortClasses('focus:outline-none hover:bg-red-500'));
  });
});
