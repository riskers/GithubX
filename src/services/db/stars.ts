import { getAllStarListFromGithub } from '@/common/api';
import { R } from '@/services/db/APISetUp';
import { ISeachGroupParams, ISeachTagParams, IStarModel, StarStrategy } from '@/services/model/star';

export class APIStars implements StarStrategy {
  public async resetStars(): Promise<void> {
    await R.delete('/api/star');

    const res = await getAllStarListFromGithub();

    await R.post('/api/star/list', [...res]);
  }

  public async syncStars(): Promise<void> {
    // const res = await getAllStarListFromGithub();
  }

  public async getStarsListByGroup(params: ISeachGroupParams): Promise<IStarModel[]> {
    const { groupId, description: fullName } = params;

    return await R.get('/api/star', {
      params: {
        groupId,
        fullName,
      },
    });
  }

  public async getStarsListByTag(params: ISeachTagParams): Promise<IStarModel[]> {
    const { tagId, fullName } = params;

    return await R.get('/api/star', {
      params: {
        tagId,
        fullName,
      },
    });
  }

  public async getStarInfo(id: number): Promise<IStarModel> {
    return await R.get(`/api/star/${id}`);
  }

  public async getStarInfoByFullName(fullName: string): Promise<IStarModel> {
    const list = await R.get('/api/star', {
      params: {
        fullName,
      },
    });

    return list[0];
  }

  public async delStar(id: number): Promise<void> {
    await R.delete(`/api/star/${id}`);
  }

  public async addStar(star: IStarModel): Promise<void> {
    await R.post(`/api/star`, star);
  }
}
