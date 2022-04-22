import { Stack, TextField } from '@mui/material';
import * as React from 'react';

const Search: React.FC<{ height: number; placeholder: string; onSearch: (keyword: string) => void }> = (props) => {
  const { height, placeholder, onSearch } = props;

  return (
    <Stack
      style={{ height, backgroundColor: '#FFF', borderBottom: '1px solid #dae1e7' }}
      justifyContent="center"
      alignItems="center"
    >
      <TextField
        size="small"
        placeholder={placeholder}
        sx={{
          width: '96%',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#cdcdcd',
          },
        }}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
    </Stack>
  );
};

export default Search;
