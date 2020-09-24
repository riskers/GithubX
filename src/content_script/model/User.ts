import AV from '@/utils/leancloud';

export interface IGithubUser {
  objectId: string;
  desc: string;
  url: string;
  tags: string[];
}

export default class GithubUser extends AV.Object implements IGithubUser {
  public objectId: string;
  public desc: string;
  public url: string;
  public tags: string[];
}

AV.Object.register(GithubUser);
