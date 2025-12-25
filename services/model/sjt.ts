/**
 * Star and Tags Join
 */

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
