import { Proponent } from './proponent';
import { CurrentPhase } from './currentphase';
import { RecentActivities } from './recentactivities';

export class Project {
  _id: number;
  code: string;
  name: string;
  proponent: Proponent;
  description: string;
  status: string;
  type: string;
  openCommentPeriod: string;
  eacDecision: string;
  currentPhase: CurrentPhase;
  region: string;
  location: string;
  projectLead: string;
  projectLeadEmail: string;
  projectLeadPhone: string;
  responsibleEPD: string;
  responsibleEPDEmail: string;
  responsibleEPDPhone: string;
  CELead: string;
  CELeadEmail: string;
  CELeadPhone: string;
  recent_activities: [RecentActivities];
  constructor(obj?: any) {
    this._id = obj && obj._id || null;
    this.code = obj && obj.code || null;
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
    this.proponent = obj && obj.proponent || null;
    this.status = obj && obj.status || null;
    this.type = obj && obj.type || null;
    this.openCommentPeriod = obj && obj.openCommentPeriod || null;
    this.eacDecision = obj && obj.eacDecision || null;
    this.currentPhase = obj && obj.currentPhase || null;
    this.region = obj && obj.region || null;
    this.location = obj && obj.location || null;
    this.projectLead = obj && obj.projectLead || null;
    this.responsibleEPD = obj && obj.responsibleEPD || null;
    this.CELead = obj && obj.CELead || null;
    this.recent_activities = obj && obj.recent_activities || null;
  }
}
