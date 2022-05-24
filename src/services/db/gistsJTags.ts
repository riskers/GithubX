import { IGJTStrategy } from '@/services/model/gjt';
import axios from 'axios';

export class APIGjt implements IGJTStrategy {
  public async resetGistJTag(): Promise<void> {}

  public async addGJT(tid: number, gid: number): Promise<void> {
    await axios.post(`/api/gjt/g/${gid}/t/${tid}`);
  }

  public async deleteGJT(tid: number, gid: number): Promise<void> {
    await axios.delete(`/api/gjt/g/${gid}/t/${tid}`);
  }

  public async deleteGJTBySid(gid: number): Promise<void> {}

  public async deleteSJTByTid(tid: number): Promise<void> {}
}
