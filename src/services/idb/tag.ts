import { db } from '@/services/idb/db';
import { addSJT, deleteSJTByTid } from '@/services/idb/starsJTags';

export interface ITag {
  id?: number;
  name: string;
  totalStars?: number;
}

export const resetTag = async (): Promise<void> => {
  await db.tags.clear();
};

export const addTag = async (name: string, sid: number): Promise<number> => {
  const tagId = await db.tags.add({
    name,
  });

  await addSJT(tagId, sid);

  return tagId;
};

export const updateTag = async (id: number, tag: Pick<ITag, 'name'>) => {
  await db.tags.update(id, { name: tag.name });
};

export const getTagInfo = async (tagId: number) => {
  const tagInfo = await db.tags.where({ id: tagId }).first();
  return tagInfo;
};

/**
 * many to many
 *
 * side bar
 */
export const getTagsList = async (): Promise<ITag[]> => {
  const tagList = await db.tags.toArray();

  for (const tag of tagList) {
    const starCount = await db.starsJTags
      .where({
        tid: tag.id,
      })
      .count();
    tag.totalStars = starCount;
  }

  return tagList;
};

export const getTagsInStar = async (sid: number) => {
  const sidInTidList = await db.starsJTags.where({ sid }).toArray();

  let tags = [];

  for (let sidInTid of sidInTidList) {
    const tagInfo = await getTagInfo(sidInTid.tid);
    tags.push(tagInfo);
  }

  return tags;
};

export const getTagsInGist = async (gid: number) => {
  const gidInTidList = await db.starsJTags.where({ gid }).toArray();

  let tags = [];

  for (let gidInTid of gidInTidList) {
    const tagInfo = await getTagInfo(gidInTid.tid);
    tags.push(tagInfo);
  }

  return tags;
};

/**
 * 1. TABLE tag: delete the tag
 * 2. TABLE starsJTags: delete tid = tagId
 */
export const deleteTag = async (tagId: number): Promise<void> => {
  await db.tags.where({ id: tagId }).delete();
  await deleteSJTByTid(tagId);
};
