import { APIGist } from '@/services/db/gist';
import { APIGjt } from '@/services/db/gistsJTags';
import { APIGroup } from '@/services/db/group';
import { APISetting } from '@/services/db/settings';
import { APIStars } from '@/services/db/stars';
import { APISjt } from '@/services/db/starsJTags';
import { APITag } from '@/services/db/tag';
import { IDBGist } from '@/services/idb/gist';
import { IDBGjt } from '@/services/idb/gistsJTags';
import { IDBGroup } from '@/services/idb/group';
import { IDBSetting } from '@/services/idb/settings';
import { IDBStar } from '@/services/idb/stars';
import { IDBSjt } from '@/services/idb/starsJTags';
import { IDBTag } from '@/services/idb/tag';
import { IGistStrategy } from '@/services/model/gist';
import { IGJTStrategy } from '@/services/model/gjt';
import { IGroupStrategy } from '@/services/model/group';
import { ISettingStrategy } from '@/services/model/setting';
import { ISJTStrategy } from '@/services/model/sjt';
import { StarStrategy } from '@/services/model/star';
import { ITagStrategy } from '@/services/model/tag';
import { storeGetPosition } from '@/utils/store';

interface IService {
  tag: ITagStrategy;
  group: IGroupStrategy;
  setting: ISettingStrategy;
  star: StarStrategy;
  gist: IGistStrategy;
  gjt: IGJTStrategy;
  sjt: ISJTStrategy;
}

export class Service implements IService {
  public tag: ITagStrategy;
  public group: IGroupStrategy;
  public setting: ISettingStrategy;
  public star: StarStrategy;
  public gist: IGistStrategy;
  public gjt: IGJTStrategy;
  public sjt: ISJTStrategy;

  public constructor(position: string) {
    if (position === 'IDB') {
      this.tag = new IDBTag();
      this.group = new IDBGroup();
      this.setting = new IDBSetting();
      this.star = new IDBStar();
      this.gist = new IDBGist();
      this.gjt = new IDBGjt();
      this.sjt = new IDBSjt();
    } else {
      this.tag = new APITag();
      this.group = new APIGroup();
      this.setting = new APISetting();
      this.star = new APIStars();
      this.gist = new APIGist();
      this.gjt = new APIGjt();
      this.sjt = new APISjt();
    }
  }
}

const selectPositon = await storeGetPosition();

// App Service
export const AS = new Service(selectPositon.v);
