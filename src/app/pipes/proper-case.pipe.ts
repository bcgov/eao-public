import { Pipe, PipeTransform } from '@angular/core';
import { StringHelper } from '../utils/string-helper';
/**
 * For each word, separated by spaces or hyphens, in the string: convert the first letter
 * to upper case and the remaining letters to lower case.
 * Example:
 *   "some lowercase-words" => "Some Lowercase-Words"
 * @export ProperCasePipe
 * @class ProperCasePipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'properCasePipe'
})
export class ProperCasePipe implements PipeTransform {
  transform(value: string) {
    if (!value) {
      return value;
    }
    return StringHelper.toProperCase(value);
  }
}
