import { getAllStarListFromGithub, IStar } from '@/common/api';
import ChromeStorage from '@/common/ChromeStorage';
import { getSettings } from '@/content_script/services/local/settings';
import { remove } from 'lodash';

const CHROME_STORAGE_KEY = 'STAR_LIST';

export const resetStars = async (): Promise<void> => {
  const settings = await getSettings();
  const res = await getAllStarListFromGithub(settings.username);

  const cs = new ChromeStorage();
  await cs.remove(CHROME_STORAGE_KEY);
  await cs.set(CHROME_STORAGE_KEY, res);
};

interface P {
  readonly groupId?: string;
  readonly tagId?: string;
}
export const getStarsList = async (params?: P): Promise<IStar[]> => {
  const cs = new ChromeStorage();
  const starList = (await cs.get(CHROME_STORAGE_KEY)) as IStar[];

  if (!params) return starList;

  return starList.filter((star) => {
    if (params.groupId) {
      return star.groupId === params.groupId;
    }

    return star.tagsId.includes(params.tagId);
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

  const starList = await getStarsList();
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

  let starList = await getStarsList();
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
