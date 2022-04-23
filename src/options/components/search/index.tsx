import { Stack, TextField } from '@mui/material';
import * as React from 'react';
import { useThrottle } from 'react-use';

const Search: React.FC<{ height: number; placeholder: string; onSearch: (keyword: string) => void }> = (props) => {
  const { height, placeholder, onSearch } = props;

  const [keyword, setKeyword] = React.useState();
  const throttleKeyword = useThrottle(keyword);

  const handleChange = (e) => {
    setKeyword(e);
  };

  React.useEffect(() => {
    onSearch(throttleKeyword);
  }, [onSearch, throttleKeyword]);

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
          handleChange(e.target.value);
        }}
      />
    </Stack>
  );
};

export default Search;
