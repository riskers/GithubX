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
