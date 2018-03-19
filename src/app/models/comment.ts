import { Document } from './document';
import { ValuedComponent } from './vcs';

export class Comment {
  _id: number;
  isPublished: boolean;
  dateUpdated: Date;
  dateAdded: string;
  isAnonymous: boolean;
  author: string;
  documents: Array<any>;
  comment: string;
  vcs: Array<ValuedComponent>;
  constructor(obj?: any) {
    this._id = obj && obj._id || null;
    this.isPublished = obj && obj.isPublished || false;
    this.dateUpdated = obj && obj.dateUpdated || null;
    this.dateAdded = obj && obj.dateAdded || '';
    this.isAnonymous = obj && obj.isAnonymous || true;
    this.author = obj && obj.author || '';
    this.documents = obj && obj.documents || [];
    this.comment = obj && obj.comment || '';
    this.vcs = obj && obj.valuedComponents || [];
  }
}
