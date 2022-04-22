import { IStar } from '@/common/api';
import { ACTION_SHOW_OPTION_PAGE } from '@/content_script/hooks/oneway-message/message';
import { Chip, Stack } from '@mui/material';
import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';

interface IProps {
  starInfo: IStar;
}

/**
 * INJECT IN REPO PAGE
 */
const Buttons: React.FC<IProps> = (props) => {
  const { tags, group } = props.starInfo;

  const openOptionPage = () => {
    chrome.runtime.sendMessage({ type: ACTION_SHOW_OPTION_PAGE });
  };

  return (
    <Box style={{ marginBottom: 10, cursor: 'pointer' }} onClick={openOptionPage}>
      <Stack direction="row" spacing={1} style={{ marginBottom: 8 }}>
        <Chip size="medium" label={group.name} sx={{ background: green[900], color: '#EFEFEF' }} />
      </Stack>

      <Stack direction="row" spacing={1}>
        {tags.map((tag) => {
          return <Chip label={tag.name} key={tag.id} size="small" />;
        })}
      </Stack>
    </Box>
  );
};

export default Buttons;
