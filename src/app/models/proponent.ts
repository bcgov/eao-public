export class Proponent {
  _id: number;
  name: string;
  constructor(obj?: any) {
    this._id = (obj && obj._id) || null;
    this.name = (obj && obj.name) || null;
  }
}
