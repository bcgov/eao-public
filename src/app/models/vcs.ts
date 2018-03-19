export class ValuedComponent {
  _id: number;
  name: string;
  isPublished: boolean;
  constructor(obj?: any) {
    this._id = obj && obj._id || null;
    this.name = obj && obj.name || '';
    this.isPublished = obj && obj.isPublished || false;
  }
}
