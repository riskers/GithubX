import { IGist } from '@/services/model/gist';
import { IGJTModal } from '@/services/model/gjt';
import { IGroupModel } from '@/services/model/group';
import { ISJTModal } from '@/services/model/sjt';
import { IStarModel } from '@/services/model/star';
import { ITagModel } from '@/services/model/tag';
import Dexie, { Table } from 'dexie';
import relationships from 'dexie-relationships';

class GithubPlusDB extends Dexie {
  public groups: Table<IGroupModel, number>;
  public tags: Table<ITagModel, number>;
  public stars: Table<IStarModel, number>;
  public gists: Table<IGist, number>;
  public starsJTags: Table<ISJTModal, [number, number]>;
  public gistsJTags: Table<IGJTModal, [number, number]>;

  public constructor() {
    super('GithubPlusDB', { addons: [relationships] });
    this.version(1).stores({
      groups: '++id',
      tags: '++id',
      stars: '++id, groupId -> groups.id, htmlUrl, fullName',
      starsJTags: '[sid+tid], sid -> stars.id, tid -> tags.id',
      gists: '++id, groupId -> groups.id',
      gistsJTags: '[gid+tid], gid -> gists.id, tid -> tags.id',
    });
  }
}

export const db = new GithubPlusDB();
