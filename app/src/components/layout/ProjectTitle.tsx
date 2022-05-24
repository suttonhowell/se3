import { Edit, SaveAsRounded } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

export const ProjectTitle = () => {
  const [title, setTitle] = useState<string>('Title');
  const [isTitleEditable, setIsTitleEditable] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const titleMaxLength = 20;

  const updateTitleorErrorMsg = () => {
    // TODO: Pass title value as parameter
    var titleFieldValue = (document.getElementById('TitleField') as HTMLInputElement).value;
    if (titleFieldValue.length >= titleMaxLength) {
      setIsError(() => true);
    } else {
      setIsError(() => false);
      setTitle(titleFieldValue);
      setIsTitleEditable(() => false);
    }
  };

  const handleKeyDownInTitle = (event: any) => {
    if (event.keyCode === 13) {
      updateTitleorErrorMsg();
    }
  };

  return (
    <Box>
      {isTitleEditable ? (
        <Box sx={{ display: 'flex' }}>
          <TextField
            id="TitleField"
            error={isError}
            helperText={isError ? 'Please enter a title with less than 20 characters' : ''}
            defaultValue={title}
            variant="standard"
            onChange={() => setIsTitleEditable(() => true)}
            onKeyDown={handleKeyDownInTitle}
          />
          <IconButton>
            <SaveAsRounded onClick={() => updateTitleorErrorMsg()} />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <Typography> {title} </Typography>
          <IconButton>
            <Edit onClick={() => setIsTitleEditable(() => true)} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
