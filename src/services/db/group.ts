import { IGroupModel, IGroupStrategy } from '@/services/model/group';
import { DEFAULT_GROUP } from '@/services/idb/group';
import axios from 'axios';

export class APIGroup implements IGroupStrategy {
  public async resetGroup(): Promise<void> {
    await axios.post('/api/group/reset');
  }

  public async getGroupInfo(groupId: number): Promise<IGroupModel> {
    return await axios.get(`/api/group/${groupId}`);
  }

  public async getGroupList(): Promise<IGroupModel[]> {
    return await axios.get('/api/group');
  }

  public async addGroup(name: string): Promise<number> {
    return await axios.post('/api/group', {
      name,
    });
  }

  public async updateGroup(groupId: number, groupName: string): Promise<void> {
    await axios.put(`/api/group/${groupId}`, {
      name: groupName,
    });
  }

  public async deleteGroup(groupId: number): Promise<void> {
    await axios.delete(`/api/group/${groupId}`);
  }
}
