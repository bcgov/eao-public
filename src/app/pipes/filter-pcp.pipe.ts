import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'filterPCP'
})
export class FilterPCPPipe implements PipeTransform {

    transform(value: Project[], q: string) {
        if (!q || q === '') {
            return value;
        }
        return value.filter(item => -1 < item.openCommentPeriod.toLowerCase().indexOf(q.toLowerCase()));
    }
}
