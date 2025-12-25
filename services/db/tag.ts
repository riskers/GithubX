import { R } from '@/services/db/APISetUp';
import { ITagModel, ITagStrategy } from '@/services/model/tag';

export class APITag implements ITagStrategy {
  public async resetTag(): Promise<void> {
    await R.delete('/api/tag');
  }

  public async addTagWithSid(name: string, sid: number): Promise<number> {
    const tag: ITagModel = await R.post(`/api/tag/s/${sid}`, {
      name,
    });

    return tag.id;
  }

  public async addTagWithGid(name: string, gid: number): Promise<number> {
    const tag: ITagModel = await R.post(`/api/tag/g/${gid}`, { name });

    return tag.id;
  }

  public async updateTag(id: number, tag: Pick<ITagModel, 'name'>): Promise<void> {
    await R.put(`/api/tag/${id}`, tag);
  }

  public async getTagInfo(tagId: number): Promise<ITagModel> {
    return await R.get(`/api/tag/${tagId}`);
  }

  public async getTagsList(): Promise<ITagModel[]> {
    return await R.get(`/api/tag`);
  }

  public async getTagsInStar(sid: number): Promise<ITagModel[]> {
    return await R.get(`/api/tag/s/${sid}`);
  }

  public async getTagsInGist(gid: number): Promise<ITagModel[]> {
    return await R.get(`/api/tag/g/${gid}`);
  }

  public async deleteTag(tagId: number): Promise<void> {
    await R.delete(`/api/tag/${tagId}`);
  }
}
