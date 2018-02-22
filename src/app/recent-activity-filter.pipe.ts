import { Pipe, PipeTransform } from '@angular/core';
import { RecentActivities } from './models/recentactivities';

@Pipe({
  name: 'activitiesFilter'
})
export class RecentActivityFilterPipe implements PipeTransform {

    transform(value: RecentActivities[], q: string) {
        if (!q || q === '') {
            return value;
        }
        return value.filter(item => -1 < item.headline.toLowerCase().indexOf(q.toLowerCase()));
    }
}
