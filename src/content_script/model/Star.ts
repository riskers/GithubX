import AV from '@/utils/leancloud';

export interface IStar {
  /**
   * github repo id
   */
  objectId?: string;
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
  /**
   * 分组
   */
  group: string;
  /**
   * 标签
   */
  tags: string[];
}

export default class Star extends AV.Object implements IStar {
  public objectId: string;
  public starredAt: string;
  public fullName: string;
  public htmlUrl: string;
  public group: string;
  public tags: string[];
}

AV.Object.register(Star);
