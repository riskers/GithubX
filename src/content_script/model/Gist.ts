import AV from '@/utils/leancloud';

export interface IGist {
  objectId: string;
  title: string;
  url: string;
  desc: string;
}

export default class Gist extends AV.Object implements IGist {
  public objectId: string;
  public title: string;
  public url: string;
  public desc: string;
}

AV.Object.register(Gist);
