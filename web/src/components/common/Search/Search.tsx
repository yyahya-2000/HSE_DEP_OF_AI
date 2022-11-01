import { FC, ChangeEvent, KeyboardEvent, useState } from 'react'
import { TextField, InputAdornment, FormControl } from '@mui/material'
import { Search as SearchIcon, Close } from '@mui/icons-material'
import { IconButton } from '../Buttons'
import { SearchProps } from './Search.types'

const Search: FC<SearchProps> = ({
  onFind,
  fullWidth,
  clear
}) => {
  const [value, setValue] = useState('')

  const showClear = clear && Boolean(value.length)

  const handleFind = () => {
    onFind(value)
  }

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    setValue(value)
  }

  const handleClear = () => {
    setValue('')
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      handleFind()
    }
  }

  return (
    <FormControl fullWidth={fullWidth}>
      <TextField
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        label={'Поиск'}
        variant={'outlined'}
        size={'small'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {showClear && (
                <IconButton onClick={handleClear}>
                  <Close />
                </IconButton>
              )}
              <IconButton onClick={handleFind}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </FormControl>
  )
}

export default Search
