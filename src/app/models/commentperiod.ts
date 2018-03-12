import { Comment } from './comment';
import { Document } from './document';
import { Project } from './project';

export class CommentPeriod {
  _id: number;
  isPublished: boolean;
  dateCompleted: Date;
  dateStarted: Date;
  openHouses: any;
  additionalText: string;
  informationLabel: string;
  relatedDocuments: Array<Document>;
  comments: Array<Comment>;
  project: Project;
  status: string;
  vcs: Array<any>;
  constructor(obj?: any) {
    this._id = obj && obj._id || null;
    this.isPublished = obj && obj.isPublished || false;
    this.dateCompleted = obj && obj.dateCompleted || null;
    this.dateStarted = obj && obj.dateStarted || null;
    this.openHouses = obj && obj.openHouses || null;
    this.additionalText = obj && obj.additionalText || '';
    this.informationLabel = obj && obj.informationLabel || '';
    this.relatedDocuments = obj && obj.relatedDocuments || [];
    this.comments = obj && obj.comments || [];
    this.project = obj && obj.project || null;
    this.status = obj && obj.status || '';
    this.vcs = obj && obj.vcs || [];
  }
}
