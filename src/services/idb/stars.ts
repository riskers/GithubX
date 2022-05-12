import { getAllStarListFromGithub, IStar } from '@/common/api';
import { groupInstace } from '@/services/groupInstance';
import { db } from '@/services/idb/db';
import { ISeachGroupParams, ISeachTagParams, StarStrategy } from '@/services/starInstance';
import { tagInstace } from '@/services/tagInstance';
import { circularProgressClasses } from '@mui/material';

export class IDBStar implements StarStrategy {
  public resetStars = async (): Promise<void> => {
    await db.stars.clear();

    const res = await getAllStarListFromGithub();
    await db.stars.bulkAdd(res);
  };

  public syncStars = async (): Promise<void> => {
    const res = await getAllStarListFromGithub();

    for (let star of res) {
      const s = await db.stars.where({ id: star.id }).first();

      // had not existed
      if (s !== null) {
        db.stars.add(star);
      }
    }
  };

  public getStarsListByGroup = async (params: ISeachGroupParams): Promise<IStar[]> => {
    const { groupId, description: fullName } = params;

    let starList = await db.stars
      .where({
        groupId,
      })
      .sortBy('updateTime');

    const group = await groupInstace.getGroupInfo(groupId);

    for (let star of starList) {
      star.group = group;
    }

    for (const star of starList) {
      const tags = await tagInstace.getTagsInStar(star.id);
      star.tags = tags;
    }

    if (fullName) {
      starList = searchByFullName(starList, fullName);
    }

    return starList;
  };

  /**
   * Many To Many
   *
   * 1. get star list where tag id = tagId
   * 2. add group
   * 3. add tag
   */
  public getStarsListByTag = async (params: ISeachTagParams) => {
    const { tagId, fullName } = params;
    const tidInSidList = await db.starsJTags
      .where({
        tid: tagId,
      })
      .with({ tag: 'tid', star: 'sid' });

    for (let tidInSid of tidInSidList) {
      const groupId = (tidInSid as any).star.groupId;
      const group = await groupInstace.getGroupInfo(groupId);
      (tidInSid as any).star.group = group;

      const tags = await tagInstace.getTagsInStar(tidInSid.sid);
      (tidInSid as any).star.tags = tags;
    }

    let res = tidInSidList
      .map((xx) => (xx as any).star)
      .sort((a, b) => {
        return a.updateTime - b.updateTime;
      });

    if (fullName) {
      res = searchByFullName(res, fullName);
    }

    return res;
  };

  public getStarInfo = async (id: number): Promise<IStar> => {
    const starInfo = await db.stars.where({ id }).first();

    starInfo.tags = await tagInstace.getTagsInStar(id);
    starInfo.group = await groupInstace.getGroupInfo(starInfo.groupId);

    return starInfo;
  };

  public getStarInfoByFullName = async (fullName) => {
    const star = await db.stars.where({ fullName }).first();

    if (!star) return null;

    return await this.getStarInfo(star.id);
  };

  public delStar = async (id: number): Promise<void> => {
    await db.stars
      .where({
        id,
      })
      .delete();
  };

  public addStar = async (star: IStar): Promise<void> => {
    await db.stars.put(star);
  };
}

const searchByFullName = (res, fullName: string) => {
  return res.filter((star) => {
    return new RegExp(fullName, 'ig').test(star.fullName);
  });
};
