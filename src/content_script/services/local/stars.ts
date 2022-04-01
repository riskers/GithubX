import { getAllStarListFromGithub, IStar } from '@/common/api';
import ChromeStorage from '@/common/ChromeStorage';
import { remove } from 'lodash';

const CHROME_STORAGE_KEY = 'STAR_LIST';

export const resetStars = async (username: string): Promise<void> => {
  const res = await getAllStarListFromGithub(username);

  const cs = new ChromeStorage();
  await cs.remove(CHROME_STORAGE_KEY);
  await cs.set(CHROME_STORAGE_KEY, res);
};

const getAllStars = async (): Promise<IStar[]> => {
  const cs = new ChromeStorage();
  const starList = (await cs.get(CHROME_STORAGE_KEY)) as IStar[];
  return starList;
};

export const getStarsListByGroup = async (groupId: string): Promise<IStar[]> => {
  const starList = await getAllStars();

  return starList.filter((star) => {
    return star.groupId === groupId;
  });
};
export const getStarsListByTag = async (tagId: string): Promise<IStar[]> => {
  const starList = await getAllStars();
  return starList.filter((star) => {
    return star.tagsId.includes(tagId);
  });
};

/**
 * 点击 star 按钮时单个触发保存
 */
export const addStar = async (star: IStar): Promise<void> => {
  const cs = new ChromeStorage();
  await cs.set(CHROME_STORAGE_KEY, star);
};

export const updateStar = async (pstar: IStar): Promise<void> => {
  const cs = new ChromeStorage();

  const starList = await getStarsListByGroup(pstar.groupId);
  const newStarsList = starList.map((star) => {
    if (star.id === pstar.id) {
      return pstar;
    }
    return star;
  });

  await cs.set(CHROME_STORAGE_KEY, newStarsList);
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
export const clearStarByTagId = async (tagId: string): Promise<void> => {
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
