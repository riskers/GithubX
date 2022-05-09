import { ILocalStorage } from '@/services/constants';

interface GroupStrategy {}

class GroupInstance implements GroupStrategy {
  private groupStrategy: GroupStrategy;

  public constructor() {
    const dbSelect: ILocalStorage['SELECT_DB'] = localStorage.getItem('SELECT_DB') as ILocalStorage['SELECT_DB'];
    //   this.starStrategy = new IDBStar();
    // } else {
    //   this.starStrategy = new APIStar();
    // }
  }
}

export const groupInstace = new GroupInstance();
