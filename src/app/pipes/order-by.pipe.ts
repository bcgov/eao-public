import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(records: Array<any>, args: any): any {
    if (!args || !args.property || !args.direction) {
      return records;
    }

    return records.sort(function(a, b) {
      let aCompare = a[args.property];
      let bCompare = b[args.property];

      if (aCompare === null) {
        return 1;
      }

      if (bCompare === null) {
        return -1;
      }

      if (typeof aCompare === 'object' && !(aCompare instanceof Date)) {
        // MBL TODO: Assume name for sub-property.  Fix this to be more generic.
        if (aCompare.name === undefined) {
          return 0;
        }

        aCompare = aCompare.name;
        bCompare = bCompare.name;
      }

      if (typeof aCompare === 'string') {
        aCompare = aCompare.toLowerCase();
        bCompare = bCompare.toLowerCase();
      }

      if (aCompare < bCompare) {
        return -1 * args.direction;
      }

      if (aCompare > bCompare) {
        return 1 * args.direction;
      }

      return 0;
    });
  }
}
