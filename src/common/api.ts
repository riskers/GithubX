import { IItem } from '@/options/components/mid';
import { IGist } from '@/services/idb/gist';
import { DEFAULT_GROUP } from '@/services/idb/group';
import { getToken } from '@/services/idb/settings';

import { Octokit } from 'octokit';

export interface IRepo {
  id: number;
  full_name: string;
  html_url: string;
}

export interface IStar extends IItem {
  fullName: string;
}

export const getUserInfo = async () => {
  const token = await getToken();
  const octokit = new Octokit({ auth: token });
  return await octokit.rest.users.getAuthenticated();
};

const getGistsList = async (page: number) => {
  const token = await getToken();
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
  const token = await getToken();
  const octokit = new Octokit({ auth: token });

  const res = await octokit.request(`GET /user/starred`, {
    page,
  });
  return res.data;
};

export const getAllStarListFromGithub = async (): Promise<IStar[]> => {
  let page = 1;
  let ending = false;
  let res: IStar[] = [];

  while (!ending) {
    const pres = await getStarListFromGithub(page);

    const stars: IStar[] = pres.map((data) => {
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
