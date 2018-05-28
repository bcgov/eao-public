import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'projectRegionFilter'
})
export class ProjectRegionFilterPipe implements PipeTransform {
  transform(value: Project[], q: string) {
    if (!q) {
      return value;
    }
    return value.filter(item => -1 < item.region.toLowerCase().indexOf(q.toLowerCase()));
  }
}
