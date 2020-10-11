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

export const getStarList = async (page: number) => {
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

export const addStar = async (list: IGithubStar[]) => {
  const starList: Star[] = list.map((star) => {
    const x = new Star();
    x.set('fullName', star.repo.full_name);
    x.set('htmlUrl', star.repo.html_url);
    x.set('starredAt', star.starred_at);

    return x;
  });

  leancloud.Object.saveAll(starList);
};

/**
 * 根据 leancloud 上存储的最新的一条 star 的 star_at 和 now 比较
 * 然后 getStarList(1) 判断是否有新 star 在存储 leancloud
 */
// export const getNewStarList = async (timestamp: number) => {
//   const now = Date.now();

//   // if (x < )
// };
