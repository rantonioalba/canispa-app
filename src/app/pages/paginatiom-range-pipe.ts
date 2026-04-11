import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginatiomRange'
})
export class PaginatiomRangePipe implements PipeTransform {

  transform(totalPages: number, currentPage: number): (number | string)[] {
    if (!totalPages || totalPages <= 0) {
      return [];
    }

    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    // Calculate the range of pages to show
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    // Add dots where there are gaps
    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

}
