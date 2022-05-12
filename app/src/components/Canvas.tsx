import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Canvas = () => {
  const resetSystem = async () => {
    await window.darkMode.system();
  };
  const getThemeMode = async () => {
    const mode = await window.darkMode.get();
    console.log(mode);
  };
  const toggleMode = async () => {
    await window.darkMode.toggle();
  };

  return (
    <>
      <Button onClick={() => getThemeMode()}>Get theme mode</Button>
      <Button onClick={() => toggleMode()}>Toggle dark mode</Button>
      <Button onClick={() => resetSystem()}>Reset to system</Button>

      <Button component={RouterLink} variant="contained" to="/">
        Go to frontpage
      </Button>
      <svg
        style={{
          height: '100%',
          width: '100%',
          // position: 'absolute',
          top: 0,
          left: 0
        }}
      ></svg>
    </>
  );
};
