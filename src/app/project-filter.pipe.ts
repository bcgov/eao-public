import { Pipe, PipeTransform } from '@angular/core';
import { News } from './models/news';

@Pipe({
  name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {

    transform(value: News[], q: string) {
        if (!q || q === '') {
            return value;
        }
        return value.filter(item => item.headline.toLowerCase().startsWith(q.toLowerCase()));
    }
}
