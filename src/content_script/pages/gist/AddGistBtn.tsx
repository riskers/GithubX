import { getGistTitle } from '@/common/tools';
import Btn from '@/content_script/components/btn';
import { addGist } from '@/content_script/services/gist';
import delay from '@/utils/delay';
import React, { useCallback, useEffect, useState } from 'react';

const AddGistBtn = () => {
  const [isLoading, setIsLoading] = useState(false)

  const fetchAddGist = useCallback(async () => {
    setIsLoading(true)
    await delay(1000)

    const res = await addGist({
      url: location.href,
      title: getGistTitle(),
    })

    setIsLoading(false)
  }, [isLoading])

  return (
    <Btn text='+' isLoading={isLoading} className="btn btn-sm" onClick={async () => {
      await fetchAddGist()
    }} />
  )
}

export default AddGistBtn;