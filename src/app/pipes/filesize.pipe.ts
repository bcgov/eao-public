import {Pipe, PipeTransform} from '@angular/core';
import * as filesize from 'filesize';

/*
 * The pipe uses filesize.js to transform a number representing a file size in bytes
 * into a human-readable size. It accepts optional settings to furter customise the output.
 * For a list of all the options, please refer to the official documentation for  filesize.js.
 * https://filesizejs.com
 *
 * The pipe takes inspiration from https://github.com/amitdahan/ngx-filesize
 */
@Pipe({
    name: 'filesize'
})

export class FileSizePipe implements PipeTransform {
    private static transformOne(value: number, options?: any): string {
        return filesize(value, options);
    }

    transform(value: number | number[], options?: any) {
        if (Array.isArray(value)) {
            return value.map(val => FileSizePipe.transformOne(val, options));
        }

        return FileSizePipe.transformOne(value, options);
    }
}
