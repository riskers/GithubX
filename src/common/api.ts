import { DEFAULT_GROUP, IGroup } from '@/services/idb/group';
import { ITag } from '@/services/idb/tag';

import { Octokit } from 'octokit';

const octokit = new Octokit({ auth: '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' });

export interface IGithubStarResponse {
  starred_at: string;
  repo: IRepo;
}

export interface IRepo {
  id: number;
  full_name: string;
  html_url: string;
}

export interface IStar {
  readonly id: number;
  fullName: string;
  htmlUrl: string;
  groupId: number;
  createTime?: number;
  updateTime?: number;
  group?: IGroup;
  tags?: ITag[];
}

export const getUserInfo = async () => {
  return await octokit.rest.users.getAuthenticated();
};

export const getAllStarListFromGithub = async (username: string): Promise<IStar[]> => {
  let page = 1;
  let ending = false;
  let res: IStar[] = [];

  while (!ending) {
    const pres = await getStarListFromGithub(username, page);

    const stars: IStar[] = pres.map((data) => {
      return {
        id: data.repo.id,
        fullName: data.repo.full_name,
        htmlUrl: data.repo.html_url,
        groupId: DEFAULT_GROUP.id,
        createTime: Date.now(),
        updateTime: Date.now(),
      };
    });

    page++;
    if (pres.length === 0) {
      ending = true;
    }

    res = res.concat(...stars);
  }

  return res;
};

export const getGistsList = async () => {
  // https://docs.github.com/cn/rest/reference/gists#list-gists-for-the-authenticated-user
  const res = await octokit.request('GET /gists', {});
  return res.data;
};

export const getStarListFromGithub = async (username: string, page: number): Promise<IGithubStarResponse[]> => {
  const res = await octokit.request(`GET /user/starred?page=${page}`);
  return res.data;
};

export const getRepoInfo = async (fullName: string): Promise<Omit<IStar, 'groupId'>> => {
  const url = `https://api.github.com/repos/${fullName}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3.star+json',
    },
  });

  if (response.ok) {
    const data: IRepo = await response.json();

    return {
      id: data.id,
      fullName: data.full_name,
      htmlUrl: data.html_url,
    };
  }
};

export interface IReadmeResponse {
  url: string;
  content: string;
}

export const getRepoContent = async (fullname: string): Promise<IReadmeResponse> => {
  const url = `https://api.github.com/repos/${fullname}/readme`;

  const response = await fetch(`${url}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (response.ok) {
    return response.json();
  }
};
