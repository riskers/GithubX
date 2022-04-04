import { db } from '@/content_script/services/local/db';

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

export const addSJT = async (tid: number, sid: number) => {
  await db.starsJTags.add({
    tid,
    sid,
  });
};

export const deleteSJT = async (tid: number, sid: number) => {
  await db.starsJTags.where({ tid, sid }).delete();
};

export const deleteSJTByTid = async (tid: number) => {
  await db.starsJTags
    .where({
      tid,
    })
    .delete();
};
