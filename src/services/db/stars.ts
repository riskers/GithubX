import { getAllStarListFromGithub, IStar } from '@/common/api';
import { ISeachGroupParams, ISeachTagParams, StarStrategy } from '@/services/starInstance';
import axios from 'axios';

export class APIStars implements StarStrategy {
  public async resetStars(): Promise<void> {
    await axios.delete('/api/star');

    const res = await getAllStarListFromGithub();

    await axios.post('/api/star', {
      data: JSON.stringify(res),
    });
  }

  public async syncStars(): Promise<void> {
    // const res = await getAllStarListFromGithub();
  }

  public async getStarsListByGroup(params: ISeachGroupParams): Promise<IStar[]> {
    const { groupId, description: fullName } = params;

    return await axios.get('/api/star', {
      params: {
        groupId,
        fullName,
      },
    });
  }

  public async getStarsListByTag(params: ISeachTagParams): Promise<IStar[]> {
    const { tagId, fullName } = params;

    return await axios.get('/api/star', {
      params: {
        tagId,
        fullName,
      },
    });
  }

  public async getStarInfo(id: number): Promise<IStar> {
    return await axios.get(`/api/star/${id}`);
  }

  public async getStarInfoByFullName(fullName: string): Promise<IStar> {
    const list = await axios.get('/api/star', {
      params: {
        fullName,
      },
    });

    return list[0];
  }

  public async delStar(id: number): Promise<void> {
    await axios.delete(`/api/star/${id}`);
  }

  public async addStar(star: IStar): Promise<void> {
    await axios.post(`/api/star`, {
      data: star,
    });
  }
}
