export const useIterNumberArray = (arr: Array<number>, defaultValue: number) => {
  const array = Array.from(new Set(arr)).sort((a, b) => a - b);

  const predecessor = (currentElement: number): number => {
    if (array.length == 0) return defaultValue;
    if (currentElement > array[array.length - 1]) {
      return array[array.length - 1];
    }
    if (currentElement <= array[0]) {
      return array[0];
    }
    // This loop will always return an array value
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i] < currentElement) return array[i];
    }
    // We need to a return value for TS to infer that we cannot return undefined
    return defaultValue;
  };

  const successor = (currentElement: number): number => {
    if (array.length == 0) return defaultValue;
    if (currentElement >= array[array.length - 1]) {
      return array[array.length - 1];
    }
    if (currentElement < array[0]) {
      return array[0];
    }
    defaultValue;
    // This loop will always return an array value
    for (var i = 0; i < array.length; i++) {
      if (array[i] > currentElement) return array[i];
    }
    // We need to a return value for TS to infer that we cannot return undefined
    return defaultValue;
  };

  return [predecessor, successor];
};
