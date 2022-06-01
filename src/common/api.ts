import { IGist } from '@/services/model/gist';
import { DEFAULT_GROUP } from '@/services/idb/group';

import { Octokit } from 'octokit';
import { IStarModel } from '@/services/model/star';
import { getValue, TOKEN_KEY } from '@/common/storage';

export interface IRepo {
  id: number;
  full_name: string;
  html_url: string;
}

export const getUserInfo = async () => {
  const token = await getValue(TOKEN_KEY);
  const octokit = new Octokit({ auth: token });
  return await octokit.rest.users.getAuthenticated();
};

const getGistsList = async (page: number) => {
  const token = await getValue(TOKEN_KEY);
  const octokit = new Octokit({ auth: token });
  // https://docs.github.com/cn/rest/reference/gists#list-gists-for-the-authenticated-user
  const res = await octokit.request('GET /gists', {
    page,
    per_page: 20,
  });
  return res.data;
};

export const getAllGistFromGithub = async () => {
  let page = 1;
  let ending = false;
  let res: IGist[] = [];

  while (!ending) {
    const pres = await getGistsList(page);

    const gists: IGist[] = pres.map((data) => {
      return {
        _id: data.id,
        groupId: DEFAULT_GROUP.id,
        description: data.description,
        htmlUrl: data.html_url,
        createTime: Date.now(),
        updateTime: Date.now(),
      };
    });

    page++;
    if (pres.length === 0) {
      ending = true;
    }

    res = res.concat(...gists);
  }

  return res;
};

export const getStarListFromGithub = async (page: number): Promise<IRepo[]> => {
  const token = await getValue(TOKEN_KEY);

  const octokit = new Octokit({ auth: token });

  const res = await octokit.request(`GET /user/starred`, {
    page,
  });
  return res.data;
};

export const getAllStarListFromGithub = async (): Promise<IStarModel[]> => {
  let page = 1;
  let ending = false;
  let res: IStarModel[] = [];

  while (!ending) {
    const pres = await getStarListFromGithub(page);

    const stars: IStarModel[] = pres.map((data) => {
      return {
        id: data.id,
        fullName: data.full_name,
        htmlUrl: data.html_url,
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

export const getRepoInfo = async (fullName: string): Promise<Omit<IStarModel, 'groupId'>> => {
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
  const token = await getValue(TOKEN_KEY);
  const octokit = new Octokit({ auth: token });
  const res = await octokit.request(`GET /repos/${fullname}/readme`);
  return res.data;
};
