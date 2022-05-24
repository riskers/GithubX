import { APIGist } from '@/services/db/gist';
import { APIGjt } from '@/services/db/gistsJTags';
import { APIGroup } from '@/services/db/group';
import { APISetting } from '@/services/db/settings';
import { APIStars } from '@/services/db/stars';
import { APISjt } from '@/services/db/starsJTags';
import { APITag } from '@/services/db/tag';
import { IGistStrategy } from '@/services/model/gist';
import { IGJTStrategy } from '@/services/model/gjt';
import { IGroupStrategy } from '@/services/model/group';
import { IDBGist } from '@/services/idb/gist';
import { IDBGjt } from '@/services/idb/gistsJTags';
import { IDBGroup } from '@/services/idb/group';
import { IDBSetting } from '@/services/idb/settings';
import { IDBStar } from '@/services/idb/stars';
import { IDBSjt } from '@/services/idb/starsJTags';
import { IDBTag } from '@/services/idb/tag';
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

class Service implements IService {
  private static _instance: Service;

  public static getInstance() {
    if (!this._instance) {
      this._instance = new Service();
    }

    return this._instance;
  }

  public tag: ITagStrategy;
  public group: IGroupStrategy;
  public setting: ISettingStrategy;
  public star: StarStrategy;
  public gist: IGistStrategy;
  public gjt: IGJTStrategy;
  public sjt: ISJTStrategy;

  public constructor() {
    (async () => {
      const dbSelect = await storeGetPosition();

      if (dbSelect === 'IDB') {
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
    })();
  }
}

// App Service
export const AS = Service.getInstance();
