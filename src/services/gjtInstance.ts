import { APIGjt } from '@/services/db/gistsJTags';
import { IDBGjt } from '@/services/idb/gistsJTags';

/**
 * gists join tags
 */
export interface IGJTModal {
  id?: number;
  /**
   * gist id
   */
  gid: number;
  /**
   * tag id
   */
  tid: number;
}

export interface IGJTStrategy {
  resetGistJTag(): Promise<void>;
  addGJT(tid: number, gid: number): Promise<void>;
  deleteGJT(tid: number, gid: number): Promise<void>;
  deleteGJTBySid(gid: number): Promise<void>;
  deleteSJTByTid(tid: number): Promise<void>;
}

export class GjtInstance implements IGJTStrategy {
  private gjtStance: IGJTStrategy;

  public constructor() {
    this.gjtStance = new APIGjt();
  }

  public async resetGistJTag(): Promise<void> {
    await this.gjtStance.resetGistJTag();
  }

  public async addGJT(tid: number, gid: number): Promise<void> {
    await this.gjtStance.addGJT(tid, gid);
  }

  public async deleteGJT(tid: number, gid: number): Promise<void> {
    await this.gjtStance.deleteGJT(tid, gid);
  }

  public async deleteGJTBySid(gid: number): Promise<void> {
    await this.gjtStance.deleteGJTBySid(gid);
  }

  public async deleteSJTByTid(tid: number): Promise<void> {
    await this.gjtStance.deleteSJTByTid(tid);
  }
}

export const gjtStance = new GjtInstance();
