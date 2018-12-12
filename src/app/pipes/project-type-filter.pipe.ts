import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'projectTypeFilter'
})
export class ProjectTypeFilterPipe implements PipeTransform {

    transform(value: Project[], q: string) {
        if (!q || q === '') {
          return value;
        }
        const filterList = q.split(',');
        const completeList = value;
        value = value.filter(item => -1 < item.type.toLowerCase().indexOf(filterList[0].toLowerCase()));
        filterList.forEach(function(currentFilter){
          if (currentFilter !== filterList[0]) {
            let temp = completeList;
            temp = temp.filter(item => -1 < item.type.toLowerCase().indexOf(currentFilter.toLowerCase()));
            temp.forEach(function(currentProject){
              value.push(currentProject);
            });
          }
        });
        return value;
    }
}
