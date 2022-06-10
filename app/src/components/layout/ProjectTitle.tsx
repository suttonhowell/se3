import { EditRounded, SaveAsRounded } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { changeTitle } from '../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../core/redux/hooks';

const titleMaxLength = 20;

export const ProjectTitle = () => {
  const dispatch = useAppDispatch();
  const titleName = useAppSelector((state) => state.editor.graph.metaData.name);
  const [title, setTitle] = useState<string>(titleName);
  const [isTitleEditable, setIsTitleEditable] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Update title when redux state changes
  useEffect(() => {
    if (title !== titleName) {
      setTitle(titleName);
    }
  }, [titleName]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > titleMaxLength) {
      setIsError(true);
    } else {
      if (isError) setIsError(false);
      setTitle(value);
    }
  };

  const handleOnClick = () => {
    if (isTitleEditable) {
      dispatch(changeTitle(title));
    }
    setIsTitleEditable((prevState) => !prevState);
  };

  const handleOnSubmit = () => {
    dispatch(changeTitle(title));
    setIsTitleEditable(false);
  };

  return (
    <Box>
      <Box component={'form'} onSubmit={handleOnSubmit} sx={{ display: 'flex' }}>
        <Tooltip
          open={isError}
          arrow
          title={`The title should be at most ${titleMaxLength} characters.`}
        >
          <TextField
            value={title}
            label={'Title'}
            variant="outlined"
            disabled={!isTitleEditable}
            size="small"
            onChange={handleOnChange}
            sx={{ input: { color: 'white' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleOnClick}>
                    {isTitleEditable ? <SaveAsRounded /> : <EditRounded />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
      </Box>
    </Box>
  );
};
