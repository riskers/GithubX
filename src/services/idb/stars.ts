import { getAllStarListFromGithub, IStar } from '@/common/api';
import { db } from '@/services/idb/db';
import { getGroupInfo } from '@/services/idb/group';
import { getTagsInStar } from '@/services/idb/tag';
import { circularProgressClasses } from '@mui/material';

export const resetStars = async (): Promise<void> => {
  await db.stars.clear();

  const res = await getAllStarListFromGithub();
  await db.stars.bulkAdd(res);
};

export const syncStars = async (): Promise<void> => {
  const res = await getAllStarListFromGithub();

  for (let star of res) {
    const s = await db.stars.where({ id: star.id }).first();

    // had not existed
    if (s !== null) {
      db.stars.add(star);
    }
  }
};

export interface ISeachGroupParams {
  groupId: number;
  description?: string;
}

export const getStarsListByGroup = async (params: ISeachGroupParams): Promise<IStar[]> => {
  const { groupId, description: fullName } = params;

  let starList = await db.stars
    .where({
      groupId,
    })
    .reverse()
    .sortBy('updateTime');

  const group = await getGroupInfo(groupId);

  for (let star of starList) {
    star.group = group;
  }

  for (const star of starList) {
    const tags = await getTagsInStar(star.id);
    star.tags = tags;
  }

  if (fullName) {
    starList = searchByFullName(starList, fullName);
  }

  return starList;
};

export interface ISeachTagParams {
  tagId: number;
  fullName?: string;
}

/**
 * Many To Many
 *
 * 1. get star list where tag id = tagId
 * 2. add group
 * 3. add tag
 */
export const getStarsListByTag = async (params: ISeachTagParams) => {
  const { tagId, fullName } = params;
  const tidInSidList = await db.starsJTags
    .where({
      tid: tagId,
    })
    .with({ tag: 'tid', star: 'sid' });

  for (let tidInSid of tidInSidList) {
    const groupId = (tidInSid as any).star.groupId;
    const group = await getGroupInfo(groupId);
    (tidInSid as any).star.group = group;

    const tags = await getTagsInStar(tidInSid.sid);
    (tidInSid as any).star.tags = tags;
  }

  let res = tidInSidList
    .map((xx) => (xx as any).star)
    .sort((a, b) => {
      return a.updateTime - b.updateTime;
    });

  if (fullName) {
    res = searchByFullName(res, fullName);
  }

  return res;
};

const searchByFullName = (res, fullName: string) => {
  return res.filter((star) => {
    return new RegExp(fullName, 'ig').test(star.fullName);
  });
};

export const getStarInfo = async (id: number): Promise<IStar> => {
  const starInfo = await db.stars.where({ id }).first();

  starInfo.tags = await getTagsInStar(id);
  starInfo.group = await getGroupInfo(starInfo.groupId);

  return starInfo;
};

export const getStarInfoByUrl = async (url: string) => {
  const { id } = await db.stars.where({ htmlUrl: url }).first();

  return await getStarInfo(id);
};

/**
 * save and update star
 */
export const addStar = async (star: IStar): Promise<void> => {
  await db.stars.put(star);
};

/**
 * 点击 star 按钮时单个触发删除
 */
export const delStar = async (id: number): Promise<void> => {
  await db.stars
    .where({
      id,
    })
    .delete();
};
