import { getAllStarListFromGithub, IStar } from '@/common/api';
import ChromeStorage from '@/common/ChromeStorage';
import { IGroup } from '@/content_script/model/Group';
import { db } from '@/content_script/services/local/db';
import { remove } from 'lodash';

const CHROME_STORAGE_KEY = 'STAR_LIST';

export const resetStars = async (username: string): Promise<void> => {
  await db.stars.clear();

  const res = await getAllStarListFromGithub(username);
  await db.stars.bulkAdd(res);
};

const getAllStars = async (): Promise<IStar[]> => {
  const cs = new ChromeStorage();
  const starList = (await cs.get(CHROME_STORAGE_KEY)) as IStar[];
  return starList;
};

/**
 * one to one
 */
export const getStarsListByGroup = async (groupId: number): Promise<IStar[]> => {
  return await db.stars
    .where({
      groupId,
    })
    .with({ group: 'groupId' });
};

/**
 * many to many
 */
export const getStarsListByTag = async (tagId: number): Promise<IStar[]> => {
  const starList = await getAllStars();
  return starList.filter((star) => {
    return star.tagsId.includes(tagId);
  });
};

export const updateStar = async (star: IStar): Promise<void> => {
  await db.stars.update(star.id, {
    groupId: star.groupId,
  });
};

/**
 * 点击 star 按钮时单个触发保存
 */
export const addStar = async (star: IStar): Promise<void> => {
  const cs = new ChromeStorage();
  await cs.set(CHROME_STORAGE_KEY, star);
};

/**
 * TODO: 使用 objectId
 * 点击 star 按钮时单个触发删除
 */
export const delStar = async (fullName: string): Promise<void> => {
  // const query = new leancloud.Query(LEANCLOUD_CLASS_NAME);
  // query.equalTo('fullName', fullName);
  // const star = await query.find();
  // await leancloud.Object.createWithoutData(LEANCLOUD_CLASS_NAME, star[0].id).destroy();
};

/**
 * clear star's tag by specific tagId
 */
export const clearStarByTagId = async (tagId: number): Promise<void> => {
  const cs = new ChromeStorage();

  let starList = await getStarsListByTag(tagId);
  starList = starList.map((star) => {
    if (star.tagsId.includes(tagId)) {
      const l = star.tagsId;

      remove(l, (tag) => {
        return tag === tagId;
      });

      star.tagsId = l;
    }
    return star;
  });

  await cs.set(CHROME_STORAGE_KEY, starList);
};
