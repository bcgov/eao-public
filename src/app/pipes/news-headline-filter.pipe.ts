import { Pipe, PipeTransform } from '@angular/core';
import { News } from '../models/news';

@Pipe({
  name: 'newsHeadlineFilter'
})
export class NewsHeadlineFilterPipe implements PipeTransform {

    transform(value: News[], q: string) {
        if (!q || q === '') {
            return value;
        }
        return value.filter(item => -1 < item.headline.toLowerCase().indexOf(q.toLowerCase()));
    }
}
