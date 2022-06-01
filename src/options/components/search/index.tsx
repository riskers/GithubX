import { searchSlice } from '@/options/slices/searchSlice';
import { Stack, TextField } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import * as React from 'react';
import { useDispatch } from 'react-redux';

const Search: React.FC<{ height: number; placeholder: string; onSearch: (keyword: string) => void }> = (props) => {
  const { height, placeholder, onSearch } = props;

  const [keyword, setKeyword] = React.useState<string>('');
  const dispatch = useDispatch();

  const { run } = useDebounceFn(
    (v) => {
      setKeyword(v);
    },
    { wait: 400 },
  );

  React.useEffect(() => {
    onSearch(keyword);
    dispatch(searchSlice.actions.change({ keyword }));
  }, [dispatch, onSearch, keyword]);

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
      />
    </Stack>
  );
};

export default Search;
