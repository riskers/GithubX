import AV from "@/utils/leancloud"

export interface IGist {
  title?: string;
  url: string;
  desc?: string;
}

export default class Gist extends AV.Object implements IGist{
  public name: string;
  public url: string;
  public desc: string;
}

AV.Object.register(Gist)