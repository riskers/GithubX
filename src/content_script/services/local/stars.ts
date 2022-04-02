import { getAllStarListFromGithub, IStar } from '@/common/api';
import ChromeStorage from '@/common/ChromeStorage';
import { getGroup, IGroup } from '@/content_script/services/local/group';
import { remove } from 'lodash';

const CHROME_STORAGE_KEY = 'STAR_LIST';

export const resetStars = async (username: string): Promise<void> => {
  const res = await getAllStarListFromGithub(username);

  const cs = new ChromeStorage();
  await cs.remove(CHROME_STORAGE_KEY);
  await cs.set(CHROME_STORAGE_KEY, res);
};

export const getAllStars = async (): Promise<IStar[]> => {
  const cs = new ChromeStorage();
  const starList = (await cs.get(CHROME_STORAGE_KEY)) as IStar[];
  return starList;
};

export const getStarsListByGroup = async (groupId: string): Promise<IStar[]> => {
  const starList = await getAllStars();

  return starList.filter((star) => {
    return star.group.id === groupId;
  });
};

export const getStarsListByTag = async (tagId: string): Promise<IStar[]> => {
  const starList = await getAllStars();
  return starList.filter((star) => {
    return star.tags.map((tag) => tag.id).includes(tagId);
  });
};

/**
 * 点击 star 按钮时单个触发保存
 */
export const addStar = async (star: IStar): Promise<void> => {
  const cs = new ChromeStorage();
  await cs.set(CHROME_STORAGE_KEY, star);
};

export const updateStarGroup = async (starId: number, group: IGroup): Promise<void> => {
  const cs = new ChromeStorage();

  const starList = await getAllStars();
  const newStarsList = starList.map((star) => {
    if (star.id === starId) {
      return {
        ...star,
        group,
      };
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
    const tagsId = star.tags.map((tag) => tag.id);
    if (tagsId.includes(tagId)) {
      remove(tagsId, (tag) => {
        return tag === tagId;
      });
    }
    return star;
  });

  await cs.set(CHROME_STORAGE_KEY, starList);
};
