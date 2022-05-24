import { IGist, IGistStrategy } from '@/services/model/gist';
import { ISeachGroupParams, ISeachTagParams } from '@/services/model/star';
import axios from 'axios';

export class APIGist implements IGistStrategy {
  public async resetGists(): Promise<void> {}

  public async getGistsListByGroup(params: ISeachGroupParams): Promise<IGist[]> {
    const { groupId, description } = params;

    return await axios.get('/api/gist', {
      params: {
        groupId,
        description,
      },
    });
  }

  public async getGistsListByTag(params: ISeachTagParams): Promise<IGist[]> {
    const { tagId, fullName: description } = params;

    return await axios.get('/api/gist', {
      params: {
        tagId,
        description,
      },
    });
  }

  public async addGist(gist: IGist): Promise<void> {
    await axios.post(`/api/gist`, gist);
  }

  public async delGist(id: number): Promise<void> {
    await axios.delete(`/api/gist/${id}`);
  }
}
