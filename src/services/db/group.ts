import { IGroupModal, IGroupStrategy } from '@/services/groupInstance';
import axios from 'axios';

export class APIGroup implements IGroupStrategy {
  public async resetGroup(): Promise<void> {
    await axios.delete('/api/group');
    // add default group
  }

  public async getGroupInfo(groupId: number): Promise<IGroupModal> {
    return await axios.get(`/api/group/${groupId}`);
  }

  public async getGroupList(): Promise<IGroupModal[]> {
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
