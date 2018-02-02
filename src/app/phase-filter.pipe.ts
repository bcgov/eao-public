import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './models/project';
import { CurrentPhase } from './models/currentphase';

@Pipe({
  name: 'projectPhaseFilter'
})
export class PhaseFilterPipe implements PipeTransform {

    transform(value: Project[], q: string) {
        if (!q) {
            return value;
        }
        return value.filter(item => -1 < item.currentPhase.name.toLowerCase().indexOf(q.toLowerCase()));
    }
}
