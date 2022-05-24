import { getAllGistFromGithub } from '@/common/api';
import { AS } from '@/services';
import { IGist, IGistStrategy } from '@/services/model/gist';
import { db } from '@/services/idb/IDBSetUp';
import { ISeachGroupParams, ISeachTagParams } from '@/services/model/star';

export class IDBGist implements IGistStrategy {
  public resetGists = async () => {
    await db.gists.clear();

    const res = await getAllGistFromGithub();
    await db.gists.bulkAdd(res);
  };

  public getGistsListByGroup = async (params: ISeachGroupParams): Promise<IGist[]> => {
    const { groupId, description: fullName } = params;
    let gistList = await db.gists
      .where({
        groupId,
      })
      .sortBy('updateTime');

    const group = await AS.group.getGroupInfo(groupId);

    for (let gist of gistList) {
      gist.group = group;
    }

    for (const gist of gistList) {
      const tags = await AS.tag.getTagsInGist(gist.id);
      gist.tags = tags;
    }

    if (fullName) {
      gistList = this.searchByDescription(gistList, fullName);
    }

    return gistList;
  };

  public getGistsListByTag = async (params: ISeachTagParams) => {
    const { tagId, fullName } = params;
    const tidInGidList = await db.gistsJTags
      .where({
        tid: tagId,
      })
      .with({ tag: 'tid', gist: 'gid' });

    for (let tidInGid of tidInGidList) {
      const groupId = (tidInGid as any).star.groupId;
      const group = await AS.group.getGroupInfo(groupId);
      (tidInGid as any).star.group = group;

      const tags = await AS.tag.getTagsInGist(tidInGid.gid);
      (tidInGid as any).gist.tags = tags;
    }

    let res = tidInGidList
      .map((xx) => (xx as any).gist)
      .sort((a, b) => {
        return a.updateTime - b.updateTime;
      });

    if (fullName) {
      res = this.searchByDescription(res, fullName);
    }

    return res;
  };

  public addGist = async (gist: IGist): Promise<void> => {
    await db.gists.put(gist);
  };

  public delGist = async (id: number): Promise<void> => {
    await db.gists
      .where({
        id,
      })
      .delete();
  };

  private searchByDescription = (res: IGist[], fullName: string) => {
    return res.filter((gist) => {
      return new RegExp(fullName, 'ig').test(gist.description);
    });
  };
}
