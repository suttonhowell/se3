import { IconButton, Tooltip } from '@mui/material';
import { FC } from 'react';

interface ToolBarButtonProps {
  tooltipTitle: string;
  disabledCondition?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element;
}

export const ToolbarButton: FC<ToolBarButtonProps> = (props) => {
  return (
    <Tooltip title={props.tooltipTitle} arrow disableInteractive>
      <IconButton disabled={props.disabledCondition} onClick={props.onClick}>
        {props.children}
      </IconButton>
    </Tooltip>
  );
};
