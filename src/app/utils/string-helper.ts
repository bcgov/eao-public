/**
 * Re-usable helper methods for strings.
 * @export StringHelper
 * @class StringHelper
 */
export class StringHelper {
  /**
   * For each word, separated by spaces or hyphens, in the string: convert the first letter
   * to upper case and the remaining letters to lower case.
   * Example:
   *   "some lowercase-words" => "Some Lowercase-Words"
   * @static
   * @param {string} value string to convert.
   * @returns the converted string or the original string if it is empty, null, or undefined.
   * @memberof StringHelper
   */
  static toProperCase(value: string) {
    if (!value) {
      return value;
    }
    return value.replace(/\w*[\s\-]*/g, function(str) {
      return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });
  }
}
