export const IterArray = (arr: Array<any>, startIndex: number = 0) => ({
  current: startIndex,
  arr,
  next() {
    if (this.current >= this.arr.length - 1) {
      this.current = this.arr.length - 1;
    } else {
      this.current++;
    }
    // return this.arr[this.current];
  },
  prev() {
    if (this.current <= 0) {
      this.current = 0;
    } else {
      this.current--;
    }
    // return this.arr[this.current];
  },
});
