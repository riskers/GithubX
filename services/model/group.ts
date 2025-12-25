export interface IGroupModel {
  id?: number;
  name: string;
  starCount?: number;
  gistCount?: number;
}

export interface IGroupStrategy {
  resetGroup(): Promise<void>;
  getGroupInfo(groupId: number): Promise<IGroupModel>;
  getGroupList(): Promise<IGroupModel[]>;
  addGroup(name: string): Promise<number>;
  updateGroup(groupId: number, groupName: string): Promise<void>;
  deleteGroup(groupId: number): Promise<void>;
}
