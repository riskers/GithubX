import { Stack, TextField } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import * as React from 'react';

const Search: React.FC<{ height: number; placeholder: string; onSearch: (keyword: string) => void }> = (props) => {
  const { height, placeholder, onSearch } = props;

  const [keyword, setKeyword] = React.useState();

  const { run } = useDebounceFn(
    (v) => {
      setKeyword(v);
    },
    { wait: 400 },
  );

  React.useEffect(() => {
    onSearch(keyword);
  }, [onSearch, keyword]);

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
          run(e.target.value);
        }}
        // onChange={(e) => {
        //   setKeyword((e as any).target.value);
        // }}
      />
    </Stack>
  );
};

export default Search;
