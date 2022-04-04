import leancloud from '@/utils/leancloud';

import Gist, { IGist } from './model/Gist';

const LEANCLOUD_CLASS_NAME = 'Gist';

export const isExistsGist = async (url: string): Promise<boolean> => {
  const query = new leancloud.Query(LEANCLOUD_CLASS_NAME);
  query.equalTo('url', url);

  const gistList = await query.find();
  if (gistList.length === 0) {
    return false;
  }

  return true;
};

export const addGist = async (gistParam: Partial<IGist>) => {
  const gist = new Gist();
  gist.set('title', gistParam.title);
  gist.set('url', gistParam.url);

  return await gist.save();
};

/**
 * TODO: 使用 objectId
 */
export const delGist = async (url: string) => {
  const query = new leancloud.Query(LEANCLOUD_CLASS_NAME);
  query.equalTo('url', url);

  const gist = await query.find();

  await leancloud.Object.createWithoutData(LEANCLOUD_CLASS_NAME, gist[0].id).destroy();
};

const fetchGist = async <T>(offset = 0, limit = 100): Promise<T[]> => {
  const query = new leancloud.Query(LEANCLOUD_CLASS_NAME);
  query.limit(limit);
  query.skip(offset);

  let res: T[] = [];
  let t = null;
  try {
    t = await query.find();
    res = t.map((item) => {
      return {
        objectId: item.id,
        title: item.get('title'),
        url: item.get('url'),
      };
    });
  } catch (err) {}

  return res;
};

export const getAllGistList = async () => {
  return await fetchGist<IGist>();
};
