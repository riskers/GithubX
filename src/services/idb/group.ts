import { IGroupModal, IGroupStrategy } from '@/services/groupInstance';
import { db } from '@/services/idb/db';

export const DEFAULT_GROUP: IGroupModal = {
  id: 0,
  name: 'UNGROUP',
};

export class IDBGroup implements IGroupStrategy {
  public resetGroup = async (): Promise<void> => {
    await db.groups.clear();
    await db.groups.put(DEFAULT_GROUP);
  };

  public getGroupInfo = async (groupId: number): Promise<IGroupModal> => {
    return await db.groups
      .where({
        id: groupId,
      })
      .first();
  };

  public getGroupList = async (): Promise<IGroupModal[]> => {
    const groupList = await db.groups.toArray();

    for (const group of groupList) {
      const starsCount = await db.stars
        .where({
          groupId: group.id,
        })
        .count();

      const gistsCount = await db.gists
        .where({
          groupId: group.id,
        })
        .count();

      group.starCount = starsCount;
      group.gistCount = gistsCount;
    }

    return groupList;
  };

  public addGroup = async (name: string): Promise<number> => {
    return await db.groups.add({ name });
  };

  public updateGroup = async (groupId: number, groupName: string) => {
    await db.groups.update(groupId, { name: groupName });
  };

  public deleteGroup = async (groupId: number) => {
    const stars = await db.stars.where({ groupId }).toArray();
    if (stars) {
      for (let star of stars) {
        await db.stars.update(star.id, { groupId: 0 });
      }
    }

    await db.groups.where({ id: groupId }).delete();
  };
}
