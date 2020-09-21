import leancloud from '@/utils/leancloud';

import Gist, { IGist } from '../model/Gist';

export const addGist = async (gistParam: Partial<IGist>) => {
  const gist = new Gist();
  gist.set('title', gistParam.title)
  gist.set('url', gistParam.url)

  return await gist.save()
}

const fetchGist = async <T>(offset: number = 0, limit: number = 100): Promise<T[]> => {
  const query = new leancloud.Query('Gist')
  query.limit(limit)
  query.skip(offset)

  let res: T[] = []
  let t = null
  try {
    t = await query.find()
    res = t.map(item => {
      return {
        objectId: item.id,
        title: item.get('title'),
        url: item.get('url')
      }
    })
  } catch(err) {

  }

  return res
}

export const getAllGistList = async () => {
  return await fetchGist<IGist>()
}