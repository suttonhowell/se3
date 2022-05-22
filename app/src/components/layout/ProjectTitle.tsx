import { Edit } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

export const ProjectTitle = () => {
  const [title, setTitle] = useState<string>('Title');
  const [isTitleEditable, setIsTitleEditable] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const titleMaxLength = 20;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTitleEditable(() => true); // Enable pencil icon upon title change
  };

  const updateTitleorErrorMsg = () => {
    var titleFieldValue = (document.getElementById('TitleField') as HTMLInputElement).value;
    console.log('New title: ', titleFieldValue);
    if (titleFieldValue.length >= titleMaxLength) {
      setIsError(() => true);
    } else {
      setIsError(() => false); // Reset after potential error
      setTitle(titleFieldValue);
      // Disable pencil icon so the same name cannot be saved multiple times
      setIsTitleEditable(() => false);
    }
  };

  const handleKeyDownInTitle = (event: any) => {
    if (event.keyCode === 13) {
      console.log('ENTER!');
      updateTitleorErrorMsg();
    }
  };

  const handleOnClickPencil = () => {
    console.log('PENCIL');
    updateTitleorErrorMsg();
  };

  return (
    <Box>
      <TextField
        id="TitleField"
        error={isError}
        helperText={isError ? 'Please enter a title with less than 20 characters' : ''}
        label={title}
        defaultValue="Untitled"
        variant="standard"
        onChange={handleTitleChange}
        onKeyDown={handleKeyDownInTitle}
      />
      <IconButton disabled={!isTitleEditable}>
        <Edit onClick={handleOnClickPencil} />
      </IconButton>
    </Box>
  );
};
