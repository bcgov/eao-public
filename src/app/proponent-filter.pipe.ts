import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './models/project';
import { Proponent } from './models/proponent';

@Pipe({
  name: 'proponentFilter'
})
export class ProponentFilterPipe implements PipeTransform {

    transform(value: Project[], q: Proponent) {
        if (!q) {
            return value;
        }
        return value.filter(item => -1 < item.proponent.name.toLowerCase().indexOf(q.name.toLowerCase()));
    }

}
