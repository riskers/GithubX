import { getAllGistFromGithub } from '@/common/api';
import { IItem } from '@/options/components/mid';
import { db } from '@/services/idb/db';
import { getGroupInfo, IGroup } from '@/services/idb/group';
import { getTagsInGist, ITag } from '@/services/idb/tag';

export interface IGist extends IItem {
  _id: string;
  description: string;
}

export const resetGists = async () => {
  await db.gists.clear();

  const res = await getAllGistFromGithub();
  await db.gists.bulkAdd(res);
};

export const getGistsListByGroup = async (groupId: number): Promise<IGist[]> => {
  const gistList = await db.gists
    .where({
      groupId,
    })
    .reverse()
    .sortBy('updateTime');

  const group = await getGroupInfo(groupId);

  for (let gist of gistList) {
    gist.group = group;
  }

  for (const gist of gistList) {
    const tags = await getTagsInGist(gist.id);
    gist.tags = tags;
  }

  return gistList;
};

/**
 * Many To Many
 *
 * 1. get star list where tag id = tagId
 * 2. add group
 * 3. add tag
 */
export const getGistsListByTag = async (tagId: number) => {
  const tidInGidList = await db.gistsJTags
    .where({
      tid: tagId,
    })
    .with({ tag: 'tid', gist: 'gid' });

  for (let tidInGid of tidInGidList) {
    const groupId = (tidInGid as any).star.groupId;
    const group = await getGroupInfo(groupId);
    (tidInGid as any).star.group = group;

    const tags = await getTagsInGist(tidInGid.gid);
    (tidInGid as any).gist.tags = tags;
  }

  return tidInGidList
    .map((xx) => (xx as any).gist)
    .sort((a, b) => {
      return a.updateTime - b.updateTime;
    });
};

/**
 * save and update gist
 */
export const addGist = async (gist: IGist): Promise<void> => {
  await db.gists.put(gist);
};

/**
 * delete gist
 */
export const delGist = async (id: number): Promise<void> => {
  await db.gists
    .where({
      id,
    })
    .delete();
};
