import { getAllStarListFromGithub, IStar } from '@/common/api';
import { db } from '@/content_script/services/local/db';
import { getGroupInfo } from '@/content_script/services/local/group';
import { getTagsInStar } from '@/content_script/services/local/tag';

export const resetStars = async (username: string): Promise<void> => {
  await db.stars.clear();

  const res = await getAllStarListFromGithub(username);
  await db.stars.bulkAdd(res);
};

export const getStarsListByGroup = async (groupId: number): Promise<IStar[]> => {
  const starList = await db.stars
    .where({
      groupId,
    })
    .with({ group: 'groupId' });

  for (const star of starList) {
    const tags = await getTagsInStar(star.id);
    star.tags = tags;
  }

  return starList;
};

/**
 * Many To Many
 *
 * 1. get star list where tag id = tagId
 * 2. add group
 * 3. add tag
 */
export const getStarsListByTag = async (tagId: number) => {
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

  return tidInSidList.map((xx) => (xx as any).star);
};

export const getStarInfo = async (id: number): Promise<IStar> => {
  const starInfo = await db.stars.where({ id }).first();

  starInfo.tags = await getTagsInStar(id);
  starInfo.group = await getGroupInfo(starInfo.groupId);

  return starInfo;
};

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
