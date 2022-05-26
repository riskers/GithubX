/**
 * select store position
 */

// IndexDB store
export const DEFAULT_STORE_POSITION = {
  v: 'IDB',
  desc: 'Indexed DB',
};

// self API store
const API_STORE_POSITION = {
  v: 'DB',
  desc: 'yourself database',
};

export const STORE_POSITION = [DEFAULT_STORE_POSITION, API_STORE_POSITION];

const K = 'position';

export const storeSetPosition = async <T extends typeof STORE_POSITION[number]['v']>(position: T): Promise<void> => {
  await chrome.storage.local.set({ [K]: position });
};

export const storeGetPosition = async (): Promise<typeof STORE_POSITION[number]> => {
  const localStorage = await chrome.storage.local.get(K);
  if (localStorage[K]) {
    return localStorage[K];
  }
  return DEFAULT_STORE_POSITION;
};
