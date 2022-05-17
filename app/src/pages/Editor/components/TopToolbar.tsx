import {
  DeleteRounded as DeleteIcon,
  HistoryRounded as HistoryIcon,
  RedoRounded as RedoIcon,
  UndoRounded as UndoIcon,
  ZoomInRounded as ZoomInIcon,
  ZoomOutRounded as ZoomOutIcon,
} from '@mui/icons-material';
import { AppBar, Divider, IconButton, Toolbar, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useState } from 'react';
import { ButtonDropDown, DropDownItemProps } from '../../../components/navigation/ButtonDropDown';

type MenuState = {
  hasHistory: boolean;
  hasSelected: boolean;
  zoomLevel: number;
};

export const TopToolbar = () => {
  const [menuState, setMenuState] = useState<MenuState>({
    hasHistory: true,
    hasSelected: true,
    zoomLevel: 100,
  });

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name } = e.currentTarget;
    switch (name) {
      case 'undo':
      case 'redo':
      case 'history':
        setMenuState((prevState) => ({
          ...prevState,
          hasHistory: !prevState.hasHistory,
        }));
        break;
      case 'zoomIn':
        setMenuState((prevState) => ({
          ...prevState,
          zoomLevel: prevState.zoomLevel + 25,
        }));
        break;
      case 'zoomOut':
        setMenuState((prevState) => ({
          ...prevState,
          zoomLevel: prevState.zoomLevel - 15,
        }));
        break;
      case 'delete':
        setMenuState((prevState) => ({
          ...prevState,
          hasSelected: !prevState.hasSelected,
        }));
        break;
      default:
        break;
    }
  };

  const handleOnZoomLevelClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const { value } = e.currentTarget;
    setMenuState((prevState) => ({
      ...prevState,
      zoomLevel: value,
    }));
  };

  return (
    <>
      <AppBar position="relative" color="inherit" elevation={4}>
        <Toolbar disableGutters variant="dense" sx={{ minHeight: 'unset', py: 0.5 }}>
          {menuItemButtonGroups.map((buttonGroup, idx) => (
            <Fragment key={'btnGrp' + idx}>
              <Box sx={{ px: 1 }}>
                {buttonGroup.map((button) =>
                  button.icon ? (
                    <Tooltip key={button.name} title={button.toolTipTitle} arrow disableInteractive>
                      <IconButton
                        disabled={!menuState[button.state] ? true : false}
                        name={button.name}
                        onClick={handleOnClick}
                      >
                        {button.icon}
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <ButtonDropDown
                      key={button.name}
                      tooltipTitle={button.toolTipTitle}
                      buttonText={menuState.zoomLevel + '%'}
                      menuItems={zoomItemList}
                      onClickMenuItem={handleOnZoomLevelClick}
                    />
                  )
                )}
              </Box>
              {idx !== menuItemButtonGroups.length - 1 && (
                <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2, my: 1 }} />
              )}
            </Fragment>
          ))}
        </Toolbar>
      </AppBar>
    </>
  );
};

const zoomList = [25, 50, 75, 100, 150, 200];
const zoomItemList: DropDownItemProps[] = zoomList.map((item) => ({
  label: item.toString() + '%',
  value: item,
  name: 'zoomLevel',
  key: item,
}));

interface MenuButtonProps {
  name: string;
  toolTipTitle: string;
  icon?: JSX.Element;
  state: keyof MenuState;
}

type MenuItemButtonGroupProps = MenuButtonProps[];

const menuItemButtonGroups: MenuItemButtonGroupProps[] = [
  [
    {
      name: 'undo',
      toolTipTitle: 'Undo',
      icon: <UndoIcon />,
      state: 'hasHistory',
    },
    {
      name: 'redo',
      toolTipTitle: 'Redo',
      icon: <RedoIcon />,
      state: 'hasHistory',
    },
    {
      name: 'history',
      toolTipTitle: 'See change history',
      icon: <HistoryIcon />,
      state: 'hasHistory',
    },
  ],
  [
    {
      name: 'zoomLevel',
      toolTipTitle: 'Zoom',
      state: 'zoomLevel',
    },
  ],
  [
    {
      name: 'zoomIn',
      toolTipTitle: 'Zoom in',
      icon: <ZoomInIcon />,
      state: 'zoomLevel',
    },
    {
      name: 'zoomOut',
      toolTipTitle: 'Zoom out',
      icon: <ZoomOutIcon />,
      state: 'zoomLevel',
    },
  ],
  [
    {
      name: 'delete',
      toolTipTitle: 'Delete',
      icon: <DeleteIcon />,
      state: 'hasSelected',
    },
  ],
];
