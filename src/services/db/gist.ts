import { R } from '@/services/db/APISetUp';
import { IGist, IGistStrategy } from '@/services/model/gist';
import { ISeachGroupParams, ISeachTagParams } from '@/services/model/star';

export class APIGist implements IGistStrategy {
  public async resetGists(): Promise<void> {}

  public async getGistsListByGroup(params: ISeachGroupParams): Promise<IGist[]> {
    const { groupId, description } = params;

    return await R.get('/api/gist', {
      params: {
        groupId,
        description,
      },
    });
  }

  public async getGistsListByTag(params: ISeachTagParams): Promise<IGist[]> {
    const { tagId, fullName: description } = params;

    return await R.get('/api/gist', {
      params: {
        tagId,
        description,
      },
    });
  }

  public async addGist(gist: IGist): Promise<void> {
    await R.post(`/api/gist`, gist);
  }

  public async delGist(id: number): Promise<void> {
    await R.delete(`/api/gist/${id}`);
  }
}
