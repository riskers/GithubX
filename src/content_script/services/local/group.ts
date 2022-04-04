import { db } from '@/content_script/services/local/db';

export interface IGroup {
  id?: number;
  name: string;
  totalStars?: number;
}

export const DEFAULT_GROUP: IGroup = {
  id: 0,
  name: 'UNGROUP',
};

export const resetGroup = async (): Promise<void> => {
  await db.groups.clear();
  await db.groups.put(DEFAULT_GROUP);
};

export const getGroupInfo = async (groupId: number) => {
  return await db.groups
    .where({
      id: groupId,
    })
    .first();
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

/**
 * delete group and change stars in this group to DEFAULT group
 */
export const deleteGroup = async (groupId: number) => {
  const star = await db.stars.where({ groupId }).first();
  await db.stars.update(star.id, { groupId: 0 });

  await db.groups.where({ id: groupId }).delete();
};
