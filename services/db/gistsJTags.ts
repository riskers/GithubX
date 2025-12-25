import { R } from '@/services/db/APISetUp';
import { IGJTStrategy } from '@/services/model/gjt';

export class APIGjt implements IGJTStrategy {
  public async resetGistJTag(): Promise<void> {}

  public async addGJT(tid: number, gid: number): Promise<void> {
    await R.post(`/api/gjt/g/${gid}/t/${tid}`);
  }

  public async deleteGJT(tid: number, gid: number): Promise<void> {
    await R.delete(`/api/gjt/g/${gid}/t/${tid}`);
  }

  public async deleteGJTBySid(gid: number): Promise<void> {}

  public async deleteSJTByTid(tid: number): Promise<void> {}
}
