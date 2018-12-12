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
    const filterList = q.split(',');
    const completeList = value;
    value = value.filter(item => {
      if (item.proponent && item.proponent.name) {
        return -1 < item.proponent.name.toLowerCase().indexOf(filterList[0].toLowerCase());
      }
    });
    filterList.forEach(function(currentFilter){
      if (currentFilter !== filterList[0]) {
        let temp = completeList;
        temp = temp.filter(item => {
          if (item.proponent && item.proponent.name) {
            return -1 < item.proponent.name.toLowerCase().indexOf(currentFilter.toLowerCase());
          }
        });
        temp.forEach(function(currentProject){
          value.push(currentProject);
        });
      }
    });
    return value;
  }
}
