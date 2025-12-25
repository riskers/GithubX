import { IGJTStrategy } from '@/services/model/gjt';
import { db } from '@/services/idb/IDBSetUp';

export class IDBGjt implements IGJTStrategy {
  public async resetGistJTag(): Promise<void> {
    await db.gistsJTags.clear();
  }
  public async addGJT(tid: number, gid: number): Promise<void> {
    await db.gistsJTags.add({
      tid,
      gid,
    });
  }
  public async deleteGJT(tid: number, gid: number): Promise<void> {
    await db.gistsJTags.where({ tid, gid }).delete();
  }
  public async deleteGJTBySid(gid: number): Promise<void> {
    await db.gistsJTags
      .where({
        gid: gid,
      })
      .delete();
  }
  public async deleteSJTByTid(tid: number): Promise<void> {
    await db.gistsJTags
      .where({
        tid,
      })
      .delete();
  }
}
