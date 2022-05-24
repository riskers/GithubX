import { db } from '@/services/idb/IDBSetUp';
import { ISJTStrategy } from '@/services/model/sjt';

export class IDBSjt implements ISJTStrategy {
  public async resetStarJTag(): Promise<void> {
    await db.starsJTags.clear();
  }

  public async addSJT(tid: number, sid: number): Promise<void> {
    await db.starsJTags.add({
      tid,
      sid,
    });
  }

  public async deleteSJT(tid: number, sid: number): Promise<void> {
    await db.starsJTags.where({ tid, sid }).delete();
  }

  public async deleteSJTBySid(sid: number): Promise<void> {
    await db.starsJTags
      .where({
        sid,
      })
      .delete();
  }

  public async deleteSJTByTid(tid: number): Promise<void> {
    await db.starsJTags
      .where({
        tid,
      })
      .delete();
  }
}
