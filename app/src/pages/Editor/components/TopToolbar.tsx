import {
  ArrowRightAltRounded as RelationToolIcon,
  DeleteRounded as DeleteIcon,
  HistoryRounded as HistoryIcon,
  RedoRounded as RedoIcon,
  UndoRounded as UndoIcon,
  ZoomInRounded as ZoomInIcon,
  ZoomOutRounded as ZoomOutIcon,
} from '@mui/icons-material';
import { AppBar, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { ButtonDropDown, DropDownItemProps } from '../../../components/navigation/ButtonDropDown';
import { ToolbarButton } from '../../../components/navigation/ToolbarButton';
import { ToolbarButtonGroup } from '../../../components/navigation/ToolbarButtonGroup';
import { useIterNumberArray } from '../../../core/hooks/useIterArray';
import { store } from '../../../core/redux/store';
import { saveGraphIPC } from '../../../core/utils/graphUtilsIPC'

// Increments used for zoom in and out
const zoomLevelsIncrements = [
  25, 30, 35, 40, 50, 60, 75, 85, 100, 120, 140, 150, 175, 200, 250, 300,
];

// Zoom levels used for the zoom level dropdown selector
const zoomList = [25, 50, 75, 100, 150, 200];
const zoomItemList: DropDownItemProps[] = zoomList.map((item) => ({
  label: item.toString() + '%',
  value: item,
  name: 'zoomLevel',
  key: item,
}));

export const TopToolbar = () => {
  const [hasHistory, setHasHistory] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isRelationToolActive, setIsRelationToolActive] = useState(false);
  const [predecessor, successor] = useIterNumberArray(zoomLevelsIncrements, 100);

  const handleOnClickUndo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setHasHistory((prevState) => !prevState);
  };

  const handleOnClickRedo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setHasHistory((prevState) => !prevState);
  };

  const handleOnClickHistory = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('See change history button was clicked');
  };

  const handleOnClickZoomIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setZoomLevel(successor(zoomLevel));
    const graph = store.getState().editor.graph;
    if (graph !== undefined) saveGraphIPC(window, graph);
  };

  const handleOnClickZoomOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setZoomLevel(predecessor(zoomLevel));
  };

  const handleOnClickDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setHasSelected((prevState) => !prevState);
  };

  const handleOnClickRelationTool = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsRelationToolActive((prevState) => !prevState);
  };

  const handleOnZoomLevelClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setZoomLevel(e.currentTarget.value);
  };

  return (
    <AppBar position="relative" color="inherit" elevation={4}>
      <Toolbar disableGutters variant="dense" sx={{ minHeight: 'unset', py: 0.5 }}>
        <ToolbarButtonGroup>
          <ToolbarButton
            tooltipTitle="Undo last change"
            disabledCondition={hasHistory}
            children={<UndoIcon />}
            onClick={handleOnClickUndo}
          />
          <ToolbarButton
            tooltipTitle="Redo last change"
            disabledCondition={hasHistory}
            children={<RedoIcon />}
            onClick={handleOnClickRedo}
          />
          <ToolbarButton
            tooltipTitle="Show change history"
            disabledCondition={hasHistory}
            children={<HistoryIcon />}
            onClick={handleOnClickHistory}
          />
        </ToolbarButtonGroup>
        <ToolbarButtonGroup>
          <ButtonDropDown
            tooltipTitle="Zoom"
            buttonText={zoomLevel + '%'}
            menuItems={zoomItemList}
            onClickMenuItem={handleOnZoomLevelClick}
          />
        </ToolbarButtonGroup>
        <ToolbarButtonGroup>
          <ToolbarButton
            tooltipTitle="Zoom in"
            disabledCondition={zoomLevel === zoomLevelsIncrements.at(-1)}
            children={<ZoomInIcon />}
            onClick={handleOnClickZoomIn}
          />
          <ToolbarButton
            tooltipTitle="Zoom out"
            disabledCondition={zoomLevel === zoomLevelsIncrements[0]}
            children={<ZoomOutIcon />}
            onClick={handleOnClickZoomOut}
          />
        </ToolbarButtonGroup>
        <ToolbarButtonGroup>
          <ToolbarButton
            tooltipTitle="Delete selected"
            disabledCondition={hasSelected}
            children={<DeleteIcon />}
            onClick={handleOnClickDelete}
          />
        </ToolbarButtonGroup>
        <ToolbarButtonGroup disableDivider>
          <ToolbarButton
            tooltipTitle={
              (isRelationToolActive ? 'Deactivate' : 'Activate') + '"Add relation tool"'
            }
            disabledCondition={isRelationToolActive}
            // TODO: Find a better suited icon for this button
            children={<RelationToolIcon />}
            onClick={handleOnClickRelationTool}
          />
        </ToolbarButtonGroup>
      </Toolbar>
    </AppBar>
  );
};
