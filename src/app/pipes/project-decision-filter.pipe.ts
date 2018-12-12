import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'projectDecisionFilter'
})
export class ProjectDecisionFilterPipe implements PipeTransform {
  transform(value: Project[], q: string) {
    if (!q) {
      return value;
    }
    const filterList = q.split(',');
    const completeList = value;
    // apply the first filter
    value = value.filter(item => -1 < item.eacDecision.toLowerCase().indexOf(filterList[0].toLowerCase()));
    // if more tan one filter apply the rest
    filterList.forEach(function(currentFilter){
      // alert('you are in the first for each loop, the list of filters is: ' + filterList.toString());
      if (currentFilter !== filterList[0]) {
        // alert('you are in if statement, this is not the first item in the array, current filter is: ' + currentFilter);
        let temp = completeList;
        temp = temp.filter(item => -1 < item.eacDecision.toLowerCase().indexOf(currentFilter.toLowerCase()));
        temp.forEach(function(currentProject){
          // alert('you are in the second for each loop');
          value.push(currentProject);
        });
      }
    });
    return value;
  }
}
