import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'projectPhaseFilter'
})
export class PhaseFilterPipe implements PipeTransform {
  transform(value: Project[], q: string) {
    if (!q) {
      return value;
    }
    const filterList = q.split(',');
    const completeList = value;
    value = value.filter(item => -1 < item.currentPhase.name.toLowerCase().indexOf(filterList[0].toLowerCase()));
    filterList.forEach(currentFilter => {
      if (currentFilter !== filterList[0]) {
        let temp = completeList;
        temp = temp.filter(item => -1 < item.currentPhase.name.toLowerCase().indexOf(currentFilter.toLowerCase()));
        temp.forEach(currentProject => {
          value.push(currentProject);
        });
      }
    });
    return value;
  }
}
