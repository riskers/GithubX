import { getGistTitle } from '@/common/tools';
import Btn from '@/content_script/components/btn';
import { addGist, isExistsGist, delGist } from '@/content_script/services/gist';
import delay from '@/utils/delay';
import React, { useEffect, useState } from 'react';

const AddGistBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isExist, setIsExist] = useState(true);

  const URL = window.location.href;

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

  const deleteGist = async () => {
    setIsLoading(true);
    await delGist(URL);
    setIsLoading(false);
  };

  const getBtnText = () => {
    if (isLoading) {
      return '';
    }
    return isExist ? '-' : '+';
  };

  return (
    <Btn
      text={getBtnText()}
      isLoading={isLoading}
      className="btn btn-sm"
      onClick={async () => {
        if (isExist) {
          await deleteGist();
        } else {
          await fetchAddGist();
        }
      }}
    />
  );
};

export default AddGistBtn;
