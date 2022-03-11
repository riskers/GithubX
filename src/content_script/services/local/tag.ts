import ChromeStorage from '@/common/ChromeStorage';
import { getStarsList } from '@/content_script/services/local/stars';
import uuid from 'lodash-uuid';

export interface ITag {
  id: string;
  name: string;
  totalStars?: number;
}

const CHROME_STORAGE_KEY = 'TAG_LIST';

export const resetTag = async (): Promise<void> => {
  const cs = new ChromeStorage();

  await cs.remove(CHROME_STORAGE_KEY);
  await cs.set(CHROME_STORAGE_KEY, []);
};

export const getTagsList = async (): Promise<ITag[]> => {
  const cs = new ChromeStorage();

  const tagsList = (await cs.get(CHROME_STORAGE_KEY)) as ITag[];

  if (!tagsList) return tagsList;

  for (const tag of tagsList) {
    const stars = await getStarsList({ tagId: tag.id });
    tag.totalStars = stars.length;
  }

  return tagsList;
};
