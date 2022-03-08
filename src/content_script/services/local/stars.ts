import { getAllStarListFromGithub, IStar } from '@/common/api';
import ChromeStorage from '@/common/storage';
import { getUsername } from '@/common/tools';

const CHROME_STORAGE_KEY = 'STAR_LIST';

export const resetStars = async (): Promise<void> => {
  const username = await getUsername();
  const res = await getAllStarListFromGithub(username);

  const cs = new ChromeStorage();
  await cs.remove(CHROME_STORAGE_KEY);
  await cs.set(CHROME_STORAGE_KEY, res);
};

export const getAllStarList = async (): Promise<IStar[]> => {
  const cs = new ChromeStorage();
  return (await cs.get(CHROME_STORAGE_KEY)) as IStar[];
};

/**
 * 点击 star 按钮时单个触发保存
 */
export const addStar = async (param: IStar): Promise<void> => {
  const star: IStar = {
    id: param.id,
    fullName: param.fullName,
    htmlUrl: param.htmlUrl,
    group: '',
    tags: [],
  };

  console.log(star);

  // const cs = new ChromeStorage();
  // await cs.set(CHROME_STORAGE_KEY + '/' + param.id, star);
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