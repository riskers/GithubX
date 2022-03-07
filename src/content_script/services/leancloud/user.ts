import leancloud from '@/utils/leancloud';
import GithubUser, { IGithubUser } from '@/content_script/model/User';

const LEANCLOUD_CLASS_NAME = 'GithubUser';

export const addUser = async (userParam: Partial<IGithubUser>) => {
  const user = new GithubUser();
  user.set('desc', userParam.desc);
  user.set('url', userParam.url);
  user.set('tags', userParam.tags);

  return await user.save();
};

export const fetchUser = async (url: string) => {
  const query = new leancloud.Query(LEANCLOUD_CLASS_NAME);
  query.equalTo('url', url);

  const res = await query.find();
  return {
    objectId: res[0]?.id,
    desc: res[0]?.get('desc'),
    tags: res[0]?.get('tags'),
  };
};

export const editUser = async (id: string, userParam: Pick<IGithubUser, 'desc' | 'tags'>) => {
  const user = leancloud.Object.createWithoutData(LEANCLOUD_CLASS_NAME, id);
  user.set('desc', userParam.desc);
  user.set('tags', userParam.tags);
  user.save();
};
