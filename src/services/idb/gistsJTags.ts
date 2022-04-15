import { db } from '@/services/idb/db';

export interface IGistsJTags {
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

export const resetGistJTag = async () => {
  await db.gistsJTags.clear();
};

export const addGJT = async (tid: number, gid: number) => {
  await db.gistsJTags.add({
    tid,
    gid,
  });
};

export const deleteGJT = async (tid: number, gid: number) => {
  await db.gistsJTags.where({ tid, gid }).delete();
};

export const deleteGJTBySid = async (gid: number) => {
  await db.gistsJTags
    .where({
      gid: gid,
    })
    .delete();
};

export const deleteSJTByTid = async (tid: number) => {
  await db.gistsJTags
    .where({
      tid,
    })
    .delete();
};
