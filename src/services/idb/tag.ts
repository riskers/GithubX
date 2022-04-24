import { db } from '@/services/idb/db';
import { addGJT } from '@/services/idb/gistsJTags';
import { addSJT, deleteSJTByTid } from '@/services/idb/starsJTags';

export interface ITag {
  id?: number;
  name: string;
  starCount?: number;
  gistCount?: number;
}

export const resetTag = async (): Promise<void> => {
  await db.tags.clear();
};

export const addTagWithSid = async (name: string, sid: number): Promise<number> => {
  const tagId = await db.tags.add({
    name,
  });

  await addSJT(tagId, sid);

  return tagId;
};

export const addTagWithGid = async (name: string, gid: number): Promise<number> => {
  const tagId = await db.tags.add({
    name,
  });

  await addGJT(tagId, gid);

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
    const starCount = await db.starsJTags.where({ tid: tag.id }).count();
    const gistCount = await db.gistsJTags.where({ tid: tag.id }).count();

    tag.starCount = starCount;
    tag.gistCount = gistCount;
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
  const gidInTidList = await db.gistsJTags.where({ gid }).toArray();

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
