import { ILocalStorage } from '@/services/constants';

interface ITagStrategy {}

class TagInstance implements ITagStrategy {
  private tagStrategy: ITagStrategy;

  public constructor() {
    const dbSelect: ILocalStorage['SELECT_DB'] = localStorage.getItem('SELECT_DB') as ILocalStorage['SELECT_DB'];
    //   this.starStrategy = new IDBStar();
    // } else {
    //   this.starStrategy = new APIStar();
    // }
  }
}

export const starInstace = new TagInstance();
