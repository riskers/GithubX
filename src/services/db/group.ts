import { R } from '@/services/db/APISetUp';
import { IGroupModel, IGroupStrategy } from '@/services/model/group';

export class APIGroup implements IGroupStrategy {
  public async resetGroup(): Promise<void> {
    await R.post('/api/group/reset');
  }

  public async getGroupInfo(groupId: number): Promise<IGroupModel> {
    return await R.get(`/api/group/${groupId}`);
  }

  public async getGroupList(): Promise<IGroupModel[]> {
    return await R.get('/api/group');
  }

  public async addGroup(name: string): Promise<number> {
    return await R.post('/api/group', {
      name,
    });
  }

  public async updateGroup(groupId: number, groupName: string): Promise<void> {
    await R.put(`/api/group/${groupId}`, {
      name: groupName,
    });
  }

  public async deleteGroup(groupId: number): Promise<void> {
    await R.delete(`/api/group/${groupId}`);
  }
}
