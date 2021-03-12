import leancloud from '@/utils/leancloud';
import Star, { IStar } from '@/content_script/model/Star';

const LEANCLOUD_CLASS_NAME = 'Star';

export interface IRepo {
  full_name: string;
  html_url: string;
}

export interface IGithubStar {
  starred_at: string;
  repo: IRepo;
}

export const refresh = async () => {
  const res = await getAllStarListFromGithub();
  await addStarList(res);
};

export const getAllStarListFromCloud = async (group = '', offset = 0, limit = 100): Promise<IStar[]> => {
  const query = new leancloud.Query(LEANCLOUD_CLASS_NAME);
  query.limit(limit);
  query.skip(offset);
  query.equalTo('group', group);

  let res: IStar[] = [];
  let t = null;
  try {
    t = await query.find();
    res = t.map((item) => {
      return {
        objectId: item.id,
        starredAt: item.get('starredAt'),
        htmlUrl: item.get('htmlUrl'),
        fullName: item.get('fullName'),
        group: item.get('group'),
        tags: item.get('tags'),
      };
    });
  } catch (err) {}

  return res;
};

export const getAllStarListFromGithub = async () => {
  let page = 17;
  let ending = false;
  let res: IGithubStar[] = [];

  while (!ending) {
    const pres = await getStarListFromGithub(page);
    page++;
    if (pres.length === 0) {
      ending = true;
    }

    res = res.concat(...pres);
  }

  return res;
};

export const getStarListFromGithub = async (page: number) => {
  const url = 'https://api.github.com/users/riskers/starred';
  const response = await fetch(`${url}?page=${page}`, {
    headers: {
      Accept: 'application/vnd.github.v3.star+json',
    },
  });

  if (response.ok) {
    return response.json();
  }
};

export const addStarList = async (list: IGithubStar[]) => {
  const starList: Star[] = list.map((star) => {
    const x = new Star();
    x.set('fullName', star.repo.full_name);
    x.set('htmlUrl', star.repo.html_url);
    x.set('starredAt', star.starred_at);
    x.set('group', 'Ungrouped');
    x.set('tags', []);

    return x;
  });
  console.log(starList);
  leancloud.Object.saveAll(starList);
};

/**
 * 点击 star 按钮时单个触发保存
 */
export const addStar = async (param: IStar) => {
  const star: Star = new Star();
  star.set('fullName', param.fullName);
  star.set('starredAt', param.starredAt);
  star.set('htmlUrl', param.htmlUrl);

  await star.save();
};

/**
 * TODO: 使用 objectId
 * 点击 star 按钮时单个触发删除
 */
export const delStar = async (fullName: string) => {
  const query = new leancloud.Query(LEANCLOUD_CLASS_NAME);
  query.equalTo('fullName', fullName);
  const star = await query.find();

  await leancloud.Object.createWithoutData(LEANCLOUD_CLASS_NAME, star[0].id).destroy();
};
