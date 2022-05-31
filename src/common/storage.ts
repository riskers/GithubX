export const STORE_POSITION_KEY = 'position';
export const API_URL_KEY = 'API_URL';
export const TOKEN_KEY = 'TOKEN';

// IndexDB store
export const DEFAULT_STORE_POSITION = {
  v: 'IDB',
  desc: 'Indexed DB',
} as const;

// self API store
export const API_STORE_POSITION = {
  v: 'DB',
  desc: 'remote database',
} as const;

export const STORE_POSITION = [DEFAULT_STORE_POSITION, API_STORE_POSITION] as const;

export const getValue = async (key: string): Promise<string> => {
  return (await chrome.storage.local.get(key))[key];
};

export const clear = async (): Promise<void> => {
  await chrome.storage.local.clear();
};
