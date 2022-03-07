import ChromeStorage from '@/common/storage';
import { uniqueId } from 'lodash';

export interface IGroup {
  id: number;
  name: string;
}

const CHROME_STORAGE_KEY = 'GROUP_LIST';
export const DEFAULT_GROUP: IGroup = {
  id: 0,
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

export const addGroup = async (name: string): Promise<void> => {
  const uuid = uniqueId();

  const cs = new ChromeStorage();

  await cs.push(CHROME_STORAGE_KEY + '/' + uuid, name);
};
