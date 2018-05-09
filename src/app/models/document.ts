
import * as filesize from 'filesize';
export class Document {
  _id: number;
  isPublished: boolean;
  documentFileURL: string;
  displayName: string;
  internalSize: number;
  fileSize: string;
  constructor(obj?: any) {
    this._id = obj && obj._id || null;
    this.isPublished = obj && obj.isPublished || false;
    this.documentFileURL = obj && obj.documentFileURL || null;
    this.displayName = obj && obj.displayName || null;
    this.internalSize = obj && obj.internalSize || null;
    // TODO: use a proper filter such as https://github.com/amitdahan/ngx-filesize when upgrading angular
    this.fileSize = obj && obj.internalSize && filesize(obj.internalSize) || null;
  }
}
