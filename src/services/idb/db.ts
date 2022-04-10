import { IStar } from '@/common/api';
import { IGroup } from '@/services/idb/group';
import { ISettings } from '@/services/idb/settings';
import { IStarsJTags } from '@/services/idb/starsJTags';
import { ITag } from '@/services/idb/tag';
import Dexie, { Table } from 'dexie';
import relationships from 'dexie-relationships';

class GithubPlusDB extends Dexie {
  public groups: Table<IGroup, number>;
  public tags: Table<ITag, number>;
  public stars: Table<IStar, number>;
  public starsJTags: Table<IStarsJTags, [number, number]>;
  public settings: Table<ISettings, number>;

  public constructor() {
    super('GithubPlusDB', { addons: [relationships] });
    this.version(1).stores({
      groups: '++id',
      tags: '++id',
      stars: '++id, groupId -> groups.id, htmlUrl',
      starsJTags: '[sid+tid], sid -> stars.id, tid -> tags.id',
      settings: '++id',
    });
  }
}

export const db = new GithubPlusDB();
