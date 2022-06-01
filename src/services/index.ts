import { APIGist } from '@/services/db/gist';
import { APIGjt } from '@/services/db/gistsJTags';
import { APIGroup } from '@/services/db/group';
import { APIStars } from '@/services/db/stars';
import { APISjt } from '@/services/db/starsJTags';
import { APITag } from '@/services/db/tag';
import { IDBGist } from '@/services/idb/gist';
import { IDBGjt } from '@/services/idb/gistsJTags';
import { IDBGroup } from '@/services/idb/group';
import { IDBStar } from '@/services/idb/stars';
import { IDBSjt } from '@/services/idb/starsJTags';
import { IDBTag } from '@/services/idb/tag';
import { IGistStrategy } from '@/services/model/gist';
import { IGJTStrategy } from '@/services/model/gjt';
import { IGroupStrategy } from '@/services/model/group';
import { ISJTStrategy } from '@/services/model/sjt';
import { StarStrategy } from '@/services/model/star';
import { ITagStrategy } from '@/services/model/tag';
import { getValue, STORE_POSITION_KEY } from '@/common/storage';

interface IService {
  tag: ITagStrategy;
  group: IGroupStrategy;
  star: StarStrategy;
  gist: IGistStrategy;
  gjt: IGJTStrategy;
  sjt: ISJTStrategy;
}

export class Service implements IService {
  public tag: ITagStrategy;
  public group: IGroupStrategy;
  public star: StarStrategy;
  public gist: IGistStrategy;
  public gjt: IGJTStrategy;
  public sjt: ISJTStrategy;

  public constructor(position: string) {
    if (position === 'IDB') {
      this.tag = new IDBTag();
      this.group = new IDBGroup();
      this.star = new IDBStar();
      this.gist = new IDBGist();
      this.gjt = new IDBGjt();
      this.sjt = new IDBSjt();
    } else {
      this.tag = new APITag();
      this.group = new APIGroup();
      this.star = new APIStars();
      this.gist = new APIGist();
      this.gjt = new APIGjt();
      this.sjt = new APISjt();
    }
  }
}

const position = await getValue(STORE_POSITION_KEY);

// App Service
export const AS = new Service(position);
