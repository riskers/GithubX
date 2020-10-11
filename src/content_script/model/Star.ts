import AV from '@/utils/leancloud';

export interface IStar {
  /**
   * star 时间
   */
  starredAt: string;
  /**
   * eg. riskers/blog
   */
  fullName: string;
  /**
   * 项目链接
   */
  htmlUrl: string;
}

export default class Star extends AV.Object implements IStar {
  public starredAt: string;
  public fullName: string;
  public htmlUrl: string;
}

AV.Object.register(Star);
