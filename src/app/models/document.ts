export class Document {
  _id: number;
  isPublished: boolean;
  documentFileURL: string;
  displayName: string;
  constructor(obj?: any) {
    this._id = obj && obj._id || null;
    this.isPublished = obj && obj.isPublished || false;
    this.documentFileURL = obj && obj.documentFileURL || null;
    this.displayName = obj && obj.displayName || null;
  }
}
