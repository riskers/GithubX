import leancloud from '@/utils/leancloud';

import Gist, { IGist } from '../model/Gist';

export const addGist = async (gistParam: IGist) => {
  const gist = new Gist();
  gist.set('title', gistParam.title)
  gist.set('url', gistParam.url)

  return await gist.save()
}

export type IGistResponse = IGist & ILeanCloudBaseResponse;

const fetchGist = async <T>(offset: number = 0, limit: number = 100): Promise<T[]> => {
  const query = new leancloud.Query('Gist')
  query.limit(limit)
  query.skip(offset)

  let t = null
  try {
    t = await query.find()
  } catch(err) {

  }
  return t
}

export const getAllGistList = async () => {
  return await fetchGist<IGistResponse>()
}
