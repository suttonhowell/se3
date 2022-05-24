import {
  ArrowDropDownRounded as DropDownIcon,
  ArrowDropUpRounded as DropUpIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonProps,
  Menu,
  MenuItem,
  MenuItemProps,
  MenuProps,
  Tooltip,
  TooltipProps,
} from '@mui/material';
import { Key, ReactNode, useState } from 'react';
import { ConditionalWrapper } from '../helpers/ConditonalWrapper';

export type DropDownItemProps = {
  label: ReactNode;
  key: Key;
  name: string;
  value: string | number | readonly string[] | undefined;
  menuItemProps?: MenuItemProps;
};

type ButtonDropDownProps = {
  tooltipTitle?: string;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
  buttonText: string;
  buttonProps?: ButtonProps;
  menuProps?: MenuProps;
  menuItems: DropDownItemProps[];
  onClickMenuItem?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

export const ButtonDropDown = ({
  tooltipTitle,
  tooltipProps,
  buttonProps,
  buttonText,
  menuProps,
  menuItems,
  onClickMenuItem,
}: ButtonDropDownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClickMenuItem = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    handleClose();
    onClickMenuItem && onClickMenuItem(e);
  };

  return (
    <>
      <ConditionalWrapper
        condition={tooltipTitle ? true : false}
        wrapper={(children) => (
          <Tooltip arrow disableInteractive title={tooltipTitle || ''} {...tooltipProps}>
            {children}
          </Tooltip>
        )}
      >
        <Box>
          <Button
            {...buttonProps}
            endIcon={open ? <DropUpIcon /> : <DropDownIcon />}
            onClick={handleClick}
            sx={(theme) => ({
              color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.secondary',
              justifyContent: 'space-between',
              minWidth: 70,
              '& .MuiButton-endIcon': { ml: 0 },
            })}
          >
            {buttonText}
          </Button>
          <Menu
            {...menuProps}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={(theme) => ({ '&.MuiPopover-root': { zIndex: theme.zIndex.tooltip + 1 } })}
          >
            {menuItems.map((item, idx) => (
              <MenuItem
                key={item.key}
                value={item.value}
                onClick={(e) => handleOnClickMenuItem(e)}
                sx={(theme) => ({ py: 0.5, ...theme.typography.body2 })}
                {...item.menuItemProps}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </ConditionalWrapper>
    </>
  );
};
