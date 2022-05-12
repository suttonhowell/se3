import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { AppBar, IconButton, Toolbar } from '@mui/material';

export const TopToolbar = () => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.clientX, e.clientY);
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton onClick={handleOnClick} aria-label="delete">
          <DeleteRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
