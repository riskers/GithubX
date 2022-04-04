import { IStar } from '@/common/api';
import { IGroup } from '@/content_script/services/local/group';
import { IStarsJTags } from '@/content_script/services/local/starsJTags';
import { ITag } from '@/content_script/services/local/tag';
import Dexie, { Table } from 'dexie';
import relationships from 'dexie-relationships';

class GithubPlusDB extends Dexie {
  public groups: Table<IGroup, number>;
  public tags: Table<ITag, number>;
  public stars: Table<IStar, number>;
  public starsJTags: Table<IStarsJTags, [number, number]>;

  public constructor() {
    super('GithubPlusDB', { addons: [relationships] });
    this.version(1).stores({
      groups: '++id',
      tags: '++id',
      stars: '++id, groupId -> groups.id',
      starsJTags: '[sid+tid], sid -> stars.id, tid -> tags.id',
    });
  }
}

export const db = new GithubPlusDB();
