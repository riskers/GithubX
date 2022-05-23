import { IStar } from '@/common/api';
import { IGist } from '@/services/gistInstance';
import { IGJTModal } from '@/services/gjtInstance';
import { IGroupModal } from '@/services/groupInstance';
import { ISettingModal } from '@/services/settingInstance';
import { ISJTModal } from '@/services/sjtInstance';
import { ITagModel } from '@/services/tagInstance';
import Dexie, { Table } from 'dexie';
import relationships from 'dexie-relationships';

class GithubPlusDB extends Dexie {
  public groups: Table<IGroupModal, number>;
  public tags: Table<ITagModel, number>;
  public stars: Table<IStar, number>;
  public gists: Table<IGist, number>;
  public starsJTags: Table<ISJTModal, [number, number]>;
  public gistsJTags: Table<IGJTModal, [number, number]>;
  public settings: Table<ISettingModal, number>;

  public constructor() {
    super('GithubPlusDB', { addons: [relationships] });
    this.version(1).stores({
      groups: '++id',
      tags: '++id',
      stars: '++id, groupId -> groups.id, htmlUrl, fullName',
      starsJTags: '[sid+tid], sid -> stars.id, tid -> tags.id',
      gists: '++id, groupId -> groups.id',
      gistsJTags: '[gid+tid], gid -> gists.id, tid -> tags.id',
      settings: '++id',
    });
  }
}

export const db = new GithubPlusDB();
