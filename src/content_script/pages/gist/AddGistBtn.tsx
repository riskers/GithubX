import { getGistTitle } from '@/common/tools';
import Btn from '@/content_script/components/btn';
import { addGist, isExistsGist } from '@/content_script/services/gist';
import delay from '@/utils/delay';
import React, { useCallback, useEffect, useState } from 'react';
import { delGist } from '../../services/gist';

const AddGistBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isExist, setIsExist] = useState(true);

  const URL = location.href;

  useEffect(() => {
    const fetchIsExist = async () => {
      const exist = await isExistsGist(URL);
      setIsExist(exist);
    };

    fetchIsExist();
  }, [isLoading]);

  const fetchAddGist = async () => {
    setIsLoading(true);
    await delay(1000);
    await addGist({
      url: URL,
      title: getGistTitle(),
    });

    setIsLoading(false);
  };

  return (
    <Btn
      text={isExist ? '-' : '+'}
      isLoading={isLoading}
      className="btn btn-sm"
      onClick={async () => {
        if (isExist) {
          await delGist(URL);
        } else {
          await fetchAddGist();
        }
      }}
    />
  );
};

export default AddGistBtn;
