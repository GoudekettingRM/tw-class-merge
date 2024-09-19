const mergeClasses = (baseClasses: string, passedClasses: string): string => {
  const baseSet = new Set<string>(baseClasses.split(/\s+/).filter(Boolean));
  const passedSet = new Set<string>(passedClasses.split(/\s+/).filter(Boolean));

  const getClassParts = (
    cls: string
  ): { prefix: string; property: string; rest: string; isNegative: boolean } => {
    const parts = cls.split(':');
    const basePart = parts[parts.length - 1];
    const prefix = parts.slice(0, -1).join(':');
    const isNegative = basePart.startsWith('-');
    const [property, ...rest] = basePart.replace(/^[-!]/, '').split('-');
    return { prefix, property, rest: rest.join('-'), isNegative };
  };

  const isBracketedClass = (cls: string): boolean => {
    return cls.startsWith('[') && cls.endsWith(']');
  };

  const extractBracketedParts = (cls: string): { specifier: string; value: string | null } => {
    const bracketStart = cls.indexOf('[');
    const bracketEnd = cls.indexOf(']');
    const specifier = cls.slice(bracketStart + 1, bracketEnd);
    const [spec, value] = specifier.split(':');

    return {
      specifier: spec,
      value: value || null,
    };
  };

  const isConflicting = (cls1: string, cls2: string): boolean => {
    if (isBracketedClass(cls1) && isBracketedClass(cls2)) {
      const parts1 = extractBracketedParts(cls1);
      const parts2 = extractBracketedParts(cls2);

      return parts1.specifier === parts2.specifier;
    }

    const parts1 = getClassParts(cls1);
    const parts2 = getClassParts(cls2);

    return (
      parts1.prefix === parts2.prefix &&
      parts1.property === parts2.property &&
      (parts1.rest !== parts2.rest ||
        parts1.rest === '' ||
        parts2.rest === '' ||
        parts1.isNegative !== parts2.isNegative)
    );
  };

  const mergedSet = new Set<string>();

  for (const passedClass of passedSet) {
    mergedSet.add(passedClass);
  }

  for (const baseClass of baseSet) {
    if (![...passedSet].some((passedClass) => isConflicting(baseClass, passedClass))) {
      mergedSet.add(baseClass);
    }
  }

  return Array.from(mergedSet).join(' ');
};

export { mergeClasses };
