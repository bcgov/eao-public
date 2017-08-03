import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './models/project';

@Pipe({
  name: 'projectDecisionFilter'
})
export class ProjectDecisionFilterPipe implements PipeTransform {

    transform(value: Project[], q: string) {
        if (!q || q === '') {
            return value;
        }
        return value.filter(item => -1 < item.eacDecision.toLowerCase().indexOf(q.toLowerCase()));
    }
}
