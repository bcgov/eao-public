import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'projectDecisionDateFilter'
})
export class ProjectDecisionDateFilterPipe implements PipeTransform {
  transform(value: Project[], q: string) {
    if (!q) {
      return value;
    }
    // remove null entries for projects that haven't come to a decision yet
    value = value.filter(item => item.decisionDate != null);
    const filterListSortedDecending = q.split(',').map(Number).sort(function(a, b){return b - a; }).map(String);
    const completeList = value;
    const date = value[0].decisionDate;
    value = value.filter(item => -1 < item.decisionDate.toString().split('-')[0].indexOf(filterListSortedDecending[0]));
    filterListSortedDecending.forEach(currentFilter => {
      if (currentFilter !== filterListSortedDecending[0]) {
        let temp = completeList;
        temp = temp.filter(item => -1 < item.decisionDate.toString().split('-')[0].indexOf(currentFilter));
        temp.forEach(currentProject => {
          value.push(currentProject);
        });
      }
    });
    return value;
  }
}
