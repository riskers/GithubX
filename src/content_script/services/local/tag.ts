import ChromeStorage from '@/common/ChromeStorage';
import { db } from '@/content_script/services/local/db';
import { clearStarByTagId, getStarsListByGroup, getStarsListByTag } from '@/content_script/services/local/stars';
import { remove } from 'lodash';
import uuid from 'lodash-uuid';

export interface ITag {
  id?: number;
  name: string;
  totalStars?: number;
}

const CHROME_STORAGE_KEY = 'TAG_LIST';

export const resetTag = async (): Promise<void> => {
  await db.tags.clear();
};

/**
 * get tag info by tag id
 */
export const getTag = async (ids: number[]): Promise<ITag[]> => {
  const cs = new ChromeStorage();

  const tagsList = (await cs.get(CHROME_STORAGE_KEY)) as ITag[];

  return tagsList.filter((tag) => {
    return ids.includes(tag.id);
  });
};

export const getTagsList = async (): Promise<ITag[]> => {
  const tagList = await db.tags.toArray();

  return tagList;
};

export const deleteTag = async (tagId: number): Promise<void> => {
  const cs = new ChromeStorage();

  const tagList = await getTagsList();
  remove(tagList, (tag) => {
    return tag.id === tagId;
  });
  await cs.set(CHROME_STORAGE_KEY, tagList);

  await clearStarByTagId(tagId);
};

export const addTag = async (name: string): Promise<number> => {
  return await db.tags.add({
    name,
  });
};

export const updateTag = async (id: number, tag: Pick<ITag, 'name'>) => {
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
