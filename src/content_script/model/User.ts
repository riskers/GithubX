import AV from '@/utils/leancloud';

export interface IGithubUser {
  objectId: string;
  desc: string;
  url: string;
  tags: string[];
}

export default class GithubUser extends AV.Object implements IGithubUser {
  objectId: string;
  desc: string;
  url: string;
  tags: string[];
}

AV.Object.register(GithubUser);
