import { EditRounded, SaveAsRounded } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { changeTitle } from '../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../core/redux/hooks';

const titleMaxLength = 20;

export const ProjectTitle = () => {
  const dispatch = useAppDispatch();
  const titleName = useAppSelector((state) => state.editor.graph.metaData.name);
  const [title, setTitle] = useState<string>(titleName);
  const [isTitleEditable, setIsTitleEditable] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const titleInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTitleEditable && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isTitleEditable]);

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

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            sx={(theme) => ({
              '& .MuiInputLabel-root.MuiInputLabel-formControl': {
                color: theme.palette.common.white,
                '&.Mui-disabled': { color: theme.palette.grey[400] },
              },
              '& .MuiOutlinedInput-root': {
                color: theme.palette.common.white,
                '&.Mui-focused, &': {
                  '& fieldset': {
                    borderColor: theme.palette.common.white,
                  },
                },
                ...(theme.palette.mode === 'light' && {
                  '&.Mui-disabled': {
                    '& .MuiOutlinedInput-input': {
                      WebkitTextFillColor: theme.palette.grey[400],
                    },
                    '&:hover fieldset, & fieldset': {
                      borderColor: theme.palette.grey[400],
                    },
                  },

                  '&:hover fieldset': {
                    borderColor: theme.palette.common.white,
                  },
                }),
              },
            })}
            // sx={(theme) => ({
            //   input
            // })}

            inputProps={{ id: 'title-input', ref: titleInputRef }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleOnClick}>
                    {isTitleEditable ? (
                      <SaveAsRounded sx={(theme) => ({ color: theme.palette.common.white })} />
                    ) : (
                      <EditRounded sx={(theme) => ({ color: theme.palette.common.white })} />
                    )}
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
