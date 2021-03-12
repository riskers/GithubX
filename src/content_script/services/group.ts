import leancloud from '@/utils/leancloud';
import { IGroup } from '@/content_script/model/Group';

const LEANCLOUD_CLASS_NAME = 'github_groups';

export const getGroupList = async (): Promise<IGroup[]> => {
  let res = [];

  const query = new leancloud.Query(LEANCLOUD_CLASS_NAME);
  query.addDescending('updatedAt');

  try {
    const groups = await query.find();

    res = groups.map((group) => {
      return {
        objectId: group.id,
        groupName: group.get('group_name'),
      };
    });
  } catch (err) {}

  return res;
};
