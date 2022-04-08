import { DEFAULT_GROUP, IGroup } from '@/services/idb/group';
import { ITag } from '@/services/idb/tag';

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
  group?: IGroup;
  tags?: ITag[];
}

export const getAllStarListFromGithub = async (username: string): Promise<IStar[]> => {
  let page = 1;
  let ending = false;
  let res: IStar[] = [];

  while (!ending) {
    const pres: IGithubStarResponse[] = await getStarListFromGithub(username, page);

    const stars: IStar[] = pres.map((data) => {
      return {
        id: data.repo.id,
        fullName: data.repo.full_name,
        htmlUrl: data.repo.html_url,
        groupId: DEFAULT_GROUP.id,
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

export const getStarListFromGithub = async (username: string, page: number): Promise<IGithubStarResponse[]> => {
  const url = `https://api.github.com/users/${username}/starred`;
  const response = await fetch(`${url}?page=${page}`, {
    headers: {
      Accept: 'application/vnd.github.v3.star+json',
    },
  });

  if (response.ok) {
    return response.json();
  }
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
