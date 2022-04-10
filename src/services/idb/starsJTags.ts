import { db } from '@/services/idb/db';

export interface IStarsJTags {
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

export const resetStarJTag = async () => {
  await db.starsJTags.clear();
};

export const addSJT = async (tid: number, sid: number) => {
  await db.starsJTags.add({
    tid,
    sid,
  });
};

export const deleteSJT = async (tid: number, sid: number) => {
  await db.starsJTags.where({ tid, sid }).delete();
};

export const deleteSJTBySid = async (sid: number) => {
  await db.starsJTags
    .where({
      sid,
    })
    .delete();
};

export const deleteSJTByTid = async (tid: number) => {
  await db.starsJTags
    .where({
      tid,
    })
    .delete();
};
