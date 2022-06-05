import { Box, Divider } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

interface ToolBarButtonGroupProps {
  children: ReactElement | ReactNode | JSX.Element;
  disableDivider?: boolean;
}

export const ToolbarButtonGroup = (props: ToolBarButtonGroupProps) => {
  return (
    <>
      <Box sx={{ px: 1 }}>{props.children}</Box>
      {!props.disableDivider && (
        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2, my: 1 }} />
      )}
    </>
  );
};
