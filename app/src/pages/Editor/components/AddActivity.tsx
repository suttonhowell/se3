import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Fab } from '@mui/material';

export const AddActivity = () => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => {
    if (e) {
      console.log('Fab was clicked', e.clientX, e.clientY);
    }
  };

  return (
    <Fab
      color="primary"
      onClick={(e) => handleOnClick(e)}
      aria-label="add"
      sx={{ position: 'absolute', bottom: 16, left: 16 }}
    >
      <AddOutlinedIcon />
    </Fab>
  );
};
