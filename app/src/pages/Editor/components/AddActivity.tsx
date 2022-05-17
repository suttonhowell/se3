import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Fab } from '@mui/material';
import { addActivity } from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch } from '../../../core/redux/hooks';

export const AddActivity = () => {
  const dispatch = useAppDispatch();
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(addActivity());
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
