import AV from '@/utils/leancloud';

export interface IGroup {
  objectId?: string;
  groupName: string;
}

export default class Group extends AV.Object implements IGroup {
  public objectId: string;
  public groupName: string;
}

AV.Object.register(Group);
