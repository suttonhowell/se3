import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { FC } from 'react';

interface ToolBarButtonProps {
  tooltipTitle: string;
  disabledCondition?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element;
  iconButtonProps?: Omit<IconButtonProps, 'disabled' | 'onClick'>;
}

export const ToolbarButton: FC<ToolBarButtonProps> = (props) => {
  return (
    <Tooltip title={props.tooltipTitle} arrow disableInteractive>
      <span>
        <IconButton
          disabled={props.disabledCondition}
          onClick={props.onClick}
          {...props.iconButtonProps}
        >
          {props.children}
        </IconButton>
      </span>
    </Tooltip>
  );
};
