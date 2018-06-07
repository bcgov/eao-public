import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'proponentFilter'
})
export class ProponentFilterPipe implements PipeTransform {
  transform(value: Project[], q: string) {
    if (!q) {
      return value;
    }
    return value.filter(item => {
      if (item.proponent && item.proponent.name) {
        return item.proponent.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
      }
      return false;
    });
  }
}
