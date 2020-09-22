import { getGistTitle } from '@/common/tools';
import Btn from '@/content_script/components/btn';
import { addGist, delGist } from '@/content_script/services/gist';
import delay from '@/utils/delay';
import React from 'react';
import { gistContext, URL } from '@/content_script/pages/gist';

const AddGistBtn: React.FC = () => {
  const { isExist, setIsExist } = React.useContext(gistContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchAddGist = async () => {
    setIsLoading(true);
    await delay(1000);
    await addGist({
      url: URL,
      title: getGistTitle(),
    });

    setIsLoading(false);
  };

  const fetchDelGist = async () => {
    await delGist(URL);
    await delay(1000);
  };

  return (
    <Btn
      text={isExist ? '-' : '+'}
      isLoading={isLoading}
      className="btn btn-sm"
      onClick={async () => {
        if (isExist) {
          await fetchDelGist();
        } else {
          await fetchAddGist();
        }
        setIsExist(!isExist);
      }}
    />
  );
};

export default AddGistBtn;
