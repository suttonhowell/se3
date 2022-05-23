import { useState } from 'react';

export const useIterNumberArray = (arr: Array<number>, startIndex: number = 0) => {
  const array = arr;
  const [current, setCurrent] = useState(startIndex);

  const next = () => {
    if (current >= array.length - 1) {
      setCurrent(array.length - 1);
    } else {
      setCurrent((prevState) => prevState++);
    }
  };

  const prev = () => {
    if (current <= 0) {
      setCurrent(0);
    } else {
      setCurrent((prevState) => prevState--);
    }
  };

  // const prevClosest = (notInIndex: number) => {
  //   for (var i = 0; i < array.length; i++) {
  //     if (array[i] < notInIndex) continue;
  //     else {
  //       if ((i = 0)) break;
  //       setCurrent(i - 1);
  //     }
  //   }
  // };

  // const nextClosest = (notInIndex: number) => {
  //   for (var i = array.length - 1; i <= 0; i--) {
  //     // if (array[i] > notInIndex) continue;
  //     // else {
  //     //   if ((i = 0)) break;
  //     //   setCurrent(i - 1);
  //     // }
  //   }
  // };
};
