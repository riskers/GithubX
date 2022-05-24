/**
 * select store position
 */
const STORE_POSITION = ['IDB', 'DB'] as const;
const K = 'position';

export const storeSetPosition = async <T extends typeof STORE_POSITION[number]>(position: T): Promise<void> => {
  await chrome.storage.local.set({ [K]: position });
};

export const storeGetPosition = async (): Promise<typeof STORE_POSITION[number]> => {
  return await chrome.storage.local.get([K])[K];
};
