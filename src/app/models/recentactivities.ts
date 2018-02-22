export class RecentActivities {
  _id: number;
  dateAdded: Date;
  documentUrl: string;
  contentUrl: string;
  content: string;
  headline: string;
  constructor(obj?: any) {
    this._id = obj && obj._id || null;
    this.dateAdded = obj && obj.dateAdded || null;
    this.documentUrl = obj && obj.documentUrl || null;
    this.contentUrl = obj && obj.contentUrl || null;
    this.content = obj && obj.content || null;
    this.headline = obj && obj.headline || null;
  }
}
