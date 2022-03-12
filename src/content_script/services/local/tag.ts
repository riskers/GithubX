import ChromeStorage from '@/common/ChromeStorage';
import { clearStarByTagId, getStarsList } from '@/content_script/services/local/stars';
import { remove } from 'lodash';
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

/**
 * get tag info by tag id
 */
export const getTag = async (ids: string[]): Promise<ITag[]> => {
  const cs = new ChromeStorage();

  const tagsList = (await cs.get(CHROME_STORAGE_KEY)) as ITag[];

  return tagsList.filter((tag) => {
    return ids.includes(tag.id);
  });
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

export const deleteTag = async (tagId: string): Promise<void> => {
  const cs = new ChromeStorage();

  const tagList = await getTagsList();
  remove(tagList, (tag) => {
    return tag.id === tagId;
  });
  await cs.set(CHROME_STORAGE_KEY, tagList);

  await clearStarByTagId(tagId);
};

export const addTag = async (name: string): Promise<ITag> => {
  const cs = new ChromeStorage();

  const tagsList = (await cs.get(CHROME_STORAGE_KEY)) as ITag[];

  if (tagsList.some((tag) => tag.name === name)) {
    return;
  }

  const tag: ITag = {
    id: uuid.uuid(),
    name,
  };

  await cs.push(CHROME_STORAGE_KEY, tag);

  return tag;
};

export const updateTag = async (id: string, tag: Pick<ITag, 'name'>) => {
  const cs = new ChromeStorage();

  const newTag: ITag = {
    ...tag,
    id,
  };

  const tagsList = await getTagsList();
  const newTagsList = tagsList.map((tag) => {
    if (tag.id === id) {
      return newTag;
    }
    return tag;
  });

  await cs.set(CHROME_STORAGE_KEY, newTagsList);
};
