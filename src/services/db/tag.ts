import { ITagModel, ITagStrategy } from '@/services/tagInstance';
import axios from 'axios';
import qs from 'qs';

export class APITag implements ITagStrategy {
  public async resetTag(): Promise<void> {
    await axios.delete('/api/tag');
  }

  public async addTagWithSid(name: string, sid: number): Promise<number> {
    const tag: ITagModel = await axios.post(
      `/api/tag/s/${sid}`,
      qs.stringify({
        name,
      }),
    );

    return tag.id;
  }

  public async addTagWithGid(name: string, gid: number): Promise<number> {
    const tag: ITagModel = await axios.post(`/api/tag/g/${gid}`, qs.stringify({ name }));

    return tag.id;
  }

  public async updateTag(id: number, tag: Pick<ITagModel, 'name'>): Promise<void> {
    await axios.put(`/api/tag/${id}`, tag);
  }

  public async getTagInfo(tagId: number): Promise<ITagModel> {
    return await axios.get(`/api/tag/${tagId}`);
  }

  public async getTagsList(): Promise<ITagModel[]> {
    return await axios.get(`/api/tag`);
  }

  public async getTagsInStar(sid: number): Promise<ITagModel[]> {
    return await axios.get(`/api/tag/s/${sid}`);
  }

  public async getTagsInGist(gid: number): Promise<ITagModel[]> {
    return await axios.get(`/api/tag/g/${gid}`);
  }

  public async deleteTag(tagId: number): Promise<void> {
    await axios.delete(`/api/tag/${tagId}`);
  }
}
