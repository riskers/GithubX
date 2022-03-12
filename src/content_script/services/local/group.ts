import ChromeStorage from '@/common/ChromeStorage';
import { getStarsList } from '@/content_script/services/local/stars';
import { remove } from 'lodash';
import uuid from 'lodash-uuid';

export interface IGroup {
  id: string;
  name: string;
  totalStars?: number;
}

const CHROME_STORAGE_KEY = 'GROUP_LIST';
export const DEFAULT_GROUP: IGroup = {
  id: '0',
  name: 'UNGROUP',
  totalStars: 0,
};

export const resetGroup = async (): Promise<void> => {
  const cs = new ChromeStorage();

  await cs.remove(CHROME_STORAGE_KEY);
  await cs.set(CHROME_STORAGE_KEY, [DEFAULT_GROUP]);
};

export const getGroup = async (id: string): Promise<IGroup> => {
  const cs = new ChromeStorage();

  const groupList = (await cs.get(CHROME_STORAGE_KEY)) as IGroup[];

  return groupList.find((group) => {
    return group.id === id;
  });
};

export const getGroupList = async (): Promise<IGroup[]> => {
  const cs = new ChromeStorage();
  const groupList = (await cs.get(CHROME_STORAGE_KEY)) as IGroup[];

  for (const group of groupList) {
    const starsList = await getStarsList({ groupId: group.id });
    group.totalStars = starsList.length;
  }

  return groupList;
};

export const addGroup = async (name: string): Promise<IGroup> => {
  const cs = new ChromeStorage();

  const group = {
    id: uuid.uuid(),
    name,
  };

  await cs.push(CHROME_STORAGE_KEY, group);

  return group;
};

export const updateGroup = async (groupId: string, groupName: string) => {
  const cs = new ChromeStorage();

  // update new group
  const newGroup: IGroup = {
    id: groupId,
    name: groupName,
  };

  const groupList = await getGroupList();
  const newGroupList = groupList.map((group) => {
    if (group.id === groupId) {
      return newGroup;
    }
    return group;
  });

  await cs.set(CHROME_STORAGE_KEY, newGroupList);
};

export const deleteGroup = async (groupId: string) => {
  const cs = new ChromeStorage();

  const groupList = await getGroupList();
  remove(groupList, (group) => {
    return group.id === groupId;
  });

  await cs.set(CHROME_STORAGE_KEY, groupList);
};
