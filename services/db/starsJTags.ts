import { R } from '@/services/db/APISetUp';
import { ISJTStrategy } from '@/services/model/sjt';

export class APISjt implements ISJTStrategy {
  public async resetStarJTag(): Promise<void> {}

  public async addSJT(tid: number, sid: number): Promise<void> {
    await R.post(`/api/sjt/s/${sid}/t/${tid}`);
  }

  public async deleteSJT(tid: number, sid: number): Promise<void> {
    await R.delete(`/api/sjt/s/${sid}/t/${tid}`);
  }

  public async deleteSJTBySid(sid: number): Promise<void> {}

  public async deleteSJTByTid(tid: number): Promise<void> {}
}
