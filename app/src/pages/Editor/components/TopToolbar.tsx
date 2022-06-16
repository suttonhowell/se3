import {
  ArrowRightAltRounded as RelationToolIcon,
  DeleteRounded as DeleteIcon,
  HistoryRounded as HistoryIcon,
  RedoRounded as RedoIcon,
  SaveRounded as SaveIcon,
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
import {
  deleteActivity,
  pickTool,
  ToolType,
} from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';
import { store } from '../../../core/redux/store';
import { saveGraphIPC } from '../../../core/utils/graphUtilsIPC';

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
  const dispatch = useAppDispatch();
  const { isRelationToolActive, hasActivities, hasSelected } = useAppSelector((state) => ({
    isRelationToolActive: state.editor.usingTool === ToolType.AddRelation,
    hasActivities: state.editor.graph.activities.length > 0,
    hasSelected: state.editor.selectedElement != null,
  }));
  const [hasHistory, setHasHistory] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [predecessor, successor] = useIterNumberArray(zoomLevelsIncrements, 100);

  const handleOnClickUndo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setHasHistory((prevState) => !prevState);
  };

  const handleOnClickRedo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setHasHistory((prevState) => !prevState);
  };

  const handleOnClickHistory = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  const handleOnClickZoomIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setZoomLevel(successor(zoomLevel));
  };

  const handleOnClickZoomOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setZoomLevel(predecessor(zoomLevel));
  };

  const handleOnClickDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(deleteActivity());
  };

  const handleOnClickRelationTool = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    isRelationToolActive
      ? dispatch(pickTool(ToolType.None))
      : dispatch(pickTool(ToolType.AddRelation));
  };

  const handleOnZoomLevelClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setZoomLevel(e.currentTarget.value);
  };

  const handleOnClickSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const graph = store.getState().editor.graph;
    if (graph !== undefined) saveGraphIPC(window, graph);
  };

  return (
    <AppBar
      position="relative"
      color="inherit"
      elevation={4}
      sx={(theme) => ({
        zIndex: theme.zIndex.drawer,
      })}
    >
      <Toolbar
        disableGutters
        variant="dense"
        sx={{ minHeight: 'unset', py: 0.5 }}
        // sx={(theme) => ({ minHeight: 'unset', py: 0.5, zIndex: theme.zIndex.drawer })}
      >
        <ToolbarButtonGroup>
          <ToolbarButton
            tooltipTitle="Undo last change (not implemented)"
            disabledCondition={hasHistory}
            children={<UndoIcon />}
            onClick={handleOnClickUndo}
          />
          <ToolbarButton
            tooltipTitle="Redo last change (not implemented)"
            disabledCondition={hasHistory}
            children={<RedoIcon />}
            onClick={handleOnClickRedo}
          />
          <ToolbarButton
            tooltipTitle="Show change history (not implemented)"
            disabledCondition={hasHistory}
            children={<HistoryIcon />}
            onClick={handleOnClickHistory}
          />
        </ToolbarButtonGroup>
        <ToolbarButtonGroup>
          <ButtonDropDown
            tooltipTitle="Zoom (not implemented)"
            buttonText={zoomLevel + '%'}
            menuItems={zoomItemList}
            onClickMenuItem={handleOnZoomLevelClick}
          />
        </ToolbarButtonGroup>
        <ToolbarButtonGroup>
          <ToolbarButton
            tooltipTitle="Zoom in (not implemented)"
            disabledCondition={zoomLevel === zoomLevelsIncrements.at(-1)}
            children={<ZoomInIcon />}
            onClick={handleOnClickZoomIn}
          />
          <ToolbarButton
            tooltipTitle="Zoom out (not implemented)"
            disabledCondition={zoomLevel === zoomLevelsIncrements[0]}
            children={<ZoomOutIcon />}
            onClick={handleOnClickZoomOut}
          />
        </ToolbarButtonGroup>
        <ToolbarButtonGroup>
          <ToolbarButton
            tooltipTitle="Delete (Delete/Backspace)"
            disabledCondition={!hasSelected}
            children={<DeleteIcon />}
            onClick={handleOnClickDelete}
          />
        </ToolbarButtonGroup>
        <ToolbarButtonGroup>
          <ToolbarButton
            tooltipTitle={
              isRelationToolActive
                ? 'Deactivate "Add relation tool" (Escape)'
                : 'Activate "Add relation tool"'
            }
            disabledCondition={!hasActivities}
            iconButtonProps={{ color: isRelationToolActive ? 'primary' : 'default' }}
            // TODO: Find a better suited icon for this button
            children={<RelationToolIcon />}
            onClick={handleOnClickRelationTool}
          />
        </ToolbarButtonGroup>
        <ToolbarButtonGroup disableDivider>
          <ToolbarButton
            tooltipTitle="Save as file"
            children={<SaveIcon />}
            onClick={handleOnClickSave}
          />
        </ToolbarButtonGroup>
      </Toolbar>
    </AppBar>
  );
};
