import { ISJTStrategy } from '@/services/sjtInstance';
import axios from 'axios';

export class APISjt implements ISJTStrategy {
  public async resetStarJTag(): Promise<void> {}

  public async addSJT(tid: number, sid: number): Promise<void> {
    await axios.post(`/api/sjt/s/${sid}/t/${tid}`);
  }

  public async deleteSJT(tid: number, sid: number): Promise<void> {
    await axios.delete(`/api/sjt/s/${sid}/t/${tid}`);
  }

  public async deleteSJTBySid(sid: number): Promise<void> {}

  public async deleteSJTByTid(tid: number): Promise<void> {}
}
