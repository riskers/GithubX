import ChromeStorage from '@/common/ChromeStorage';
import uuid from 'lodash-uuid';

export interface IGroup {
  id: string;
  name: string;
}

const CHROME_STORAGE_KEY = 'GROUP_LIST';
export const DEFAULT_GROUP: IGroup = {
  id: '0',
  name: 'UNGROUP',
};

export const resetGroup = async (): Promise<void> => {
  const cs = new ChromeStorage();

  await cs.remove(CHROME_STORAGE_KEY);
  await cs.set(CHROME_STORAGE_KEY, [DEFAULT_GROUP]);
};

export const getGroupList = async (): Promise<IGroup[]> => {
  const cs = new ChromeStorage();
  return (await cs.get(CHROME_STORAGE_KEY)) as IGroup[];
};

export const addGroup = async (name: string): Promise<IGroup> => {
  const cs = new ChromeStorage();

  console.log(name);

  const x = await cs.headKey([CHROME_STORAGE_KEY]);
  console.log(x);

  const group = {
    id: uuid.uuid(),
    name,
  };

  await cs.push(CHROME_STORAGE_KEY, group);

  return group;
};
