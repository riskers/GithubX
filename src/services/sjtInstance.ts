/**
 * Star and Tags Join
 */

import { APISjt } from '@/services/db/starsJTags';
import { IDBSjt } from '@/services/idb/starsJTags';

export interface ISJTModal {
  id?: number;
  /**
   * star id
   */
  sid: number;
  /**
   * tag id
   */
  tid: number;
}

export interface ISJTStrategy {
  resetStarJTag(): Promise<void>;
  addSJT(tid: number, sid: number): Promise<void>;
  deleteSJT(tid: number, sid: number): Promise<void>;
  deleteSJTBySid(sid: number): Promise<void>;
  deleteSJTByTid(tid: number): Promise<void>;
}

class SjtIntance implements ISJTStrategy {
  private sjtInstance: ISJTStrategy;

  public constructor() {
    this.sjtInstance = new APISjt();
  }

  public async resetStarJTag(): Promise<void> {
    await this.sjtInstance.resetStarJTag();
  }

  public async addSJT(tid: number, sid: number): Promise<void> {
    await this.sjtInstance.addSJT(tid, sid);
  }

  public async deleteSJT(tid: number, sid: number): Promise<void> {
    await this.sjtInstance.deleteSJT(tid, sid);
  }

  public async deleteSJTBySid(sid: number): Promise<void> {
    await this.sjtInstance.deleteSJTBySid(sid);
  }

  public async deleteSJTByTid(tid: number): Promise<void> {
    await this.sjtInstance.deleteSJTByTid(tid);
  }
}

export const sjtIntance = new SjtIntance();
