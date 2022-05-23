import { APIGroup } from '@/services/db/group';

export interface IGroupModal {
  id?: number;
  name: string;
  starCount?: number;
  gistCount?: number;
}

export interface IGroupStrategy {
  resetGroup(): Promise<void>;
  getGroupInfo(groupId: number): Promise<IGroupModal>;
  getGroupList(): Promise<IGroupModal[]>;
  addGroup(name: string): Promise<number>;
  updateGroup(groupId: number, groupName: string): Promise<void>;
  deleteGroup(groupId: number): Promise<void>;
}

class GroupInstance implements IGroupStrategy {
  private groupStrategy: IGroupStrategy;

  public constructor() {
    // const dbSelect: ILocalStorage['SELECT_DB'] = window.localStorage.getItem('SELECT_DB') as ILocalStorage['SELECT_DB'];
    // this.groupStrategy = new IDBGroup();
    // } else {
    this.groupStrategy = new APIGroup();
    // }
  }

  public async resetGroup(): Promise<void> {
    this.groupStrategy.resetGroup();
  }

  public async getGroupInfo(groupId: number): Promise<IGroupModal> {
    return await this.groupStrategy.getGroupInfo(groupId);
  }

  public async getGroupList(): Promise<IGroupModal[]> {
    return await this.groupStrategy.getGroupList();
  }

  public async addGroup(name: string): Promise<number> {
    return await this.groupStrategy.addGroup(name);
  }

  public async updateGroup(groupId: number, groupName: string): Promise<void> {
    return await this.groupStrategy.updateGroup(groupId, groupName);
  }

  public async deleteGroup(groupId: number): Promise<void> {
    return await this.groupStrategy.deleteGroup(groupId);
  }
}

export const groupInstace = new GroupInstance();
