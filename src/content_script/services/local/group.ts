import ChromeStorage from '@/common/ChromeStorage';
import { db } from '@/content_script/services/local/db';
import { getStarsListByGroup } from '@/content_script/services/local/stars';
import { remove } from 'lodash';
import uuid from 'lodash-uuid';

export interface IGroup {
  id?: number;
  name: string;
  totalStars?: number;
}

const CHROME_STORAGE_KEY = 'GROUP_LIST';
export const DEFAULT_GROUP: IGroup = {
  id: 0,
  name: 'UNGROUP',
  totalStars: 0,
};

export const resetGroup = async (): Promise<void> => {
  await db.groups.clear();
  await db.groups.put(DEFAULT_GROUP);
};

export const getGroup = async (id: number): Promise<IGroup> => {
  const cs = new ChromeStorage();

  const groupList = (await cs.get(CHROME_STORAGE_KEY)) as IGroup[];

  return groupList.find((group) => {
    return group.id === id;
  });
};

/**
 * SELECT g.id, s.groupId FROM STARS s LEFT JOIN GROUPS g ON g.id = s.groupId
 */
export const getGroupList = async (): Promise<IGroup[]> => {
  const groupList = await db.groups.toArray();

  for (const group of groupList) {
    const starsCount = await db.stars
      .where({
        groupId: group.id,
      })
      .count();
    group.totalStars = starsCount;
  }

  return groupList;
};

export const addGroup = async (name: string): Promise<number> => {
  return await db.groups.add({ name });
};

export const updateGroup = async (groupId: number, groupName: string) => {
  await db.groups.update(groupId, { name: groupName });
};

export const deleteGroup = async (groupId: number) => {
  await db.groups.where({ id: groupId }).delete();
};
