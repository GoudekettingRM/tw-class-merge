export const mergeClasses = (baseClasses: string, passedClasses: string): string => {
  const baseSet = new Set<string>(baseClasses.split(' '));
  const passedSet = new Set<string>(passedClasses.split(' '));

  const mergedSet = new Set([...Array.from(baseSet), ...Array.from(passedSet)]);

  const getClassParts = (cls: string): { prefix: string; property: string; rest: string } => {
    const parts = cls.split(':');
    const basePart = parts[parts.length - 1];
    const prefix = parts.slice(0, -1).join(':');
    const [property, ...rest] = basePart.split('-');
    return { prefix, property, rest: rest.join('-') };
  };

  const isConflicting = (cls1: string, cls2: string): boolean => {
    const parts1 = getClassParts(cls1);
    const parts2 = getClassParts(cls2);

    return (
      parts1.prefix === parts2.prefix &&
      parts1.property === parts2.property &&
      (parts1.rest !== parts2.rest || parts1.rest === '' || parts2.rest === '')
    );
  };

  for (const passedClass of Array.from(passedSet)) {
    for (const baseClass of Array.from(baseSet)) {
      if (isConflicting(passedClass, baseClass) && passedClass !== baseClass) {
        mergedSet.delete(baseClass);
      }
    }
  }

  return Array.from(mergedSet).join(' ');
};
