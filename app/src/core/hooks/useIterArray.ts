export const useIterNumberArray = (arr: Array<number>) => {
  const array = arr;

  const prevClosest = (notInIndex: number) => {
    if (notInIndex > array[array.length - 1]) {
      return array[array.length - 1];
    }
    if (notInIndex <= array[0]) {
      return array[0];
    }
    var retval = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i] < notInIndex) continue;
      retval = array[i - 1];
      break;
    }
    return retval;
  };

  const nextClosest = (notInIndex: number): number => {
    if (notInIndex >= array[array.length - 1]) {
      return array[array.length - 1];
    }
    if (notInIndex < array[0]) {
      return array[0];
    }
    var retval = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i] <= notInIndex) continue;
      retval = array[i];
      break;
    }
    return retval;
  };

  return [prevClosest, nextClosest];
};
